import Image from "next/image";

export default function infoBlock() {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 lg:gap-20 my-10 lg:my-20 px-4">
  <div className="flex flex-col items-center text-center p-6 max-w-[357px]">
    <Image
      src="/icons/map.png"
      alt="Availability"
      width={64}
      height={64}
      className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
    />
    <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
      Availability
    </h3>
    <p className="text-[14px] md:text-[16px] text-black60">
      Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
    </p>
  </div>

  <div className="flex flex-col items-center text-center p-6 max-w-[357px]">
    <Image
      src="/icons/comfort.png"
      alt="Comfort"
      width={64}
      height={64}
      className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
    />
    <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
      Comfort
    </h3>
    <p className="text-[14px] md:text-[16px] text-black60">
      Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis
    </p>
  </div>

  <div className="flex flex-col items-center text-center p-6 max-w-[357px]">
    <Image
      src="/icons/saving.png"
      alt="Savings"
      width={64}
      height={64}
      className="w-[56px] h-[56px] md:w-[64px] md:h-[64px]"
    />
    <h3 className="font-bold text-[16px] md:text-[20px] mt-4 mb-2">
      Savings
    </h3>
    <p className="text-[14px] md:text-[16px] text-black60">
      Pretium convallis id diam sed commodo vestibulum lobortis volutpat
    </p>
  </div>
</div>
  );
}
