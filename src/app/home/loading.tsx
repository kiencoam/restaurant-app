import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <Image
        src="/icons/loading.svg"
        width={150}
        height={150}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
};

export default Loading;