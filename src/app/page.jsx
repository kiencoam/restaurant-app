import { firstView } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { decodeJWT } from "@/utils/JWTDecoder";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    const payload = decodeJWT(token.value);
    const role = payload.scope;
    const path = firstView(role);
    if (path) redirect(path);
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
