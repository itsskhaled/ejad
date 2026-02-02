"use client";

import background from "@/app/images/2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function AboutSection() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);
    const titleBoxRef = useRef(null);
    const textBoxRef = useRef(null);
    const rateNumber = useRef([]);
    const rateName = useRef([]);
    const rate = [
        { id: 1, name: "قضية ناجحة", number: "6159" },
        { id: 2, name: "عميل", number: "200+" },
        { id: 3, name: "قضية", number: "6479" },
        { id: 4, name: "محامي ومستشار", number: "12+" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "+=500px",
                toggleActions: "play none none none",
                // markers: true
            }
        });

        tl.from(lineRef.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            ease: "power1.out"
        })
        new SplitText(titleRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                tl.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "<50%")
            }
        })
        new SplitText(titleBoxRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                tl.from(self.lines, {
                    x: 50,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "<50%")
            }
        })
        new SplitText(textBoxRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                tl.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    stagger: { each: 0.05 },
                    ease: "power2.out"
                }, "<50%")
            }
        })
        rateName.current.forEach((_, i) => {
            tl.from(rateName.current[i], {
                filter: "blur(10px)",
                opacity: 0,
                ease: "power2.out",
                duration: .5,
                stagger: { each: 0.05 }
            })
        })

    })


    return (
        <section ref={containerRef} className="w-full relative py-20 overflow-hidden">
            <div className="flex w-full gap-6 md:gap-50 justify-between items-center">
                <div>
                    <h1 ref={titleRef} className="text-[#1E1E1E] text-3xl sm:text-3xl md:text-4xl lg:text-5xl pr-10 md:pr-30">
                        تعرف على إجادة
                    </h1>
                </div>
                <div className="flex-1">
                    <div ref={lineRef} className="w-full h-0.5 bg-black" />
                </div>
            </div>

            <div className="px-4 sm:px-8 md:px-15 py-20">
                <div className="w-full relative md:h-190 min-h-[520px] md:min-h-0">
                    <div className="absolute inset-0 flex flex-col gap-4 md:gap-10 px-4 sm:px-8 md:px-20 py-10 sm:py-14 md:py-40">
                        <h1 ref={titleBoxRef} className="text-white text-xl sm:text-xl md:text-3xl lg:text-5xl max-w-full md:w-4xl leading-tight">
                            إجادة الأعمال للمحاماة و الإستشارات القانونية
                        </h1>

                        <p ref={textBoxRef} className="text-white text-[8px] sm:text-xs md:text-3xl lg:text-3xl max-w-full md:w-4xl leading-relaxed wrap-break-words">
                            تقدم الشركة خدمات قانونية شاملة وتمثيل قانوني لعملائنا. وبفضل فهمنا
                            المتعمق لعملائنا وخبراتنا القانونية, نستطيع تقديم خدمات تمثيل قانوني
                            واعية وفعالة في مجموعة متنوعة من القطاعات من ضمنها منازعات الشركات
                            والقطاعات التجارية وقطاعات الانشاءات مع التركيز بشكل خاص على مجالي
                            التقاضي والتحكيم في مختلف القطاعات والمجالات
                        </p>
                    </div>

                    <div className="absolute left-0 right-0 -bottom-10 md:-bottom-20 px-4 md:px-0">
                        <div className="grid grid-cols-2 gap-3 md:flex md:w-full md:justify-center md:gap-5">
                            {rate.map((item, i) => (
                                <div
                                    key={i}
                                    className="relative flex flex-col justify-center bg-[#404250] rounded-2xl h-28 sm:h-36 md:h-60 w-full md:w-60">
                                    <p ref={el => rateNumber.current = el} className="text-[#F9BB00] font-bold text-2xl sm:text-2xl md:text-4xl lg:text-6xl text-center md:absolute md:top-15 md:w-full">
                                        {item.number}
                                    </p>
                                    <h1 ref={el => rateName.current[i] = el} className="text-white font-semibold text-xl sm:text-xl md:text-3xl lg:text-3xl text-center md:absolute md:bottom-5 md:px-5">
                                        {item.name}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Image
                        src={background}
                        alt="background"
                        className="w-full h-full object-cover rounded-t-2xl"
                    />
                </div>
            </div>
        </section>
    );
}
