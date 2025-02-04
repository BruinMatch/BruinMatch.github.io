import ValentineForm from "../components/ValentineForm"
import HeartBackground from "../components/HeartBackground"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-100 relative overflow-hidden">
      <HeartBackground />
      <div className="z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Valentine's Day Survey</h1>
        <ValentineForm />
      </div>
    </main>
  )
}

