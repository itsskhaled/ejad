import localFont from "next/font/local";
import "./globals.css";

const fsAlbertArabic = localFont({
  src: [
    {
      path: "../fonts/FSAlbertArabic/FSAlbertArabic-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/FSAlbertArabic/FSAlbertArabic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/FSAlbertArabic/FSAlbertArabic-Thin.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/FSAlbertArabic/FSAlbertArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fs-albert-arabic",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${fsAlbertArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
