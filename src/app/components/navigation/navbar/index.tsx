import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function BBNavbar() {
  return (
    <Navbar  className="bg-custom-100" maxWidth="xl">
        <NavbarBrand>
          <Link href="/" className="font-semibold text-xl text-custom-900">BlurredBasket</Link>
        </NavbarBrand>
        
        <NavbarContent justify="end" className="text-custom-900">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
          <Link
                    href="/register"
                    className="text-white font-light w-fit py-2 px-4 bg-custom-800 border-custom-800 rounded-3xl flex items-center gap-3 hover:bg-custom-900"
                >
                    Sign up <span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.39205 11.2102L5.36932 10.1988L8.92045 6.64768H0V5.17041H8.92045L5.36932 1.62496L6.39205 0.60791L11.6932 5.90905L6.39205 11.2102Z" fill="currentColor"></path>
                    </svg></span>
                </Link>
          </NavbarItem>
        </NavbarContent>
    </Navbar>
  );
}
