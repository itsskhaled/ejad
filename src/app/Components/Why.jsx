"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import {
  ChartColumnIncreasing,
  FileCheck,
  Headset,
  MessageSquareLock,
  Scale,
  UserStar,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function WhySection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const lienRef = useRef(null);
  const lightRef = useRef(null);

  const containerCTA = useRef(null);
  const titleCTA = useRef(null);
  const infoCTA = useRef(null);
  const btnCTA = useRef(null);

  useGSAP(() => {

    gsap.fromTo(lightRef.current, { y: 300, opacity: 0.5 }, {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "100%",
        toggleActions: "play none none none",
      }
    })

    const titleSplit = new SplitText(titleRef.current, {
      type: "lines",
      mask: "lines"
    })

    tl.from(lienRef.current, {
      xPercent: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
      .from(titleSplit.lines, {
        y: 50,
        opacity: 0,
        duration: .5,
        ease: "power2.out"
      }, "<50%")


    const CTA = gsap.timeline({
      scrollTrigger: {
        trigger: containerCTA.current,
        start: "top center",
        end: "100%",
        toggleActions: "play none none none",
      }
    });

    const titleCTASplit = new SplitText(titleCTA.current, {
      type: "lines",
      mask: "lines",
    })
    const infoCTASplit = new SplitText(infoCTA.current, {
      type: "lines",
      mask: "lines",
    })
    CTA.from(containerCTA.current, {
      height: 0,
      duration: .5,
      ease: "power2.out"
    })
      .from(titleCTASplit.lines, {
        y: 50,
        opacity: 0,
        duration: .8,
        ease: "power2.out"
      })
      .from(infoCTASplit.lines, {
        y: 50,
        opacity: 0,
        duration: .8,
        ease: "power2.out"
      }, "<50%")
      .from(btnCTA.current, {
        y: 50,
        opacity: 0,
        duration: .8,
        ease: "power2.out"
      }, "<50%")
  })

  return (
    <section ref={containerRef} className="w-full relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Title line */}
      <div className="">
        <div className="flex items-center gap-30">
          <h1 ref={titleRef} className="text-[#1E1E1E] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap pr-20">
            لماذا إجادة ؟
          </h1>
          <div className="flex-1">
            <div ref={lienRef} className="w-full h-0.5 bg-black" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center w-full relative">
        <div ref={lightRef} className="w-20 h-100 md:h-50 bg-[#F9BB00] blur-2xl absolute -right-15" />
        <div className="px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-50 md:gap-12">
            <div className="space-y-8">
              {WhyUsRight.map((item) => (
                <FeatureItem key={`r-${item.id}`} item={item} />
              ))}
            </div>

            <div className="space-y-8">
              {WhyUsLeft.map((item) => (
                <FeatureItem key={`l-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={containerCTA} className="w-full bg-[#404250] py-10 sm:py-12 px-4 sm:px-8 lg:px-12 text-center">
        <h1 ref={titleCTA} className="text-[#F9BB00] text-xl sm:text-2xl md:text-3xl lg:text-5xl my-4 font-bold leading-[1.5]">
          شريكك القانوني الاول
        </h1>
        <p ref={infoCTA} className="text-white text-sm sm:text-base md:text-lg my-4 max-w-3xl mx-auto leading-relaxed">
          تواصل معنا لحجز استشارتك القانونية واكتشف كيف يمكننا مساعدتك في حفظ حقوقك.
        </p>
        <button onClick={() => {
          gsap.to(window, {
            duration: 1,
            scrollTo: "#Consultations",
            ease: "power2.out",
          });
        }} ref={btnCTA} className="bg-[#F9BB00] text-[#404250] rounded-md px-6 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-bold my-3 cursor-pointer">
          استشارة قانونية فورية
        </button>
      </div>
    </section>
  );
}

function FeatureItem({ item }) {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "100%",
        toggleActions: "play none none none",
        // markers: true
      }
    });

    const titleSplit = new SplitText(titleRef.current, {
      type: "lines",
      mask: "lines"
    })
    const textSplit = new SplitText(textRef.current, {
      type: "lines",
      mask: "lines"
    })
    tl.from(iconRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    })
      .from(titleSplit.lines, {
        y: 50,
        duration: .5,
        stagger: { each: .08 },
        ease: "power2"
      }, 0)
      .from(textSplit.lines, {
        y: 50,
        duration: .5,
        stagger: { each: .08 },
        ease: "power2"
      }, 0)
  })
  return (
    <div ref={containerRef} className="flex items-start gap-5 sm:gap-5 relative">
      <span ref={iconRef} className="shrink-0 mt-1">{item.icon}</span>

      <div className="min-w-0">
        <h2 ref={titleRef} className="font-bold text-[#1E1E1E] text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
          {item.title}
        </h2>
        <p ref={textRef} className="text-[#1E1E1E] opacity-80 text-sm sm:text-base md:text-lg mt-2 leading-relaxed wrap-break-words">
          {item.text}
        </p>
      </div>
    </div>
  );
}

const WhyUsRight = [
  { id: 1, title: "خدمات متكاملة", text: "تغطية شاملة لمختلف الاحتياجات القانونية", icon: <Scale stroke="#F9BB00" /> },
  { id: 2, title: "دعم مستمر", text: "تواصل دائم واستجابة سريعة", icon: <Headset stroke="#F9BB00" /> },
  { id: 3, title: "إستشارات موثوقة", text: "آراء قانوينة مبينة على أسس قانونية", icon: <UserStar stroke="#F9BB00" /> },
];

const WhyUsLeft = [
  { id: 1, title: "خبرات متخصصة", text: "معرفة دقيقة بمختلف الأنظمة و التشريعات", icon: <FileCheck stroke="#F9BB00" /> },
  { id: 2, title: "سرية تامة", text: "الاحتفاظ بخصوصية ومعلومات العملاء", icon: <MessageSquareLock stroke="#F9BB00" /> },
  { id: 3, title: "تقارير دورية", text: "متابعة مستمرة ووضوح في الإجراءات", icon: <ChartColumnIncreasing stroke="#F9BB00" /> },
];
