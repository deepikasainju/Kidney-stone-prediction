import { Button, Card, Label, TextInput } from "flowbite-react";

const Signup = () => {
  return (
    <div id="signUp" className="flex justify-center items-center min-h-screen">
      <Card className="max-w-sm w-full">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create new account
        </h1>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" type="text" placeholder="your name" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="username@email.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>

          <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
