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

export const metadata = {
  title: {
    default: "إجادة الأعمال للمحاماة والاستشارات القانونية",
    template: "%s | إجادة للمحاماة",
  },
  description:
    "إجادة الأعمال للمحاماة والاستشارات القانونية تقدم خدمات قانونية متكاملة تشمل التقاضي، التحكيم، صياغة العقود، والاستشارات القانونية للأفراد والشركات في المملكة العربية السعودية.",
  keywords: [
    "محاماة",
    "استشارات قانونية",
    "محامي في السعودية",
    "مكتب محاماة",
    "التقاضي",
    "التحكيم",
    "صياغة العقود",
    "إجادة للمحاماة",
  ],
  authors: [{ name: "Ejada Law Firm" }],
  creator: "Ejada Law Firm",
  publisher: "Ejada Law Firm",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/og-image.jpg",
    siteName: "إجادة للمحاماة",
    title: "إجادة الأعمال للمحاماة والاستشارات القانونية",
    description:
      "حلول قانونية متكاملة وخدمات استشارية احترافية للأفراد والشركات في المملكة العربية السعودية.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "إجادة للمحاماة والاستشارات القانونية",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إجادة الأعمال للمحاماة والاستشارات القانونية",
    description:
      "مكتب محاماة يقدم خدمات قانونية شاملة تشمل التقاضي، التحكيم، وصياغة العقود.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://ejadalawfirm.sa",
  },
};



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
