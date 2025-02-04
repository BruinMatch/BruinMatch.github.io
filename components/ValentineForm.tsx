"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import InputField from "./InputField"

export default function ValentineForm() {
  const [formData, setFormData] = useState({
    name: "",
    favoriteColor: "",
    idealDate: "",
    secretCrush: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/submitted?name=" + encodeURIComponent(formData.name))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Your Name" name="name" value={formData.name} onChange={handleChange} />
      <InputField label="Favorite Color" name="favoriteColor" value={formData.favoriteColor} onChange={handleChange} />
      <InputField label="Ideal Valentine's Date" name="idealDate" value={formData.idealDate} onChange={handleChange} />
      <InputField
        label="Secret Crush (we won't tell!)"
        name="secretCrush"
        value={formData.secretCrush}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  )
}

