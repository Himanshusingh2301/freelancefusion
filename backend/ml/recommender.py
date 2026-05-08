import re
from typing import Dict, List


def _normalize_text(value):
    if not value:
        return ""
    text = str(value).lower()
    text = re.sub(r"[^a-z0-9+.# ]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _project_text(project: Dict) -> str:
    return " ".join(
        [
            _normalize_text(project.get("title")),
            _normalize_text(project.get("description")),
            _normalize_text(project.get("skills_required") or project.get("skills")),
            _normalize_text(project.get("category")),
        ]
    ).strip()


def _freelancer_text(freelancer: Dict) -> str:
    return " ".join(
        [
            _normalize_text(freelancer.get("title")),
            _normalize_text(freelancer.get("skills")),
            _normalize_text(freelancer.get("about")),
            _normalize_text(freelancer.get("experience_level")),
        ]
    ).strip()


def _split_skills(value: str) -> List[str]:
    if not value:
        return []
    # Split on common separators first (before text normalization removes punctuation).
    raw = str(value).lower()
    parts = re.split(r"[,\|/\n;]+", raw)

    alias_map = {
        "react": "reactjs",
        "react.js": "reactjs",
        "reactjs": "reactjs",
        "node": "nodejs",
        "node.js": "nodejs",
        "nodejs": "nodejs",
        "js": "javascript",
        "javascript": "javascript",
        "ts": "typescript",
        "typescript": "typescript",
        "py": "python",
        "python": "python",
        "c++": "cpp",
        "cpp": "cpp",
        "c#": "csharp",
        "csharp": "csharp",
    }

    skills = []
    for part in parts:
        token = part.strip()
        if not token:
            continue
        canonical = alias_map.get(token)
        if not canonical:
            compact = re.sub(r"[^a-z0-9+#.]+", "", token)
            canonical = alias_map.get(compact, compact)
        if canonical:
            skills.append(canonical)

    # Preserve order while removing duplicates.
    return list(dict.fromkeys(skills))


def _skill_overlap_score(freelancer: Dict, project: Dict):
    freelancer_skills = set(_split_skills(freelancer.get("skills", "")))
    project_skills = set(_split_skills(project.get("skills_required") or project.get("skills", "")))
    if not freelancer_skills or not project_skills:
        return 0.0, 0.0, []
    overlap = freelancer_skills.intersection(project_skills)
    required_coverage = len(overlap) / len(project_skills)
    precision = len(overlap) / len(freelancer_skills)
    # Favor covering project-required skills.
    score = (0.8 * required_coverage) + (0.2 * precision)
    return score, required_coverage, sorted(list(overlap))


def _token_overlap_rank(freelancer: Dict, projects: List[Dict], top_n: int = 30) -> List[Dict]:
    """Safe fallback recommender when sklearn is unavailable."""
    freelancer_tokens = set(_freelancer_text(freelancer).split())
    if not freelancer_tokens:
        return projects[:top_n]

    scored = []
    for project in projects:
        project_tokens = set(_project_text(project).split())
        skill_score, required_coverage, matched_skills = _skill_overlap_score(freelancer, project)
        if not project_tokens:
            text_score = 0.0
        else:
            overlap = freelancer_tokens.intersection(project_tokens)
            text_score = len(overlap) / max(len(freelancer_tokens), 1)

        score = (0.85 * skill_score) + (0.15 * text_score)

        project_copy = project.copy()
        project_copy["match_score"] = round(float(score), 4)
        project_copy["skill_score"] = round(float(skill_score), 4)
        project_copy["required_skill_coverage"] = round(float(required_coverage), 4)
        project_copy["text_score"] = round(float(text_score), 4)
        project_copy["matched_skills"] = matched_skills
        project_copy["match_source"] = "token-overlap"
        scored.append(project_copy)

    scored.sort(key=lambda item: item.get("match_score", 0.0), reverse=True)
    return scored[:top_n]


def rank_projects_for_freelancer(freelancer: Dict, projects: List[Dict], top_n: int = 30) -> List[Dict]:
    """
    Rank projects using TF-IDF cosine similarity.
    Falls back to token overlap when sklearn is not available.
    """
    if not freelancer or not projects:
        return []

    freelancer_text = _freelancer_text(freelancer)
    if not freelancer_text:
        return projects[:top_n]

    project_texts = [_project_text(project) for project in projects]

    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
        matrix = vectorizer.fit_transform([freelancer_text] + project_texts)
        freelancer_vec = matrix[0:1]
        project_vecs = matrix[1:]
        similarity_scores = cosine_similarity(freelancer_vec, project_vecs).flatten()

        scored = []
        for project, score in zip(projects, similarity_scores):
            skill_score, required_coverage, matched_skills = _skill_overlap_score(freelancer, project)
            # Strongly skill-first hybrid score.
            final_score = (0.85 * skill_score) + (0.15 * float(score))
            # If project required skills are fully covered, keep score intuitive/high.
            if required_coverage == 1.0 and matched_skills:
                final_score = max(final_score, 0.9)

            project_copy = project.copy()
            project_copy["match_score"] = round(final_score, 4)
            project_copy["text_score"] = round(float(score), 4)
            project_copy["skill_score"] = round(skill_score, 4)
            project_copy["required_skill_coverage"] = round(required_coverage, 4)
            project_copy["matched_skills"] = matched_skills
            project_copy["match_source"] = "hybrid-skill-tfidf"
            scored.append(project_copy)

        scored.sort(key=lambda item: item.get("match_score", 0.0), reverse=True)
        return scored[:top_n]
    except Exception:
        return _token_overlap_rank(freelancer, projects, top_n=top_n)
