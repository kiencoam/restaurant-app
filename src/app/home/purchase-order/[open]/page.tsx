import React from "react";
import OpenPage from "./OpenPage";

const Open = ({ params }: { params: { open: string } }) => {
  const code = params.open; // Lấy giá trị dynamic route
  console.log("Dynamic Code:", code); // Debug giá trị
  //Khong lay duoc dynamic route
  return <OpenPage code={"SH0000121"} />;
};

export default Open;
