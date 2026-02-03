import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

function normalizePhone(raw) {
  return (raw || "").replace(/[^\d+]/g, "");
}

export async function POST(req) {
  try {
    const body = await req.json();

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const service = (body?.service || "").trim();
    const details = (body?.details || "").trim();
    const phoneNumber = normalizePhone(body?.phoneNumber || "");

    // ✅ Validation (لازم كمان بالسيرفر)
    if (name.length < 2) {
      return Response.json({ message: "الاسم غير صالح" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ message: "الإيميل غير صالح" }, { status: 400 });
    }
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) {
      return Response.json({ message: "رقم الجوال غير صالح" }, { status: 400 });
    }
    if (!service) {
      return Response.json(
        { message: "اختر الخدمة المطلوبة" },
        { status: 400 },
      );
    }
    if (details.length < 10) {
      return Response.json({ message: "التفاصيل قصيرة" }, { status: 400 });
    }

    const toCompany = process.env.LEADS_TO_EMAIL.split(",").map((e) =>
      e.trim(),
    );

    const from = process.env.RESEND_FROM;

    if (!process.env.RESEND_API_KEY || !toCompany || !from) {
      return Response.json(
        {
          message:
            "Resend env vars are missing (RESEND_API_KEY / LEADS_TO_EMAIL / RESEND_FROM)",
        },
        { status: 500 },
      );
    }

    // 1) ✅ Email to company
    await resend.emails.send({
      from,
      to: [toCompany],
      subject: `Lead جديد: ${name} (${service})`,
      replyTo: email, // مهم: لما يردوا يروح للعميل
      html: `
        <div style="font-family:Arial;line-height:1.7">
          <h2>طلب استشارة جديد</h2>
          <p><b>الاسم:</b> ${escapeHtml(name)}</p>
          <p><b>الجوال:</b> ${escapeHtml(phoneNumber)}</p>
          <p><b>الإيميل:</b> ${escapeHtml(email)}</p>
          <p><b>الخدمة:</b> ${escapeHtml(service)}</p>
          <p><b>تفاصيل:</b><br/>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    // 2) ✅ Auto-reply to customer
    await resend.emails.send({
      from,
      to: [email],
      subject: "تم استلام طلبك - إجادة للمحاماة",
      html: `
        <div style="font-family:Arial;line-height:1.7">
          <p>مرحبًا ${escapeHtml(name)}،</p>
          <p>شكرًا لتواصلك. تم استلام طلب الاستشارة بنجاح وسيتم التواصل معك قريبًا.</p>
          <hr/>
          <p><b>الخدمة:</b> ${escapeHtml(service)}</p>
          <p><b>ملخص التفاصيل:</b><br/>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
          <br/>
          <p>مع التحية،<br/>إجادة للمحاماة والاستشارات القانونية</p>
        </div>
      `,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: err?.message || "Server error" },
      { status: 500 },
    );
  }
}

// حماية بسيطة من حقن HTML
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
