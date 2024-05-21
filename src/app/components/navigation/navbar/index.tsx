import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function BBNavbar() {
  return (
    <Navbar isBlurred={false} className="bg-white" maxWidth="full">
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl text-custom-900">BlurredBasket</Link>
        </NavbarBrand>
        
        <NavbarContent justify="end" className="text-custom-900">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="secondary" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
    </Navbar>
  );
}
