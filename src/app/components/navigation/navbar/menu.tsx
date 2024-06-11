'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, User, DropdownSection } from "@nextui-org/react";
import { SessionData, UserRole } from "@/context/AuthContext";
import { logout } from "@/context/actions";
import { redirect } from "next/navigation";

export default function NavbarMenu({ session } : {session: SessionData}) {
  const profileUrlBase = "https://avatar.iran.liara.run/username?username=";

    function handleLogout(): void {
        logout();
        redirect('/');
    }

  return (
    <Navbar className="bg-custom-100" maxWidth="xl">
      <NavbarBrand>
        <Link href="/" className="font-semibold text-xl text-custom-900">BlurredBasket</Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="text-custom-900">
        {!session || !session.isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            {session.role === UserRole.Seller && (
              <NavbarItem className="hidden md:flex">
                <Link href="/my-listings">My Listings</Link>
              </NavbarItem>
            )}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="default"
                  name={session.username}
                  size="sm"
                  src={profileUrlBase + session.username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection showDivider>
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="h-14 gap-2 opacity-100"
                    textValue="Profile"
                  >
                    <User
                      name={session.username}
                      description={session.role}
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: profileUrlBase + session.username,
                      }}
                    />
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem key="logout" onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </NavbarContent>
      </Navbar>
  )}
      
