import React from "react";
import { Nav, NavLink } from "@/components/shared/Nav";

export const dynamic = "force-dynamic";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container mx-6">{children}</div>
    </>
  );
};

export default HomeLayout;
