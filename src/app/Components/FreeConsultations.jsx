"use client";

import { Instagram, Linkedin, Twitter } from "@deemlol/next-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { Mail, MapPin, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function ConsultationsSection() {
  const containerRef = useRef(null);
  const lienRef = useRef(null);
  const titleRef = useRef(null);
  const subTextRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    service: "",
    details: "",
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const services = useMemo(
    () => [
      { value: "companies", label: "خدمة الشركات والمنشآت التجارية" },
      { value: "capital-market", label: "أنظمة سوق المال" },
      { value: "governance", label: "الحوكمة والسياسات العامة" },
      { value: "contracts", label: "صياغة العقود والاتفاقيات" },
      { value: "arbitration", label: "التحكيم والوساطة" },
      { value: "inheritance", label: "قسمة التركات وتصفيتها" },
      { value: "waqf", label: "الأوقاف والوصايا" },
      { value: "consulting", label: "الاستشارات القانونية" },
      { value: "tax", label: "الاستشارات الزكوية والضريبية" },
      { value: "litigation", label: "التقاضي وحل المنازعات" },
      { value: "regulations", label: "اللوائح والتشريعات" },
      { value: "real-estate", label: "التوثيق والتسجيل العيني" },
      { value: "ip", label: "الملكية الفكرية" },
      { value: "fdi", label: "الإستثمار الأجنبي" },
      { value: "labor", label: "لوائح تنظيم العمل" },
      { value: "execution", label: "خدمات التنفيذ" },
      { value: "other", label: "أُخرى" },
    ],
    []
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "100%",
        toggleActions: "play none none none",
      },
    });

    const titleSpilt = new SplitText(titleRef.current, {
      type: "lines",
      mask: "lines",
    });
    const subTextSpilt = new SplitText(subTextRef.current, {
      type: "lines",
      mask: "lines",
    });

    tl.from(lienRef.current, {
      scaleX: 0,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    })
      .from(
        titleSpilt.lines,
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<50%"
      )
      .from(
        subTextSpilt.lines,
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

    const contacts = gsap.utils.toArray(".contact");
    const iconsSosial = gsap.utils.toArray(".icon");

    tl.from(
      contacts,
      {
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.05 },
      },
      "<30%"
    );

    tl.from(
      iconsSosial,
      {
        opacity: 0,
        rotate: 360,
        ease: "elastic",
        duration: 3,
        stagger: { each: 0.3 },
      },
      "<"
    );
  });

  function normalizePhone(raw) {
    return (raw || "").replace(/[^\d+]/g, "");
  }

  function validate() {
    const name = form.name.trim();
    const email = form.email.trim();
    const service = form.service.trim();
    const details = form.details.trim();
    const phone = normalizePhone(form.phoneNumber);

    if (name.length < 2) return "الاسم لازم يكون حرفين على الأقل.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "البريد الإلكتروني غير صحيح.";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) return "رقم الجوال غير صحيح (لازم 9-15 رقم).";

    if (!service) return "اختر الخدمة المطلوبة.";
    if (details.length < 10) return "تفاصيل القضية لازم تكون أوضح (10 أحرف على الأقل).";

    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const err = validate();
    if (err) {
      setStatus({ type: "error", msg: err });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        phoneNumber: normalizePhone(form.phoneNumber),
        email: form.email.trim(),
        // نخليها label مش value عشان الإيميل يطلع مفهوم
        service:
          services.find((s) => s.value === form.service)?.label || form.service,
        details: form.details.trim(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "فشل الإرسال، حاول مرة ثانية.");

      // Track Lead AFTER success
      if (window.fbq) window.fbq("track", "Lead");

      setStatus({ type: "success", msg: "تم إرسال طلبك بنجاح ✅" });
      setForm({ name: "", phoneNumber: "", email: "", service: "", details: "" });
    } catch (error) {
      setStatus({ type: "error", msg: error.message || "صار خطأ غير متوقع." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="Consultations" ref={containerRef} className="w-full relative py-12 sm:py-16 lg:py-20">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="min-w-0">
            <h1 ref={titleRef} className="text-[#F9BB00] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
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
          {/* Contact */}
          <div className="w-full">
            <div className="space-y-7">
              {contact.map((item) => (
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  onClick={() => {
                    if (window.fbq) window.fbq("track", "Contact");
                  }}
                  key={item.id}
                  className="flex items-start gap-4"
                >
                  <span className="contact shrink-0 mt-1">{item.icon}</span>
                  <div className="min-w-0">
                    <h2 className="contact text-[#1E1E1E] font-bold text-base sm:text-lg">
                      {item.nameCon}
                    </h2>
                    <p className="contact text-[#404250] text-sm sm:text-base wrap-break-words">
                      {item.info}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                href="https://www.instagram.com/ejadalawfirm?igsh=MWRreHM0ZDlyd3l0cA%3D%3D"
                target="_blank"
                className="cursor-pointer icon"
                aria-label="Instagram"
              >
                <Instagram stroke="#F9BB00" />
              </Link>
              <Link
                href="https://x.com/ejadalawfirm?s=21"
                target="_blank"
                className="cursor-pointer icon"
                aria-label="Twitter"
              >
                <Twitter stroke="#F9BB00" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/ejadalawfirm/"
                target="_blank"
                className="cursor-pointer icon"
                aria-label="LinkedIn"
              >
                <Linkedin stroke="#F9BB00" />
              </Link>
              <Link
                href="https://maps.app.goo.gl/PrKiJzZxDz2ErYsu9?g_st=ic"
                target="_blank"
                className="cursor-pointer icon"
                aria-label="MapPinned"
              >
                <MapPinned stroke="#F9BB00" />
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="w-full">
            <form className="bg-white rounded-2xl" onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="الاسم" id="name">
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                    required
                  />
                </Field>

                <Field label="رقم الجوال" id="phoneNumber">
                  <input
                    type="tel"
                    inputMode="tel"
                    id="phoneNumber"
                    value={form.phoneNumber}
                    onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                    required
                  />
                </Field>

                <Field label="البريد الإلكتروني" id="email">
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                    required
                  />
                </Field>

                <Field label="الخدمة المطلوبة" id="case">
                  <select
                    id="case"
                    value={form.service}
                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                    className="bg-neutral-100 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-[#F9BB00]"
                    required
                  >
                    <option value="">حدد نوع الخدمة</option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
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
                  value={form.details}
                  onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
                  className="mt-2 w-full min-h-[160px] rounded-md px-4 py-3 bg-neutral-100 outline-none focus:ring-2 focus:ring-[#F9BB00]"
                  required
                />
              </div>

              {status.msg && (
                <p
                  className={`mt-4 text-sm ${status.type === "success" ? "text-green-700" : "text-red-700"
                    }`}
                >
                  {status.msg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 bg-[#F9BB00] text-white font-bold rounded-md px-8 py-3 w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "جارٍ الإرسال..." : "إرسال"}
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
  { id: 1, nameCon: "اتصل بنا", info: "920008433", icon: <Phone stroke="#F9BB00" />, href: "tel:920008433" },
  { id: 2, nameCon: "البريد الإلكتروني", info: "info@ejadalawfirm.sa", icon: <Mail stroke="#F9BB00" />, href: "mailto:info@ejadalawfirm.sa" },
  { id: 3, nameCon: "الموقع", info: "الرياض - حي النرجس - شارع رباح اللخمي", icon: <MapPin stroke="#F9BB00" />, href: "https://maps.app.goo.gl/PrKiJzZxDz2ErYsu9?g_st=ic" },
];