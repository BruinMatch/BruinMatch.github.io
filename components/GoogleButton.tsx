import { useEffect, useState } from "react";
import { signInWithGoogle, signOutWithGoogle } from "@/lib/actions/auth";

export default function GoogleButton({
  updateFirstName,
  updateLastName,
  updateEmail,
}: {
  updateFirstName: (googleFName: string) => void;
  updateLastName: (googleLName: string) => void;
  updateEmail: (email: string) => void;
}) {
  const [userProcessed, setUserProcessed] = useState(false);

  useEffect(() => {
    const handleUser = async () => {
      if (userProcessed) return;

      const session = await fetch("/api/auth/session").then((res) => res.json());
      const user = session?.user;

      if (user && user.name && user.email) {
        if (isUclaEmail(user?.email)) {
          updateFirstName(splitName(user?.name).firstName);
          updateLastName(splitName(user?.name).lastName);
          updateEmail(user?.email);
          console.log(splitName(user?.name).firstName);
        } else {
          await signOutWithGoogle();
        }
      } else {
        await signOutWithGoogle();
      }

      setUserProcessed(true); // Mark the user as processed
    };

    handleUser();
  }, [userProcessed, updateFirstName, updateLastName, updateEmail]);

  return (
    <form action={signInWithGoogle}>
      <button type='submit'>Sign in with your UCLA Email to start</button>
    </form>
  );
}

function splitName(fullName?: string): { firstName: string; lastName: string } {
  if (!fullName) return { firstName: "", lastName: "" }; // Handle undefined or empty name

  const nameParts = fullName.trim().split(/\s+/); // Split by spaces, handling multiple spaces
  const firstName = nameParts[0] || ""; // First word as first name
  const lastName = nameParts.slice(1).join(" ") || ""; // Everything else as last name

  return { firstName, lastName };
}

function isUclaEmail(email?: string): boolean {
  if (!email) return false; // Handle undefined or empty email

  // const uclaRegex = /^[a-zA-Z0-9._%+-]+@(g\.)?ucla\.edu$/;
  const uclaRegex = /^[a-zA-Z0-9._%+-]+@fpsct\.org$/;
  return uclaRegex.test(email);
}
