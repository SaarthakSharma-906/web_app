'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Check if the user is logged in by looking for the logged-in user in localStorage
    const user = localStorage.getItem("loggedInUser");

    router.push("/login");
    if (!user) {
      // If not logged in, redirect to the login page
    }
  }, []); // Depend on `router` to avoid infinite loop

  return (
    <div>
      {/* Mech department Attendance system */}
    </div>
  );
}
