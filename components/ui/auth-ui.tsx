import Image from "next/image";
import { Divider } from "@nextui-org/divider";

export default function AuthUI() {
  return (
    <div className="flex items-center justify-center bg-black">
      <div className="mx-auto flex max-w-[400px] flex-col gap-2">
        <Image src="/AdLabLogo.png" width={520} height={340} alt="Logo" />
        <Divider className="bg-white" />
        <Image src="/RMIT-symbol.jpg" width={420} height={420} alt="Logo" />
        <p className="tracking-tight text-white text-center">
          RMIT Data Science Post-Graduate Project
        </p>
      </div>
    </div>
  );
}
