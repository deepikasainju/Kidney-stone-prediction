import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleNaviagteSignin=()=>{
    navigate("/Login", { replace: true });
  };

  const handlesignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email,password })
    });

    if (response.ok) {
      navigate("/Login", { replace: true });
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <div id="signUp" className="flex justify-center items-center min-h-screen">
      <Card className="max-w-sm w-full">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create new account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handlesignup}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" 
            type="text" 
            placeholder="your name" 
            onChange={(e) => setUsername(e.target.value)}
            required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="username@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" 
            type="password"
            onChange={(e) => setPassword(e.target.value)} 
            required />
          </div>

          <Button type="submit">Sign up</Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="#signUp"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              onClick={handleNaviagteSignin}
            >
              Sign in
            </a>
          </p>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Card>
    </div>
  );
};

export default Signup;
