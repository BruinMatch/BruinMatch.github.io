"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

const collaborators = [
  "vestucla_logo.png",
  "collab2.png",
  "collab3.png",
  "collab4.png"
];

export default function ValentineForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    uclaemail: "",
    academicyear: "",
    gender: "",
    sexuality: "",
    qualities: "",
    dealbreaker: "",
    trust: "",
    bplate: "",
    dreams: "",
    fear: "",
    friendship: "",
    andre: "",
    lovelanguage: "",
    humor: "",
    perfectday: "",
    hours: "",
    evaluate: "",
    quiz: "",
    secret: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const handleRequest = async () => {
      try {
        const response = await fetch("https://bruinmatch.com/add-post/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.log("response failed");
          console.log(response);
          throw new Error("Failed to submit form. Please try again later.");
        }

        router.push("/submitted?name=" + encodeURIComponent(formData.firstName)); // Changed formData.name to formData.firstName
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    handleRequest();
  };

  // Grouping questions into pages (4 pages with 5 questions each)

  const pages = [
    [
      {
        type: "text",
        content: (
          <>
            <strong>Welcome to BruinMatch!</strong>
            <br />
            <br />
            A place to meet your <strong>perfect</strong> valentine's day date, created by <strong>Glitch at UCLA</strong>.
            <br />
            <br />
            The survey is 20 questions. At 12:00am on February 14th you'll receive an email
            with <strong>your strongest match</strong>, calculated using a finely-tuned <strong>AI algorithm</strong>.
            All questions are free response (<em>express yourself!</em>)
            <br />
            <br />
            Our AI is programmed to analyze not only your answers but your <strong>tone and text patterns</strong> in
            order to do its best to match you with someone who fits <em>your</em> vibe!
            <br />
            <br />
            Note that you <strong>MUST</strong> use your UCLA email or else we will filter out your
            response. We will also be using AI to filter out duplicate/invalid responses.
          </>
        ),
      },
    ],
    [
      { label: "First Name", name: "firstName" },
      { label: "Last Name", name: "lastName" },
      { label: "UCLA Email", name: "uclaemail" },
    ],
    // name, favoriteColor, idealDate, crushName, input5
    [
      { label: "Academic Year", name: "academicyear" },
      { label: "Gender", name: "gender" },
      { label: "What's your sexuality?'", name: "sexuality" },
    ],
    [
      { label: "What is most important to you in a romantic partner?", name: "qualities" },
      { label: "What's a dealbreaker?", name: "dealbreaker" },
      {
        label:
          "What's the smallest thing someone could do that would make you instantly trust them?",
        name: "trust",
      },
      { label: "Should BPlate exist?", name: "bplate" },
    ],
    [
      { label: "Whats your dream career?", name: "dreams" },
      { label: "What's your biggest fear?", name: "fear" },
      { label: "What do you value most in friendship?", name: "friendship" },
      { label: "Thoughts on Andre who solicits money in front of Ackerman?", name: "andre" },
    ],
    [
      {
        label:
          "Which of the five love languages (Words of Affirmation, Quality Time, Physical Touch, Acts of Service, Receiving Gifts) do you identify with most strongly, and why?",
        name: "lovelanguage",
      },
      { label: "Where do you draw the line on humor?", name: "humor" },
      { label: "What constitutes a perfect day for you?", name: "perfectday" },
      { label: "What could you talk about for hours and hours?", name: "hours" },
    ],
    [
      { label: "Evaluate yourself as a person.", name: "evaluate" },
      { label: "What question should have been on this quiz but wasn't", name: "quiz" },
      {
        label: "Do you have a UCLA crush? We won't tell :) we'll do our best to match you!",
        name: "secret",
      },
    ],
  ];

  // Check if all fields on the current page are filled
  const isPageComplete = pages[page].every((q) => {
    if ("name" in q) {
      //  👈  Only check if 'q' has a 'name' property (it's an input field)
      return formData[q.name as keyof typeof formData]?.trim() !== ""; // Added optional chaining to prevent error
    }
    return true; //  👈 If it doesn't have a 'name' (like welcome text), consider it "complete"
  });

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      {pages[page].map(
        (q) =>
          "type" in q && q.type === "text" ? (
            <div
              key='welcome-text'
              className='mb-4 text-lg'
            >
              {q.content}
            </div>
          ) : //  dd checks for 'label' and 'name' existence too
          "label" in q && "name" in q ? (
            <InputField
              key={q.name}
              label={q.label}
              name={q.name}
              value={formData[q.name as keyof typeof formData]}
              onChange={handleChange}
            />
          ) : null // Handle case where 'label' or 'name' is missing (shouldn't happen in our setup, but good practice)
      )}

      {page === 0 && (
        <>
          <div className='mb-4 text-lg'>
            Backed by:
          </div>
          <div className='flex justify-center space-x-4 mb-4'>
            {collaborators.map((img, index) => (
              <img
                key={index}
                src={`${img}`}
                alt={`Collaborator ${index + 1}`}
                className='w-20 h-20 rounded-full border'
              />
            ))}
          </div>
        </>
      )}

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
