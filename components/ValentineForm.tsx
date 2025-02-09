"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";

export default function ValentineForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    favoriteColor: "",
    idealDate: "",
    crushName: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
    input20: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const handleRequest = async () => {
      try {
        const response = await fetch("http://54.221.250.119/add-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.log("response failed");
          throw new Error("Failed to submit form. Please try again later.");
        }

        router.push("/submitted?name=" + encodeURIComponent(formData.name));
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    handleRequest();
  };

  // Grouping questions into pages (4 pages with 5 questions each)
  const pages = [
    [
      { label: "Your Name", name: "name" },
      { label: "Favorite Color", name: "favoriteColor" },
      { label: "Ideal Valentine's Date", name: "idealDate" },
      { label: "Secret Crush (we won't tell!)", name: "crushName" },
      { label: "Question 5", name: "input5" },
    ],
    [
      { label: "Question 6", name: "input6" },
      { label: "Question 7", name: "input7" },
      { label: "Question 8", name: "input8" },
      { label: "Question 9", name: "input9" },
      { label: "Question 10", name: "input10" },
    ],
    [
      { label: "Question 11", name: "input11" },
      { label: "Question 12", name: "input12" },
      { label: "Question 13", name: "input13" },
      { label: "Question 14", name: "input14" },
      { label: "Question 15", name: "input15" },
    ],
    [
      { label: "Question 16", name: "input16" },
      { label: "Question 17", name: "input17" },
      { label: "Question 18", name: "input18" },
      { label: "Question 19", name: "input19" },
      { label: "Question 20", name: "input20" },
    ],
  ];

  // Check if all fields on the current page are filled
  const isPageComplete = pages[page].every(
    (q) => formData[q.name as keyof typeof formData].trim() !== ""
  );

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      {pages[page].map((q) => (
        <InputField
          key={q.name}
          label={q.label}
          name={q.name}
          value={formData[q.name as keyof typeof formData]}
          onChange={handleChange}
        />
      ))}

      <div className='flex justify-between'>
        {page > 0 && (
          <button
            type='button'
            onClick={() => setPage(page - 1)}
            className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300'
          >
            Back
          </button>
        )}

        {page < pages.length - 1 ? (
          <div className='relative group'>
            <button
              type='button'
              onClick={() => isPageComplete && setPage(page + 1)}
              disabled={!isPageComplete}
              className={`py-2 px-4 rounded font-bold transition duration-300 ${
                isPageComplete
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>

            {/* Tooltip appears only if the button is disabled */}
            {!isPageComplete && (
              <div className='absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                Complete all questions to continue
              </div>
            )}
          </div>
        ) : (
          <div className='relative group'>
            <button
              type='submit'
              disabled={!isPageComplete}
              className={`py-2 px-4 rounded font-bold transition duration-300 ${
                isPageComplete
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>

            {/* Tooltip appears only if the button is disabled */}
            {!isPageComplete && (
              <div className='absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                Complete all questions to submit
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
