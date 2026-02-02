"use client";

import Image from "next/image";
import heroImage from "@/app/images/1.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, SplitText);
export default function Hero() {
    const titleRef = useRef(null);
    const subTextRef = useRef(null);
    const submitRef = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline({ duration: .5 });
        // gsap.from()
        new SplitText(titleRef.current, {
            type: "words",
            mask: "words",
            onSplit: (self) => {
                gsap.from(self.words, {
                    y: 50,
                    opacity: 0,
                    duration: .8,
                    ease: "power2.out",
                    stagger: { each: .05 }
                })
            }
        });
        new SplitText(subTextRef.current, {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                gsap.from(self.lines, {
                    y: 50,
                    opacity: 0,
                    duration: .8,
                    ease: "power2.out",
                    stagger: { each: .05 }
                })
            }
        });

        const labels = gsap.utils.toArray(".label");
        const inputs = gsap.utils.toArray(".input");
        tl.from([labels, inputs], {
            opacity: 0,
            duration: .8,
            ease: "power2.out",
            stagger: { each: .05 }
        }).from(submitRef.current, {
            scale: 0,
            duration: 1,
            ease: "elastic.out",
        }, "<50%")

    })
    return (
        <section className="w-full h-[130vh] relative overflow-hidden">
            <div className="absolute flex w-full justify-between">
                <div className="w-full" />
                <div className="w-full h-[130vh] bg-white/60 pt-50 px-15">
                    <h1 ref={titleRef} className="text-[#404250] text-3xl md:text-5xl lg:text-7xl leading-[1.2]">استشارتك القانونية<br />على بعد <span className="text-[#F9BB00]">خطوة واحدة</span></h1>
                    <h1 ref={subTextRef} className="my-5 text-xl">يرجى تعبئة الحقول المطلوبة</h1>
                    <div>
                        <div className="md:flex w-full justify-between gap-5">
                            <div>
                                <label htmlFor="name" className="text-[#404250] label">الاسم</label><br />
                                <input type="text" id="name" className="bg-white px-2 py-2 w-70 md:w-80 rounded-md mb-5 input" required />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="text-[#404250] label">رقم الجوال</label><br />
                                <input type="text" id="phoneNumber" className="bg-white px-2 py-2 w-70 md:w-80 rounded-md mb-5 input" required />
                            </div>
                        </div>
                        {/* <br /> */}
                        <div className="md:flex w-full justify-between">
                            <div>
                                <label htmlFor="email" className="text-[#404250] label">البريد الإلكتروني</label><br />
                                <input type="email" id="email" className="bg-white px-2 py-2 w-70 md:w-80 rounded-md input" required />
                            </div>
                            <div>
                                <label htmlFor="case" className="text-[#404250] label">الخدمة المطلوبة</label><br />
                                <select id="case" className="bg-white px-2 py-2 w-70 md:w-80 rounded-md input" required>
                                    <option value="">حدد نوع الخدمة</option>
                                    <option value="1">خدمة الشركات والمنشآت التجارية</option>
                                    <option value="1">أنظمة سوق المال</option>
                                    <option value="1">الحوكمة والسياسات العامة</option>
                                    <option value="1">صياغة العقود والاتفاقيات</option>
                                    <option value="1">التحكيم والوساطة</option>
                                    <option value="1">قسمة التركات وتصفيتها</option>
                                    <option value="1">الأوقاف والوصايا</option>
                                    <option value="1">الاستشارات القانونية</option>
                                    <option value="1">الاستشارات الزكوية والضريبية</option>
                                    <option value="1">التقاضي وحل المنازعات</option>
                                    <option value="1">اللوائح والتشريعات</option>
                                    <option value="1">التوثيق والتسجيل العيني</option>
                                    <option value="1">الملكية الفكرية</option>
                                    <option value="1">الإستثمار الأجنبي</option>
                                    <option value="1">لوائح تنظيم العمل</option>
                                    <option value="1">خدمات التنفيذ</option>
                                    <option value="1">أُخرى</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <label htmlFor="details" className="text-[#404250] label">تفاصيل القضية</label><br />
                        <textarea
                            name="case_details"
                            placeholder="اكتب تفاصيل القضية..."
                            className="w-full min-h-[180px] rounded-md px-4 py-3 bg-white input" required
                        ></textarea>
                        <div ref={submitRef}>
                        <input type="submit" value="إرسال" className="bg-[#404250] text-white w-full px-4 py-2 rounded-md cursor-pointer hover:bg-[#F9BB00] hover:text-[#404250] transition-all duration-300 mt-5" />
                        </div>
                    </div>
                </div>
            </div>
            <Image src={heroImage} alt="heroImage" className="w-full h-full object-cover" />
        </section>
    );
}