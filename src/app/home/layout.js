import NavBar from "@/components/NavBar";
import { getRole } from "@/utils/cookiesHandler";

export default async function HomeLayout({ children }) {
  const role = await getRole();

  return (
    <div className="pl-[256px]">
      <NavBar role={role} />
      {children}
    </div>
  );
}
