"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import tawunya from "@/app/images/tawunya.png";
import MOE from "@/app/images/MOE.png";
import Stc from "@/app/images/Stc-logo.png";
import ELMM from "@/app/images/ELMM.png";
import tabby from "@/app/images/tabby.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";


gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function SuccessStory() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const lienRef = useRef(null);


    useEffect(() => {
        if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

        const swiper = swiperRef.current;

        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "100%",
                toggleActions: "play none none none"
            }
        })
        const texts = gsap.utils.toArray(".text");
        const titleSpilt = new SplitText(titleRef.current, {
            type: "lines",
            mask: "lines",
        });
        tl.from(lienRef.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        })
            .from(titleSpilt.lines, {
                y: 50,
                duration: .5,
                ease: "power2.out"
            })
    })

    return (
        <section ref={containerRef} className="w-full relative py-20 overflow-hidden">
            {/* Title */}
            <div className="flex w-full items-center gap-5 md:gap-50">
                <h1 ref={titleRef} className="text-[#1E1E1E] text-2xl sm:text-2xl md:text-4xl lg:text-5xl pr-10 md:pr-10 whitespace-nowrap font-bold">
                    نبني قصة نجاح تصنع الفرق
                </h1>
                <div className="flex-1">
                    <div ref={lienRef} className="w-full h-px bg-black" />
                </div>
            </div>


            <div className="relative mt-14 px-10 overflow-visible">
                {/* الأسهم */}
                <button ref={prevRef} className="nav-btn nav-prev" aria-label="prev" />
                <button ref={nextRef} className="nav-btn nav-next" aria-label="next" />

                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    dir="rtl"
                    loop={false}
                    rewind={false}
                    watchOverflow={true}
                    slidesPerView={2}
                    slidesPerGroup={2}
                    spaceBetween={28}
                    speed={700}
                    roundLengths={true}
                    resistanceRatio={0.85}
                    breakpoints={{
                        0: { slidesPerView: 1, slidesPerGroup: 1 },
                        1024: { slidesPerView: 2, slidesPerGroup: 2 },
                    }}
                    className="
                        success-swiper
                        overflow-visible
                        [&_.swiper-wrapper]:overflow-visible
                        [&_.swiper-slide]:overflow-visible
                        "
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id} className="overflow-visible">

                            <div className="relative pt-12 overflow-visible">
                                <div className="w-[200px] h-[80px] bg-white rounded-2xl absolute top-0 right-10 z-60 px-4 shadow">
                                    <Image src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                                </div>

                                <article className="bg-[#F2F2F2] rounded-2xl px-10 py-10 text-right h-full cursor-grab relative">
                                    <div className="space-y-5 leading-8 text-[#1E1E1E]">
                                        <p className="text text-xs md:text-base">{item.text1}</p>
                                        <p className="text text-xs md:text-base">{item.text2}</p>
                                        <p className="text text-xs md:text-base">{item.text3}</p>
                                        <p className="text text-xs md:text-base">{item.text4}</p>
                                    </div>
                                </article>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

const data = [
    {
        id: 1,
        image: tawunya,
        alt: "التعاونية للتأمين",
        text1: "قدّمت شركة إجادة للمحاماة والاستشارات القانونية خدمات قانونية متخصصة لصالح شركة التعاونية للتأمين، شملت تولي مطالبات التعويض المالي ضد الأطراف المتسببين في الحوادث ",
        text2: "باشرت شركة إجادة للمحاماة والاستشارات القانونية بدراسة ملفات الحوادث وتقدير المسؤوليات النظامية، واتخاذ الإجراءات القانونية اللازمة للمطالبة بالتعويضات المستحقة، بما أسفر عن تحصيل مبالغ مالية لصالح العميل وتسوية عدد من المطالبات بكفاءة عالية",
        text3: "وتعكس هذه القصة خبرة شركة إجادة في إدارة مطالبات التعويض، وقدرتها على تمثيل شركات التأمين وحماية حقوقها وفق الأنظمة المعمول بها",
        text4: ""
    },
    {
        id: 2,
        image: MOE,
        alt: "وزارة الصناعة والثروة المعدنية",
        text1: "قدّمت شركة إجادة للمحاماة والاستشارات القانونية خدمات قانونية متخصصة لصالح وزارة الصناعة والثروة المعدنية، تمثلت في تولي مجموعة من المطالبات المالية ضد شركات وأفراد نتيجة مخالفة الأنظمة ذات العلاقة، واستخدام الثروة المعدنية دون الحصول على التراخيص النظامية اللازمة.",
        text2: "باشرت شركة إجادة للمحاماة والاستشارات القانونية بدراسة المخالفات والوقائع، وتطبيق الأنظمة واللوائح ذات الصلة، واتخاذ الإجراءات النظامية اللازمة للمطالبة بالتعويضات المالية، بما يسهم في حماية الثروة المعدنية وضمان الامتثال للأنظمة المعمول بها",
        text3: "وتعكس هذه القصة خبرة شركة إجادة للمحاماة والاستشارات القانونية في إدارة القضايا ذات الطابع التنظيمي، وقدرتها على تمثيل الجهات الحكومية بكفاءة عالية، ودعم جهودها في حفظ الحقوق وتعزيز الالتزام النظامي",
        text4: ""
    },
    {
        id: 3,
        image: Stc,
        alt: "شركة الاتصالات السعودية",
        text1: "قدّمت شركة إجادة للمحاماة والاستشارات القانونية خدمات قانونية متخصصة لصالح شركة الاتصالات السعودية STS، شملت تولي مطالبات مالية ضد أفراد عن مبالغ مستحقة ناتجة عن قيمة أجهزة جوالات وفواتير تابعة لمجموعة من الخدمات.",
        text2: "باشر شركة إجادة للمحاماة والاستشارات القانونية بدراسة الملفات والمستندات، واتخاذ الإجراءات النظامية اللازمة للمطالبة بالمستحقات، بما أسفر عن تحصيل مبالغ مالية وتسوية عدد كبير من القضايا بكفاءة، مع الحفاظ على الحقوق النظامية للعميل.",
        text3: "وتعكس هذه القصة خبرة شركة إجادة للمحاماة والاستشارات القانونية في إدارة المطالبات المالية، وقدرتها على تقديم أفضل الحلول القانونية والتي تدعم استمرارية الأعمال وتعزيز الالتزام.",
        text4: ""
    },
    {
        id: 4,
        image: ELMM,
        alt: "شركة علم",
        text1: "قدّمت شركة إجادة للمحاماة والاستشارات القانونية خدمات قانونية متخصصة لصالح شركة علم، شملت تولي مطالبات مالية في قضايا تجارية ضد شركات ومعارض سيارات",
        text2: "باشرت شركة إجادة للمحاماة والاستشارات القانونية بدراسة العلاقات التعاقدية والوقائع محل النزاع، واتخاذ الإجراءات النظامية اللازمة للمطالبة بالمستحقات المالية، بما أسفر عن تسوية عدد من القضايا وتحقيق نتائج إيجابية لصالح العميل",
        text3: "وتعكس هذه التجربة خبرة شركة إجادة للمحاماة والاستشارات القانونية في إدارة القضايا التجارية، وقدرتها على تمثيل الشركات الكبرى وحماية حقوقها وفق الأسس النظامية المعتمدة",
        text4: ""
    },
    {
        id: 5,
        image: tabby,
        alt: "تابي للتمويل",
        text1: "نجحت شركة إجادة للمحاماة والاستشارات القانونية في تقديم خدمات قانونية متخصصة لصالح شركة تابي للتمويل، شملت تولي عدد من القضايا المتعلقة بالمطالبات المالية والمسترجعات المستحقة لدى التجار",
        text2: "تمثلت هذه القضايا في مطالبات ناتجة عن مسترجعات عمليات تمويل بسبب عدم التزام بعض التجار بسداد المبالغ المستحقة وفق الاتفاقيات المبرمة، مما تطلب معالجة قانونية دقيقة نظرًا لتعدد القضايا وارتباطها بعقود تجارية وتمويلية منظمة",
        text3: "باشرت شركة إجادة للمحاماة والاستشارات القانونية بدراسة العقود وتصنيف المطالبات، ووضع آلية قانونية واضحة للمطالبة بالمستحقات، شملت المخاطبات النظامية والتفاوض، واتخاذ الإجراءات النظامية عند تعثر التسوية الودية",
        text4: "وأسفرت الجهود المبذولة عن تحصيل واسترداد مبالغ مستحقة، وتسوية عدد كبير من القضايا بكفاءة، بما ساهم في تعزيز آليات التحصيل وتقليل المخاطر القانونية، وهذا مما بعكس قدرة شركة إجادة للمحاماة والاستشارات القانونية على إدارة الملفات القانونية ذات الحجم الكبير ودعم الشركات الكبرى في حماية حقوقها واستدامة أعمالها"
    },
];
