"use client";

import Credit1 from "@/app/images/watan.png";
import Credit2 from "@/app/images/mobily.png";
import Credit3 from "@/app/images/ELMM.png";
import Credit4 from "@/app/images/SNB.png";
import Credit5 from "@/app/images/tabby.png";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useMemo, useRef } from "react";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function SolutionsCTA() {
  const containerRef = useRef(null);
  const boxInfoRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const btnRef = useRef(null);

  const Credits = useMemo(
    () => [
      { id: 1, image: Credit1, alt: "Almothg" },
      { id: 2, image: Credit2, alt: "H" },
      { id: 3, image: Credit3, alt: "Infath" },
      { id: 4, image: Credit4, alt: "SNB" },
      { id: 5, image: Credit5, alt: "SaudiBA" },
    ],
    []
  );

  // ✅ كررهم كثير عشان loop يضل ناعم حتى لو العدد قليل
  const slides = useMemo(() => [...Credits, ...Credits, ...Credits, ...Credits], [Credits]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.from(boxInfoRef.current, {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.6,
      ease: "power2.out",
    });

    if (titleRef.current) {
      new SplitText(titleRef.current, {
        type: "words",
        mask: "words",
        onSplit: (self) => {
          tl.from(
            self.words,
            {
              y: 40,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.05,
            },
            "<30%"
          );
        },
      });
    }

    if (infoRef.current) {
      new SplitText(infoRef.current, {
        type: "lines",
        mask: "lines",
        onSplit: (self) => {
          tl.from(
            self.lines,
            {
              y: 30,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.06,
            },
            "<10%"
          );
        },
      });
    }

    tl.from(
      btnRef.current,
      {
        y: 25,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "<15%"
    );
  });

  return (
    <section ref={containerRef} className="w-full relative py-16 sm:py-20 px-4 sm:px-8 lg:px-10">
      {/* ✅ Infinity Swiper Logos */}
      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          className="logos-marquee"
          loop
          slidesPerView="auto"
          spaceBetween={24}
          speed={5000} // أكبر = أبطأ وأنعم
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {slides.map((item, i) => (
            <SwiperSlide key={`${item.id}-${i}`} className="!w-auto">
              <div className="w-40 h-40 mx-10">
                <Image src={item.image} alt={item.alt} className="w-full h-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Box */}
      <div
        ref={boxInfoRef}
        className="w-full bg-[#D9D9D973] mt-12 sm:mt-16 rounded-4xl px-6 sm:px-10 lg:px-20 py-10 sm:py-14"
      >
        <h1 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F9BB00] my-3 font-bold">
          حلول قانونية متكاملة
        </h1>

        <div className="flex flex-col md:flex-row w-full justify-between gap-6 md:gap-10 items-start md:items-center">
          <p
            ref={infoRef}
            className="text-[#404250] text-sm sm:text-base md:text-xl lg:text-2xl max-w-full md:max-w-xl leading-relaxed"
          >
            تواصل معنا لحجز استشارتك القانونية واكتشف كيف يمكننا مساعدتك في حفظ حقوقك
          </p>

          <button
            ref={btnRef}
            className="text-[#404250] bg-[#F9BB00] px-8 sm:px-10 md:px-14 py-4 rounded-md text-base sm:text-lg md:text-2xl font-bold"
            onClick={() => {
              if (window.fbq) window.fbq("track", "Contact");
              window.open("https://wa.me/966920008433", "_blank");
            }}
          >
            تواصل معنا
          </button>
        </div>
      </div>
    </section>
  );
}
