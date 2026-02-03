import localFont from "next/font/local";
import Script from "next/script";
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

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1199339069018163');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1199339069018163&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
