import Image from "next/image";
import upTunell from "@/public/backBigTunnel.svg";

export default function Tube() {
  return (
    <div className=" opacity-70 absolute w-full h-[260px]  top-10">
      {/* <div className="bg-white h-[42px] w-[100%] opacity-70 blur-[4px]	" /> */}
      <Image src={upTunell} alt="" fill={true} />
    </div>
  );
}
