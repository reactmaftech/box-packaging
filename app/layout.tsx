import type { Metadata } from 'next'
import Script from 'next/script'
import { Phone } from 'lucide-react'
import './globals.css'
import { QuotePopup } from '../components/QuotePopup'

export const metadata: Metadata = {
  title: 'Slick Custom Boxes - Premium Custom Packaging Solutions',
  description: 'High-quality custom packaging boxes for all industries. Get your free quote today at Slick Custom Boxes!',
  verification: {
    google: 'eQWkbn7mNBsmXj4C1_CjSlec5-YKPR62JmWvffGVsbg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Quote popup — shows 15 seconds after each page load */}
        <QuotePopup />

        {/* Floating call button animation */}
        <style>{`
          @keyframes call-fab-ring {
            0%, 60%, 100% { transform: rotate(0deg); }
            65% { transform: rotate(-16deg); }
            70% { transform: rotate(14deg); }
            75% { transform: rotate(-12deg); }
            80% { transform: rotate(10deg); }
            85% { transform: rotate(-6deg); }
            90% { transform: rotate(0deg); }
          }
          .call-fab-icon {
            animation: call-fab-ring 3.5s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .call-fab-icon { animation: none; }
          }
        `}</style>

        {/* Floating round call button — sits above the Tawk.to chat bubble */}
        <a
          href="tel:+12177276247"
          aria-label="Call us at +1 (217) 727-6247"
          title="Call us: +1 (217) 727-6247"
          className="group fixed bottom-24 right-6 z-[9990] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FDB022] to-[#E8940C] text-[#171512] shadow-[0_8px_24px_rgba(232,148,12,0.45)] ring-2 ring-white transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          {/* Pulse ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[#FDB022] opacity-60 animate-ping motion-reduce:animate-none"
          />
          <Phone size={24} strokeWidth={2.2} className="call-fab-icon text-white" />
        </a>

        {/* Microsoft Clarity analytics — loads on every page */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z296y3b3f3");
            `,
          }}
        />

        {/* Tawk.to live chat widget — loads on every page */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6ac66f920815b934ca8c8608/1k4bi7ld0';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}