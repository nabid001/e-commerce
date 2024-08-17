import React from "react";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="my-4 text-4xl">{children}</h1>;
};

export default PageHeader;
