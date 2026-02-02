"use client";

import { Instagram, Linkedin, Twitter } from "@deemlol/next-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { Mail, MapPin, MapPinned, Phone } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)
export default function ConsultationsSection() {

  const containerRef = useRef(null);
  const lienRef = useRef(null);
  const titleRef = useRef(null);
  const subTextRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "100%",
        toggleActions: "play none none none",
      }
    });

    const titleSpilt = new SplitText(titleRef.current, {
      type: "lines",
      mask: "lines"
    })
    const subTextSpilt = new SplitText(subTextRef.current, {
      type: "lines",
      mask: "lines"
    })

    tl.from(lienRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 1,
      ease: "power1.out"
    })
      .from(titleSpilt.lines, {
        y: 50,
        opacity: 0,
        duration: .5,
        ease: "power2.out"
      }, "<50%")
      .from(subTextSpilt.lines, {
        y: 50,
        opacity: 0,
        duration: .5,
        ease: "power2.out"
      }, "<")
    const contacts = gsap.utils.toArray(".contact");
    const iconsSosial = gsap.utils.toArray(".icon");
    tl.from(contacts, {
      opacity: 0,
      duration: .5,
      stagger: { each: .05 },
    }, "<30%")
    tl.from(iconsSosial, {
      opacity: 0,
      rotate: 360,
      ease:"elastic",
      duration: 3,
      stagger: { each: 0.3 },
    }, "<")

  })

  return (
    <section ref={containerRef} className="w-full relative py-12 sm:py-16 lg:py-20">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="min-w-0">
            <h1 ref={titleRef} className="text-[#F9BB00] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              تعرف على إجادة
            </h1>
            <p ref={subTextRef} className="text-[#0000006E] mt-2 text-sm sm:text-base md:text-lg">
              لا تتردد في تقديم طلب الاستشارة ! سنتواصل معك مباشرة
            </p>
          </div>

          <div className="flex-1">
            <div ref={lienRef} className="w-full h-1.5 bg-[#F9BB00]" />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-8 lg:px-12 mt-10 sm:mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Right/Left - Contact */}
          <div className="w-full">
            <div className="space-y-7">
              {contact.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <span className="contact shrink-0 mt-1">{item.icon}</span>
                  <div className="min-w-0">
                    <h2 className="contact text-[#1E1E1E] font-bold text-base sm:text-lg">
                      {item.nameCon}
                    </h2>
                    <p className="contact text-[#404250] text-sm sm:text-base wrap-break-words">
                      {item.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button className="cursor-pointer icon" aria-label="Instagram">
                <Instagram stroke="#F9BB00" />
              </button>
              <button className="cursor-pointer icon" aria-label="Twitter">
                <Twitter stroke="#F9BB00" />
              </button>
              <button className="cursor-pointer icon" aria-label="LinkedIn">
                <Linkedin stroke="#F9BB00" />
              </button>
              <button className="cursor-pointer icon" aria-label="MapPinned">
                <MapPinned stroke="#F9BB00" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="w-full">
            <form className="bg-white rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="الاسم" id="name">
                  <input
                    type="text"
                    id="name"
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00] "
                  />
                </Field>

                <Field label="رقم الجوال" id="phoneNumber">
                  <input
                    type="text"
                    id="phoneNumber"
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00] "
                  />
                </Field>

                <Field label="البريد الإلكتروني" id="email">
                  <input
                    type="email"
                    id="email"
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                  />
                </Field>

                <Field label="الخدمة المطلوبة" id="case">
                  <select
                    id="case"
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                  >
                    <option value="">حدد نوع الخدمة</option>
                    <option value="companies">خدمة الشركات والمنشآت التجارية</option>
                    <option value="capital-market">أنظمة سوق المال</option>
                    <option value="governance">الحوكمة والسياسات العامة</option>
                    <option value="contracts">صياغة العقود والاتفاقيات</option>
                    <option value="arbitration">التحكيم والوساطة</option>
                    <option value="inheritance">قسمة التركات وتصفيتها</option>
                    <option value="waqf">الأوقاف والوصايا</option>
                    <option value="consulting">الاستشارات القانونية</option>
                    <option value="tax">الاستشارات الزكوية والضريبية</option>
                    <option value="litigation">التقاضي وحل المنازعات</option>
                    <option value="regulations">اللوائح والتشريعات</option>
                    <option value="real-estate">التوثيق والتسجيل العيني</option>
                    <option value="ip">الملكية الفكرية</option>
                    <option value="fdi">الإستثمار الأجنبي</option>
                    <option value="labor">لوائح تنظيم العمل</option>
                    <option value="execution">خدمات التنفيذ</option>
                    <option value="other">أُخرى</option>
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <label htmlFor="details" className="text-[#404250] text-sm sm:text-base">
                  تفاصيل القضية
                </label>
                <textarea
                  id="details"
                  name="case_details"
                  placeholder="اكتب تفاصيل القضية..."
                  className="mt-2 w-full min-h-[160px] rounded-md px-4 py-3 bg-neutral-100 outline-none focus:ring-2 focus:ring-[#F9BB00]"
                />
              </div>

              <button
                type="submit"
                className="mt-5 bg-[#F9BB00] text-white font-bold rounded-md px-8 py-3 w-full cursor-pointer"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, children }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-[#404250] text-sm sm:text-base">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const contact = [
  { id: 1, nameCon: "اتصل بنا", info: "920008433", icon: <Phone stroke="#F9BB00" /> },
  { id: 2, nameCon: "البريد الإلكتروني", info: "info@ejadalawfirm.sa", icon: <Mail stroke="#F9BB00" /> },
  { id: 3, nameCon: "الموقع", info: "الرياض - حي النرجس - شارع رباح اللخمي", icon: <MapPin stroke="#F9BB00" /> },
];
