import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden">
          <img
            src={currentUser.rest.profilePicture}
            alt={currentUser.rest.username}
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.rest.username} />
        <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.rest.email} />
        <TextInput type="password" id="password" placeholder="Password"/>
        <Button type="submit">Update</Button>
      </form>
      <div className="text-red-500 mt-5 flex justify-between">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
