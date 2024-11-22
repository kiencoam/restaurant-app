import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    redirect("/home");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
