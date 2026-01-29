import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidePanel from "@/components/ClientsidePanel";
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

// Category options
const categories = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "design", label: "UI/UX Design" },
  { value: "content-writing", label: "Content Writing" },
  { value: "data-science", label: "Data Science" },
];

const ClientPostProject = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: "",
    category: "",
    file_url: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = await window.Clerk.session.getToken();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("budget", formData.budget);
    form.append("deadline", formData.deadline);
    form.append("skills", formData.skills);
    form.append("category", formData.category);
    form.append("file_url", formData.file_url);

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${BASE_URL}/post-project`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await response.json();
      console.log(data);

      toast.success("Project posted successfully!");
      setLoading(false);

      // Reset form
      setFormData({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        skills: "",
        category: "",
        file_url: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to post project");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex  justify-center bg-[url('/editbg.png')] bg-cover bg-center">
      <div className="fixed left-6 top-1/4 -translate-y-1/2 z-50">
      <SidePanel/>
      </div>
      <Card className="w-full max-w-2xl bg-black/40 border border-gray-700 rounded-2xl backdrop-blur-md shadow-lg p-8 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-100">
            Post a New Project
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Describe your project and find the best freelancers
          </p>
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
                placeholder="e.g. Build a portfolio website"
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
                placeholder="Describe your project..."
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600 resize-none"
                required
              ></textarea>
            </div>

            {/* Budget & Deadline */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-300 mb-1">Budget (₹)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
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
                placeholder="e.g. React, Node.js"
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
                required
              />
            </div>

            {/* Category (Combobox) */}
            <div >
              <label className="block text-gray-300 mb-1">Category</label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="
        w-full
        h-12
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

            {/* Additional File Link */}
            <div>
              <label className="block text-gray-300 mb-1">Additional File Link</label>
              <input
                type="text"
                name="file_url"
                value={formData.file_url}
                onChange={handleChange}
                placeholder="e.g. Google Drive Link"
                className="w-full p-3 rounded-lg bg-[#0f0f0f] border border-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
              text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2"
            >
              {loading ? <Spinner /> : "Post Project"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPostProject;
