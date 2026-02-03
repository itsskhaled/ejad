"use client";

import Credit1 from "@/app/images/almothg.png";
import Credit2 from "@/app/images/H.png";
import Credit3 from "@/app/images/infath.png";
import Credit4 from "@/app/images/MinistryOfJustice.png";
import Credit5 from "@/app/images/Monshaat.png";
import Credit6 from "@/app/images/saudiBA.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, ScrollToPlugin);
export default function AccreditationSection() {

    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const companyRef = useRef([]);
    const ContainerCTA = useRef(null);
    const titleCTA = useRef(null);
    const textCTA = useRef(null);
    const btnCTA = useRef(null);

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
                start: "top 80%",
                end: "+=500px",
                toggleActions: "play none none none",
            }
        });

        tl.from(lineRef.current, {
            xPercent: 100,
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
        new SplitText(textRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                tl.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    stagger: { each: 0.5 },
                    ease: "power2.out"
                }, "<50%")
            }
        })

        tl.from(companyRef.current, {
            opacity: 0,
            ease: "power2.out",
            duration: .5,
            stagger: 0.05
        })


        const CTA = gsap.timeline({
            scrollTrigger: {
                trigger: ContainerCTA.current,
                start: "top 80%",
                end: "100%",
                toggleActions: "play none none none",
            }
        })

        CTA.from(ContainerCTA.current, {
            height: 0,
            duration: .5,
            ease: "power2.out"
        })

        new SplitText(titleCTA.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                CTA.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: ".5",
                    ease: "power2.out"
                })
            }
        })
        new SplitText(textCTA.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                CTA.from(self.lines, {
                    x: 50,
                    opacity: 0,
                    duration: ".5",
                    ease: "power2.out"
                })
            }
        })
        CTA.from(btnCTA.current, {
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: "elastic.out"
        }, "<50%")


    })
    return (
        <section ref={containerRef} className="w-full relative py-20 overflow-hidden">
            <div className="w-full flex justify-center">
                <div className="flex w-full gap-5 md:gap-50 justify-between items-center">
                    <div className="flex-1">
                        <div ref={lineRef} className="w-full h-0.5 bg-black" />
                    </div>
                    <div>
                        <h1 ref={titleRef} className="text-[#1E1E1E] text-5xl pl-10 md:pl-30 font-bold">إعتمادتنا</h1>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div className="flex w-full justify-center">
                    <p ref={textRef} className="text-center text-xl md:text-3xl w-3xl px-5">حصلت إجادة على العديد من الاعتمادات وذلك يعود لإتزامها المستمر بتطبيق أعلى معايير الجودة وحرصها على تقديم تجربة متميزة ترتقي بتطلعات عملائها</p>
                </div>
                <div className="flex flex-wrap gap-20 my-10 px-30 justify-center">
                    {Credits.map((item, i) => {
                        return (
                            <div ref={el => companyRef.current[i] = el} key={i} className="w-80 h-50">
                                <Image src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div ref={ContainerCTA} className="flex flex-col md:flex-row justify-between items-center my-5 w-full bg-[#404250] py-25 px-5 md:px-20">
                <div className="flex flex-col gap-5">
                    <h1 ref={titleCTA} className="text-3xl md:text-5xl text-[#F9BB00] my-5 leading-normal font-bold">خيارك الأول للتمثيل القانوني </h1>
                    <p ref={textCTA} className="text-xl md:text-3xl text-white my-5">نقدم مجموعة واسعة من الخدمات القانونية للأفراد و المؤسسات تلبي احتياجاتهم و تحفظ حقوقهم</p>
                </div>
                <div className="flex w-full justify-start md:justify-end" ref={btnCTA}>
                    <button
                        onClick={() => {
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: { y: 0 },
                                ease: "power2.out",
                            });
                        }}
                        className="text-[#404250] bg-[#F9BB00] px-4 py-2 rounded-md text-2xs md:text-2xl cursor-pointer font-bold">أحجز استشارتك القانونية</button>
                </div>
            </div>
        </section>
    );
}