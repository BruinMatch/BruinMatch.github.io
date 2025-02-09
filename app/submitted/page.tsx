import Link from "next/link";
import HeartBackground from "../../components/HeartBackground";

export const dynamic = "force-dynamic";

export default function SubmittedPage({ searchParams }: { searchParams: { name: string } }) {
  return (
    <main className='min-h-screen flex items-center justify-center bg-pink-100 relative overflow-hidden'>
      <HeartBackground />
      <div className='z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <h1 className='text-3xl font-bold text-red-600 mb-6'>Thank You, {searchParams.name}!</h1>
        <p className='text-lg mb-6'>Your Valentine's Day survey has been submitted.</p>
        <Link
          href='/'
          className='text-red-500 hover:text-red-600 underline'
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
