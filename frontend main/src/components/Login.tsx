import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const errorData = await response.json();
      setError(errorData.message);
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-sm w-full">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="username@email.com"
              onChange={(e) => setUsername(e.target.value)}
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

          <Button type="submit">Sign in</Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <a
              href="#signUp"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </a>
          </p>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Card>
    </div>
  );
};

export default Login;
