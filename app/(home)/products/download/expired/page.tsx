import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React from "react";

const Expired = () => {
  return (
    <>
      <h1 className="mb-4 text-4xl">Download link expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </>
  );
};

export default Expired;
