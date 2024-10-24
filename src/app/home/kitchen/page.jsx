import { Ordered } from "@/components/Ordered";
import { Prepared } from "@/components/Prepared";

const KitchenPage = () => {
  return (
    <section className="flex h-screen w-full bg-[#f7f7f7]">
      <Ordered />
      <Prepared />
    </section>
  );
};

export default KitchenPage;
