"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";

export default function ValentineForm() {
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
        const response = await fetch("http://localhost:5000/add-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form. Please try again later.");
        }

        router.push("/submitted?name=" + encodeURIComponent(formData.name));
        return;
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    handleRequest();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <InputField
        label='Your Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        label='Favorite Color'
        name='favoriteColor'
        value={formData.favoriteColor}
        onChange={handleChange}
      />
      <InputField
        label="Ideal Valentine's Date"
        name='idealDate'
        value={formData.idealDate}
        onChange={handleChange}
      />
      <InputField
        label="Secret Crush (we won't tell!)"
        name='crushName'
        value={formData.crushName}
        onChange={handleChange}
      />
      <InputField
        label='Your Name'
        name='input5'
        value={formData.input5}
        onChange={handleChange}
      />
      <InputField
        label='Favorite Color'
        name='input6'
        value={formData.input6}
        onChange={handleChange}
      />
      <InputField
        label="Ideal Valentine's Date"
        name='input7'
        value={formData.input7}
        onChange={handleChange}
      />
      <InputField
        label="Secret Crush (we won't tell!)"
        name='input8'
        value={formData.input8}
        onChange={handleChange}
      />
      <InputField
        label='Your Name'
        name='input9'
        value={formData.input9}
        onChange={handleChange}
      />
      <InputField
        label='Favorite Color'
        name='input10'
        value={formData.input10}
        onChange={handleChange}
      />
      <InputField
        label="Ideal Valentine's Date"
        name='input11'
        value={formData.input11}
        onChange={handleChange}
      />
      <InputField
        label="Secret Crush (we won't tell!)"
        name='input12'
        value={formData.input12}
        onChange={handleChange}
      />
      <InputField
        label='Your Name'
        name='input13'
        value={formData.input13}
        onChange={handleChange}
      />
      <InputField
        label='Favorite Color'
        name='input14'
        value={formData.input14}
        onChange={handleChange}
      />
      <InputField
        label="Ideal Valentine's Date"
        name='input15'
        value={formData.input15}
        onChange={handleChange}
      />
      <InputField
        label="Secret Crush (we won't tell!)"
        name='input16'
        value={formData.input16}
        onChange={handleChange}
      />
      <InputField
        label='Your Name'
        name='input17'
        value={formData.input17}
        onChange={handleChange}
      />
      <InputField
        label='Favorite Color'
        name='input18'
        value={formData.input18}
        onChange={handleChange}
      />
      <InputField
        label="Ideal Valentine's Date"
        name='input19'
        value={formData.input19}
        onChange={handleChange}
      />
      <InputField
        label="Secret Crush (we won't tell!)"
        name='input20'
        value={formData.input20}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105'
      >
        Submit
      </button>
    </form>
  );
}
