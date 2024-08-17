import React from "react";
import { Nav, NavLink } from "@/components/shared/Nav";

export const dynamic = "force-dynamic";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container mx-6">{children}</div>
    </>
  );
};

export default layout;
