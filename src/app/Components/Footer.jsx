"use client";

import { Mail, MapPin, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import logoFooter from "@/app/images/logo2.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Instagram, Linkedin, Twitter } from "@deemlol/next-icons";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)
export default function Footer() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const logoRef = useRef(null);

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 25%",
                end: "100%",
                // markers: true
            }
        });

        const contactInfos = gsap.utils.toArray(".contactInfo");
        const iconFooter = gsap.utils.toArray(".iconFooter");

        const titleSplit = new SplitText(titleRef.current, {
            type: "lines",
            mask: "lines"
        })
        const textSplit = new SplitText(textRef.current, {
            type: "lines",
            mask: "lines"
        })

        tl.from([titleSplit.lines, textSplit.lines], {
            y: 50,
            opacity: 0,
            duration: .5,
            stagger: { each: .05 },
            ease: "power2.out"
        })
            .from([contactInfos, iconFooter , logoRef.current], {
                opacity: 0,
                ease: "power2.out",
                duration: .5,
            })

    })

    return (
        <section ref={containerRef} className="w-full relative bg-[#404250]">
            <div className="flex flex-col md:flex-row justify-between w-full py-20 px-20">
                <div className="">
                    <h1 ref={titleRef} className="text-white my-10 text-2xl">إجادة الأعمال للمحاماة و الإستشارات القانونية</h1>
                    <p ref={textRef} className="text-white md:w-xl">تقدم الشركة خدمات قانونية شاملة وتمثيل قانوني لعملائنا. وبفضل فهمنا المتعمق لعملائنا وخبراتنا القانونية, نستطيع تقديم خدمات تمثيل قانوني واعية وفعالة في مجموعة متنوعة من القطاعات من ضمنها منازعات الشركات والقطاعات التجارية وقطاعات الانشاءات مع التركيز بشكل خاص على مجالي التقاضي والتحكيم في مختلف القطاعات والمجالات</p>
                    <div className="my-10">
                        {contact.map((item) => {
                            return (
                                <div key={item.id} className="flex gap-5 text-white my-3 contactInfo">
                                    <p>{item.icon}</p>
                                    <h1>{item.info}</h1>
                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <div ref={logoRef} className="w-50 h-50">
                        <Image src={logoFooter} alt="Logo Footer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-4">
                        <button className="cursor-pointer iconFooter" aria-label="Instagram">
                            <Instagram stroke="#FFFFFF" />
                        </button>
                        <button className="cursor-pointer iconFooter" aria-label="Twitter">
                            <Twitter stroke="#FFFFFF" />
                        </button>
                        <button className="cursor-pointer iconFooter" aria-label="LinkedIn">
                            <Linkedin stroke="#FFFFFF" />
                        </button>
                        <button className="cursor-pointer iconFooter" aria-label="MapPinned">
                            <MapPinned stroke="#FFFFFF" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[0.5px] bg-black" />
            <div className="flex flex-col md:flex-row w-full justify-between px-10 py-5 text-white text-center text-xs">
                <p>الشروط والاحكام | سياسة الخصوصية </p>
                <p>Copyright © 2026 Ejadalawfirm. All Rights Reserved</p>
            </div>
        </section>
    );
}

const contact = [
    { id: 1, info: "info@ejadalawfirm.sa", icon: <Mail stroke="#F9BB00" /> },
    { id: 2, info: "920008433", icon: <Phone stroke="#F9BB00" /> },
    { id: 3, info: "الرياض - حي النرجس - شارع رباح اللخمي", icon: <MapPin stroke="#F9BB00" /> },
]