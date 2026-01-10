'use client';
//----------------------------
import Link from "next/link";
//-----------------------------

import { useRouter } from 'next/navigation';

import { useState } from "react";
import { MdClose, MdHome, MdGroup } from 'react-icons/md';
import { FaInstagram } from "react-icons/fa";



//caminho logo img "/img/Logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const router = useRouter();

  return (
    <div className=" xl:px-20 md:px-20 md:flex bg-green-700 md:bg-transparent md:justify-around  items-center justify-between px-20 flex md:items-center  fixed z-40 w-full">
      <div className="w-20 h-20 mt-2 -ml-13 p-2">
        <Link href={'/'}><img src={"/img/Logo.png"} alt="photo"/></Link>
      </div>
      <div className="md:flex md:flex-col hidden">
        <p className="text-xl font-bold text-white"><strong>Rua Comandante Rubens Silva, 253</strong></p>
        <p className="font-bold text-gray-300">Freguesia, Rio de Janeiro, RJ</p>
      </div>
      <div className="hidden md:flex md:gap-10 md:items-center">
        <Link className="text-white text-xl hover:bg-green-500 px-2 rounded-2xl duration-700" href={'/'}><MdHome size={30}/></Link>
        <Link className="text-white text-xl hover:bg-green-500 px-2 rounded-2xl duration-700" href={'/about'}>Mestre</Link>
        <Link className="text-white text-xl hover:bg-green-500 px-2 rounded-2xl duration-700" href={"/grounp"}>Turmas</Link>
        <Link className="text-white text-xl hover:bg-blue-500 px-2 rounded-2xl duration-700" href={'/sign-in'}>ADM</Link>
        <a href="https://api.whatsapp.com/send/?phone=5521964933158&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+aulas+de+capoeira.&type=phone_number&app_absent=0" className="">
        <FaInstagram size={55} color="white" style={{
              background: 'linear-gradient(120deg, orange, pink, blue )',
              borderRadius: '10px',
              width: '37px',
              height:'40px',
              cursor: 'pointer',
              boxShadow: '0 2px 17px  '
            }}
          />
        </a>
        
      </div>
      <div className="absolute flex flex-col items-center gap-3 mr-7  right-0 top-1 w-full">
        <div className="flex ml-85 flex-col gap-2 items-center duration-500 mt-7 md:hidden"
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
        > {/*Menu Hamburg 3 linhas*/}
          <div className={isMenuOpen ? "hidden": "flex flex-col gap-2"}>
            <div className="p-0.5 w-10 rounded-xl bg-white" ></div>
            <div className="p-0.5 w-10 rounded-xl bg-white" ></div>
            <div className="p-0.5 w-10 rounded-xl bg-white" ></div>
          </div>
            
          {/* criando o x (Fechar)*/}
          <div className={isMenuOpen ? "flex" : "hidden"}>
            <MdClose size={55} color="white"
            className="-mt-2"
            />
          </div>
        </div>

        

        <div className={isMenuOpen ? "flex gap-3 justify-center items-center md:hidden  ml-14 -mt-1 duration-500 bg-black mb-5 p-5 opacity-85 w-full" : "hidden "}
          style={{
            transform: 'transition: all 2.5s ease'
          }}
        >
          <Link className="text-white text-xl p-3 hover:bg-green-500 duration-500 rounded-4xl" href={'/about'}>Mestre</Link>
          <Link className="text-white text-xl p-3 hover:bg-green-500 duration-500 rounded-4xl" href={'/grounp'}>Turmas</Link>
          <Link className="text-white text-xl p-3 hover:bg-blue-500 duration-500 rounded-4xl" href={'/login'}>ADM</Link>
          <a href="https://api.whatsapp.com/send/?phone=5521964933158&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+aulas+de+capoeira.&type=phone_number&app_absent=0" 
            className="cursor-pointer"
          >
            <FaInstagram size={55} color="white"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
