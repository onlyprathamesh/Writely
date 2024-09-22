"use client";
import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {FaMoon} from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <Navbar fluid rounded className="border drop-shadow-lg">
    <Navbar.Brand href="/">
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Writely</span>
    </Navbar.Brand>
    <div className="flex md:order-2 gap-2">
      <Button pill className="w-12 h-10 hidden sm:inline" color={"gray"}><FaMoon /></Button>
      <Button outline>Sign In</Button>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Link to="/" className={`p-2 navbarLinkHover ${isActive("/") ? "navbarLinkActive" : "bg-white text-black"}`}>
        Home
      </Link>
      <Link to="/dashboard" className={`p-2 navbarLinkHover ${isActive("/dashboard") ? "navbarLinkActive" : "bg-white text-black"}`}>Dashboard</Link>
      <Link to="/about" className={`p-2 navbarLinkHover ${isActive("/about") ? "navbarLinkActive" : "bg-white text-black"}`}>About</Link>
      <Link to="/sign-in" className={`p-2 navbarLinkHover ${isActive("/sign-in") ? "navbarLinkActive" : "bg-white text-black"}`}>Sign In</Link>
      <Link to="/sign-up" className={`p-2 navbarLinkHover ${isActive("/sign-up") ? "navbarLinkActive" : "bg-white text-black"}`}>Sign Up</Link>
    </Navbar.Collapse>
  </Navbar>
  )
}
