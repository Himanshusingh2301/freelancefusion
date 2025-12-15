import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { ChevronsUpDown, Check } from "lucide-react";
const categories = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "design", label: "UI/UX Design" },
    { value: "content-writing", label: "Content Writing" },
    { value: "data-science", label: "Data Science" },
];

const EditProject = () => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [spiralLoading, setspiralLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        skills: "",
        category: "",
        file_url: "",
        existingFile: null,
    });

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch existing project data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const token = await getToken();
                const res = await fetch(`${BASE_URL}/get-project/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();

                setFormData({
                    title: data.title,
                    description: data.description,
                    budget: data.budget,
                    deadline: data.deadline?.split("T")[0],
                    skills: data.skills_required,
                    category: data.category,
                    file_url: data.file_url || "",
                    existingFile: data.file_url || null,
                });

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, BASE_URL, getToken]);

    // Update text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit updated project
    const handleSubmit = async (e) => {
        e.preventDefault();
        setspiralLoading(true);
        const token = await getToken();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("budget", formData.budget);
        form.append("deadline", formData.deadline);
        form.append("skills", formData.skills);
        form.append("category", formData.category);
        form.append("file_url", formData.file_url);

        try {
            const response = await fetch(`${BASE_URL}/update-project/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });

            await response.json();

            setspiralLoading(false)
            alert("Project updated successfully!");
            navigate("/client-dashboard/projects-list");
        } catch (err) {
            console.error(err);
            setspiralLoading(false)
            alert("Failed to update project");
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen p-8 flex items-center justify-center bg-[url('/editbg.png')] bg-cover bg-repeat bg-center">
            <Card className="w-full max-w-2xl bg-black/40 border border-gray-700 rounded-2xl backdrop-blur-md shadow-lg p-8 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-100">
                        Edit Project
                    </CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Update your project details</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Project Title */}
                        <div>
                            <label className="block text-gray-300 mb-1">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Budget + Deadline */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-300 mb-1">Budget (₹)</label>
                                <input
                                    type="number"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-300 mb-1">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full p-3 invert rounded-lg bg-[#f0f0f0] text-black border border-[#b4aa9c]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-gray-300 mb-1">Required Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-300 mb-1">Category</label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="
                                            w-full h-12
                                            justify-between
                                            bg-[#0f0f0f]
                                            border border-gray-600
                                            text-white
                                            hover:bg-[#0f0f0f]
                                            hover:text-white
                                        "
                                    >
                                        {formData.category
                                            ? categories.find((c) => c.value === formData.category)?.label
                                            : "Select a category"}

                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    className="
                                        p-0
                                        border border-gray-700
                                        bg-[#0f0f0f]
                                        text-gray-200
                                        w-[var(--radix-popover-trigger-width)]
                                        "
                                >
                                    <Command className="bg-transparent">
                                        <CommandInput
                                            placeholder="Search category..."
                                            className="text-gray-200 placeholder:text-gray-400"
                                        />

                                        <CommandList>
                                            <CommandEmpty className="text-gray-400">
                                                No category found.
                                            </CommandEmpty>

                                            <CommandGroup>
                                                {categories.map((cat) => (
                                                    <CommandItem
                                                        key={cat.value}
                                                        value={cat.value}
                                                        onSelect={(val) => {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                category: val,
                                                            }))
                                                            setOpen(false)
                                                        }}
                                                        className="
                                                            cursor-pointer
                                                            text-gray-200
                                                            
                                                            data-[selected=true]:bg-white
                                                        "
                                                    >
                                                        {cat.label}

                                                        <Check
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                formData.category === cat.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* FILE LINK INPUT (instead of upload) */}
                        <div>
                            <label className="block text-gray-300 mb-2">File Link (Drive/Dropbox/etc.)</label>

                            {formData.existingFile && (
                                <a
                                    href={formData.existingFile}
                                    target="_blank"
                                    className="text-purple-300 underline mb-2 block"
                                >
                                    View existing file
                                </a>
                            )}

                            <input
                                type="text"
                                name="file_url"
                                value={formData.file_url}
                                onChange={handleChange}
                                placeholder="Paste file link here"
                                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={spiralLoading}
                            className="w-full cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
             hover:opacity-90 text-white font-semibold py-3 rounded-lg
             flex justify-center items-center"
                        >
                            {spiralLoading ? (
                                <div className="flex items-center gap-2">
                                    <Spinner /> Updating...
                                </div>
                            ) : (
                                "Update Project"
                            )}

                        </button>


                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProject;
