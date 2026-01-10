'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages

import About from "../about/page";
import Grounp from "../grounp/page";
import Footer from "../footer/page";

const ListBg = [
  '/img/img-1.jpg',
  '/img/img-2.jpg',
  '/img/img-3.jpg',
  '/img/img-5.jpg'
];

export default function Main() {
  const [changeBg, setChangeBg] = useState<string>(ListBg[0]);
  const router = useRouter();

  const exchangeBg = () => {
    const index = Math.floor(Math.random() * ListBg.length);
    setChangeBg(ListBg[index]);
  };

  useEffect(() => {
    // INIT AOS
    AOS.init({
      duration: 800,
      once: false,
      offset: 120,
      easing: 'ease-in-out',
    });

    const interval = setInterval(exchangeBg, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="relative min-h-screen overflow-hidden bg-[#081020]">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `
              linear-gradient(to top, #081020 1%, rgba(0,0,0,0.5)),
              url(${changeBg})
            `,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-start gap-6 px-6 sm:px-10 md:px-20 lg:px-40 py-32 md:py-75">
          <h1
            data-aos="fade-down"
            className="text-white text-5xl md:text-7xl xl:text-8xl font-extrabold max-w-[70%] drop-shadow-lg"
          >
            Venha fazer uma aula experimental!
          </h1>

          <h2
            data-aos="fade-right"
            data-aos-delay="400"
            className="text-gray-300 text-3xl md:text-5xl drop-shadow-md"
          >
            Capoeira muda o mundo!
          </h2>

          <div data-aos="zoom-in" className="mt-10">
            <button
              onClick={() => router.replace('/aboutmore')}
              className="bg-green-500 hover:bg-green-600 text-white text-2xl px-8 py-4 rounded-lg font-bold transition"
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>

      {/* OUTRAS PÁGINAS */}
      <About />
      <Grounp />
      <Footer />
    </>
  );
}