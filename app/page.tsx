import Image from "next/image";
import Tube from "./components/Tube";
import MachineBackground from "./components/Machine"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#0088F9]">
      <Tube />
      <MachineBackground/>
    </div>
  );
}
