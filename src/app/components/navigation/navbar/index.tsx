import React from "react";
import { getSession } from "@/context/actions";
import NavbarMenu from "./menu";

export default async function BBNavbar() {
  const session = await getSession();
  return <NavbarMenu session={{...session}} />;
}
