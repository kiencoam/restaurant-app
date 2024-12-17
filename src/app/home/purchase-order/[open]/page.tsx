import React from "react";
import OpenPage from "./OpenPage";

const Open = async ({ params }: { params: { open: string } }) => {
  const code = await params.open; // Lấy giá trị dynamic route
  console.log("Dynamic Code:", code); // Debug giá trị
  return <OpenPage code={code} />;
};

export default Open;
