import Image from "next/image";
import logo1 from "@/app/images/logo1.jpg";
export default function Navbar() {
    return (
        <div className="fixed w-full bg-white z-9999 px-5 md:px-10">
            <div className="flex justify-between items-center w-full">
                <div className="w-25 h-25">
                    <Image src={logo1} alt="LogoHeader" className="w-full h-full object-cover" />
                </div>
                <div>
                    <button className="text-[#404250] bg-[#F9BB00] px-4 py-2 rounded-md font-bold cursor-pointer">إحصل على إستشارة مجاناً</button>
                </div>
            </div>
        </div>
    );
}