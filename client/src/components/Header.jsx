"use client";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { AiOutlineSearch } from "react-icons/ai";
export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isActive = (path) => location.pathname === path;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar fluid rounded className="border-b-2 drop-shadow-lg">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Writely
        </span>
      </Navbar.Brand>
      <div>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
          <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button>
        </div>
      <div className="flex md:order-2 gap-2">
        <Button
          pill
          className="w-12 h-10"
          color={"gray"}
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            className="max-w-30"
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={currentUser.rest.username}
                img={currentUser.rest.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{currentUser.rest.username}
              </span>
              <span className="block font-medium truncate">
                {currentUser.rest.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="text-lg font-semibold">
                {" "}
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-lg font-semibold">
                {" "}
                Sign Out
              </Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to={"/sign-up"}>
            <Button outline>Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          to="/"
          className={`p-2 navbarLinkHover ${
            isActive("/") ? "navbarLinkActive" : "bg-white text-black"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`p-2 navbarLinkHover ${
            isActive("/about") ? "navbarLinkActive" : "bg-white text-black"
          }`}
        >
          About
        </Link>
        <Link
          to="/sign-in"
          className={`p-2 navbarLinkHover ${
            isActive("/sign-in") ? "navbarLinkActive" : "bg-white text-black"
          }`}
        >
          Sign In
        </Link>
        <Link
          to="/sign-up"
          className={`p-2 navbarLinkHover ${
            isActive("/sign-up") ? "navbarLinkActive" : "bg-white text-black"
          }`}
        >
          Sign Up
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
