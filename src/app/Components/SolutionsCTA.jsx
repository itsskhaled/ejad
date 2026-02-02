"use client";

import Credit1 from "@/app/images/almothg.png";
import Credit2 from "@/app/images/H.png";
import Credit3 from "@/app/images/infath.png";
import Credit4 from "@/app/images/MinistryOfJustice.png";
import Credit5 from "@/app/images/Monshaat.png";
import Credit6 from "@/app/images/saudiBA.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function SolutionsCTA() {
    const containerRef = useRef(null);
    const boxInfoRef = useRef(null);
    const titleRef = useRef(null);
    const infoRef = useRef(null);
    const btnRef = useRef(null);
    const Credits = [
        { id: 1, image: Credit1, alt: "Almothg" },
        { id: 2, image: Credit2, alt: "Almothg" },
        { id: 3, image: Credit3, alt: "Almothg" },
        { id: 4, image: Credit4, alt: "Almothg" },
        { id: 5, image: Credit5, alt: "Almothg" },
        { id: 6, image: Credit6, alt: "Almothg" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "+=500px",
                toggleActions: "play none none none",
            }
        });

        tl.from(boxInfoRef.current, {
            scaleX: 0,
            duration: .5,
            ease: "power2.out"
        })
        new SplitText(titleRef.current, {
            type: "words",
            mask: "words",
            onSplit: (self) => {
                tl.from(self.words, {
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: { each: 0.05 }
                }, "<50%")
            }
        })
        new SplitText(infoRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                tl.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: { each: 0.05 }
                })
            }
        })
        tl.from(btnRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
        })
    })
    return (
        <section ref={containerRef} className="w-full relative py-20 px-10">
            <div className="flex justify-center w-full gap-5">
                {Credits.map((item) => {
                    return (
                        <div key={item.id} className="w-50 sm:w-50 md:w-60 lg:w-80 h-30 sm:h-30 md:h-40 lg:h-50">
                            <Image src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                        </div>
                    );
                })}
            </div>
            <div ref={boxInfoRef} className="w-full min-h-80 bg-[#D9D9D973] my-20 rounded-4xl px-20 py-20">
                <h1 ref={titleRef} className="text-5xl text-[#F9BB00] my-5">حلول قانونية متكاملة</h1>
                <div className="flex flex-col sm:flex-col md:flex-row w-full justify-between">
                    <p ref={infoRef} className="text-[#404250] text-xs md:text-xl lg:text-2xl max-w-full md:max-w-xl wrap-break-words">تواصل معنا لحجز استشارتك القانونية واكتشف كيف يمكننا مساعدتك في حفظ حقوقك</p>
                    <button ref={btnRef} className="text-[#404250] bg-[#F9BB00] px-10 md:px-15 py-4 rounded-md text-xs md:text-2xl font-bold cursor-pointer">تواصل معنا</button>
                </div>
            </div>
        </section>
    );
}