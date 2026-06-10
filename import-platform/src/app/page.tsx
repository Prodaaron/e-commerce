"use client";

import styles from "./page.module.css";



import { registerUser } from "@/lib/firebase/auth";

export default function Home() {

  const handleTest = async () => {
    try {
      const user = await registerUser(
        "test@test.com",
        "Password123!"
      );

      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.container}>
      <button onClick={handleTest}>Test Registration</button>
    </div>
  );
}
