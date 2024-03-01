import { signIn } from "next-auth/react";
import Image from "next/image";
import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      // Send a request to your server to verify the username and password
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response.statusText);
      if (response.ok) {
        // If username and password are verified, sign in with Spotify
        await signIn("spotify", { callbackUrl: "/" });
        router.push("/"); // Redirect to home page after successful sign in
      } else {
        // If username and password are not verified, handle the error
        console.error("Username or password is incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    //signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <Layout title="Log in to HMusic">
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
        <Image
          src="/images/HMusic2.png"
          alt="Hmusic logo"
          width={320}
          height={96}
          objectFit="contain"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-80 px-4 py-2 mb-4 text-lg tracking-widest rounded-full focus:outline-none shadow-md focus:ring-2 focus:ring-primary text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-80 px-4 py-2 mb-4 text-lg tracking-widest rounded-full focus:outline-none shadow-md focus:ring-2 focus:ring-primary text-black"
        />
        <button
          className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </Layout>
  );
}
