"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if interest selection is completed
    const completedSelection = localStorage.getItem("interestCompleted");
    if (completedSelection) {
      router.push("/interest  "); // Redirect if already completed
    }
  }, [router]);

  const handleClick = (tech) => {
    setSelectedTechs((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((item) => item !== tech)
        : [...prevSelected, tech]
    );
  };

  const handleSubmit = () => {
    if (selectedTechs.length >= 5) {
      localStorage.setItem("interestCompleted", "true"); // Mark as completed
      router.push("/interest"); // Redirect to interest page
    }
  };

  const techStacks = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "Angular",
    "Vue.js",
    "Next.js",
    "Django",
    "Flask",
    "Ruby on Rails",
    "Spring Boot",
    "Firebase",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "MySQL",
    "Redis",
    "AWS",
    "Azure",
    "Bootstrap",
    "Tailwind CSS",
    "Jenkins",
    "Webpack",
    "Babel",
    "PHP",
    "Laravel",
    "Nginx",
    "others",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-serif bg-[#F0F8FF]">
      <div className="text-4xl font-bold">Find your Niche</div>
      <div className="relative flex flex-col items-center justify-center p-10 bg-white rounded-md min-w-[800px] min-h-[500px] mt-10 shadow-lg overflow-auto">
        <div className="grid grid-cols-5 gap-8">
          {techStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => handleClick(tech)}
              className={`px-3 py-2 border rounded-md cursor-pointer ${
                selectedTechs.includes(tech)
                  ? "bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={`p-4 rounded-md mt-10 ${
            selectedTechs.length >= 5
              ? "bg-blue-400 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={selectedTechs.length < 5}
        >
          Submit
        </button>
        {selectedTechs.length < 5 && (
          <div className="absolute bottom-2 right-2 text-gray-600 text-sm">
            Select at least 5 options to enable submit
          </div>
        )}
      </div>
    </div>
  );
}
