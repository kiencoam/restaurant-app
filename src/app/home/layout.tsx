import NavBar from "@/components/NavBar";

export default async function HomeLayout({ children }) {
  return (
    <div className="pl-[256px]">
      <NavBar />
      {children}
    </div>
  );
}
