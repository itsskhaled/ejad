export async function POST(req) {
  try {
    const body = await req.json();

    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SHEETS_SECRET;

    if (!url || !secret) {
      return Response.json(
        { message: "Missing GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_SECRET" },
        { status: 500 }
      );
    }

    const payload = {
      secret,
      name: body.name || "",
      phoneNumber: body.phoneNumber || "",
      email: body.email || "",
      service: body.service || "",
      details: body.details || "",
      source: "website",
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok || data.ok !== true) {
      return Response.json(
        { message: data.message || "Google Sheets webhook failed" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { message: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
