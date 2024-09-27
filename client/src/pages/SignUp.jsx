import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("http://localhost:8000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.message);
        setLoading(false);
      } else navigate("/sign-in");
    } catch (error) {
      const result = await response.json();
      setErrorMessage(result.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-20 flex md:block">
        <div className="flex p-5 max-w-4xl mx-auto flex-col md:flex-row md:items-center">
          <div className="flex-1 font-bold text-3xl mb-6 md:mb-0">
            Welcome to
            <span className="mx-4 text-4xl bg-TealBlue rounded-lg text-white px-3 pb-2">
              Writely
            </span>
            <p className="text-xl font-normal mt-8">
              A platform to Write, Share, Inspire.
            </p>
          </div>
          <div className="flex-1">
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleFormSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  type="username"
                  placeholder="Enter your username"
                  required
                  onChange={handleFormData}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleFormData}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={handleFormData}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Loading....</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <div className="flex gap-2 mt-5">
              <span>Have an account? </span>
              <Link to={"/sign-in"} className="text-blue-500 underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
