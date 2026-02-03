"use client";

import Image from "next/image";
import heroImage from "@/app/images/1.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useMemo, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
    const titleRef = useRef(null);
    const subTextRef = useRef(null);
    const submitRef = useRef(null);

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
            "خدمة الشركات والمنشآت التجارية",
            "أنظمة سوق المال",
            "الحوكمة والسياسات العامة",
            "صياغة العقود والاتفاقيات",
            "التحكيم والوساطة",
            "قسمة التركات وتصفيتها",
            "الأوقاف والوصايا",
            "الاستشارات القانونية",
            "الاستشارات الزكوية والضريبية",
            "التقاضي وحل المنازعات",
            "اللوائح والتشريعات",
            "التوثيق والتسجيل العيني",
            "الملكية الفكرية",
            "الإستثمار الأجنبي",
            "لوائح تنظيم العمل",
            "خدمات التنفيذ",
            "أُخرى",
        ],
        []
    );

    useGSAP(() => {
        const tl = gsap.timeline({ duration: 0.5 });

        if (titleRef.current) {
            new SplitText(titleRef.current, {
                type: "words",
                mask: "words",
                onSplit: (self) => {
                    gsap.from(self.words, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: { each: 0.05 },
                    });
                },
            });
        }

        if (subTextRef.current) {
            new SplitText(subTextRef.current, {
                type: "lines",
                mask: "lines",
                onSplit: (self) => {
                    gsap.from(self.lines, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: { each: 0.05 },
                    });
                },
            });
        }

        const labels = gsap.utils.toArray(".label");
        const inputs = gsap.utils.toArray(".input");

        tl.from([labels, inputs], {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: { each: 0.05 },
        }).from(
            submitRef.current,
            {
                scale: 0,
                duration: 1,
                ease: "elastic.out",
            },
            "<50%"
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
                service: form.service.trim(),
                details: form.details.trim(),
            };

            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "فشل الإرسال، حاول مرة ثانية.");

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
        <section className="relative w-full min-h-svh overflow-hidden">
            <Image
                src={heroImage}
                alt="heroImage"
                fill
                priority
                className="object-cover"
            />

            {/* Grid نصين */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full min-h-svh">
                {/* LEFT: Form Panel (شفاف فوق الصورة) */}
                <div className="hidden lg:block" />
                {/* RIGHT: النصف الثاني (يترك الصورة ظاهرة) */}
                <div className="bg-white/50 backdrop-blur-lg border-r border-white/25 px-4 sm:px-8 lg:px-12 pt-40 md:pt-20 py-10 sm:py-14 lg:py-40">
                    <h1
                        ref={titleRef}
                        className="text-[#404250] text-3xl sm:text-4xl lg:text-6xl leading-[1.15] font-bold"
                    >
                        استشارتك القانونية
                        <br />
                        على بعد <span className="text-[#F9BB00]">خطوة واحدة</span>
                    </h1>

                    <p ref={subTextRef} className="mt-4 text-base sm:text-lg text-[#404250]">
                        يرجى تعبئة الحقول المطلوبة
                    </p>

                    <form onSubmit={onSubmit} noValidate className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="text-[#404250] label">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-2 bg-white/70 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="text-[#404250] label">
                                    رقم الجوال
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    inputMode="tel"
                                    className="mt-2 bg-white/70 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    value={form.phoneNumber}
                                    onChange={(e) => setForm((p) => ({ ...p, phoneNumber: e.target.value }))}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-[#404250] label">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-2 bg-white/70 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="text-[#404250] label">
                                    الخدمة المطلوبة
                                </label>
                                <select
                                    id="service"
                                    className="mt-2 bg-white/70 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    value={form.service}
                                    onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                                    required
                                >
                                    <option value="">حدد نوع الخدمة</option>
                                    {services.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="details" className="text-[#404250] label">
                                تفاصيل القضية
                            </label>
                            <textarea
                                id="details"
                                name="case_details"
                                placeholder="اكتب تفاصيل القضية..."
                                className="mt-2 w-full min-h-[150px] sm:min-h-[180px] rounded-md px-4 py-3 bg-white/70 input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                value={form.details}
                                onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
                                required
                            />
                        </div>

                        {status.msg && (
                            <p className={`mt-4 text-sm ${status.type === "success" ? "text-green-700" : "text-red-700"}`}>
                                {status.msg}
                            </p>
                        )}

                        <div ref={submitRef} className="mt-5">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#404250] text-white w-full px-4 py-3 rounded-md cursor-pointer hover:bg-[#F9BB00] hover:text-[#404250] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "جارٍ الإرسال..." : "إرسال"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );

}
