"use client";

import alsgqr from "@/app/images/alsgqr.png";
import ELMM from "@/app/images/ELMM.png";
import esnad from "@/app/images/esnad.png";
import MIS from "@/app/images/MIS.png";
import mobily from "@/app/images/mobily.png";
import MOE from "@/app/images/MOE.png";
import National from "@/app/images/National-Water-Company-Saudi-Arabia-01-e1750240721168.png";
import RCFJ from "@/app/images/RCFJ-Y.png";
import SAB from "@/app/images/SAB.png";
import saudiBA from "@/app/images/saudiBA.png";
import SEC from "@/app/images/SEC.png";
import SNB from "@/app/images/SNB.png";
import Stclogo from "@/app/images/Stc-logo.png";
import tabby from "@/app/images/tabby.png";
import takaful from "@/app/images/takaful.png";
import tawunya from "@/app/images/tawunya.png";
import watan from "@/app/images/watan.png";
import UCA from "@/app/images/UCA.png";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export default function ClientsSections() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const clientsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "100%",
                toggleActions: "play none none none",
            }
        })
        tl.from(titleRef.current, {
            opacity: 0,
            filter: "blur(10px)",
            duration: .5
        })
            .from(clientsRef.current, {
                scale: 0,
                opacity: 0,
                duration: .5,
                stagger: { each: 0.01 },
                ease: "power2.out"
            })

    })
    return (
        <section ref={containerRef} className="w-full relative py-20 px-20">
            <h1 ref={titleRef} className="text-center text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">عملائنا</h1>
            <div className="flex flex-wrap justify-center w-full gap-10 my-20">
                {Clients.map((item, i) => {
                    return (
                        <div ref={el => clientsRef.current[i] = el} key={i} className="w-50 h-20">
                            <Image src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

const Clients = [
    { id: 1, image: alsgqr, alt: "alsgqr" },
    { id: 2, image: ELMM, alt: "ELMM" },
    { id: 3, image: esnad, alt: "esnad" },
    { id: 4, image: MIS, alt: "MIS" },
    { id: 5, image: mobily, alt: "mobily" },
    { id: 6, image: MOE, alt: "MOE" },
    { id: 7, image: National, alt: "National" },
    { id: 8, image: RCFJ, alt: "RCFJ" },
    { id: 9, image: SAB, alt: "SAB" },
    { id: 10, image: saudiBA, alt: "saudiBA" },
    { id: 11, image: SEC, alt: "SEC" },
    { id: 12, image: SNB, alt: "SNB" },
    { id: 13, image: Stclogo, alt: "Stclogo" },
    { id: 14, image: tabby, alt: "tabby" },
    { id: 15, image: takaful, alt: "takaful" },
    { id: 16, image: tawunya, alt: "tawunya" },
    { id: 17, image: watan, alt: "watan" },
    { id: 18, image: UCA, alt: "UCA" },
]