'use client';

import {MdWhatsapp} from 'react-icons/md';
import { FaInstagram } from "react-icons/fa";

const AboutMore = () => {
    return (
        <div className="flex flex-col  min-h-screen bg-gray-200">
            <div className="bg-green-500 items-center flex shadow-2xl p-4 justify-center">
                <h1 className="md:text-4xl text-2xl  text-white font-bold">Capoeira Vem Camará</h1>
            </div>
            <div className=" md:flex md:items-center md:justify-center md:gap-5 md:mt-30 
                flex-wrap flex items-center justify-center p-10 gap-10
            ">
                <div className="flex gap-2 flex-col  border-gray-300 p-10 bg-white rounded-2xl shadow-lg border  overflow-hidden">
                    <span className="font-extrabold text-2xl">Aulas Presenciais</span>
                    <p className="text-gray-600">Segunda, Quarta e sexta as 19:30H - Freguesia</p>
                </div>
                
                <div className="flex gap-2 flex-col border border-gray-300 bg-white p-10 rounded-2xl shadow-lg overflow-hidden">
                    <span className="font-extrabold text-2xl">Aulas Online</span>
                    <p className="text-gray-600">Pelo app, onde estiver</p>
                    <div className='md:flex justify-between mt-5'>
                        <a href="https://api.whatsapp.com/send/?phone=5521964933158&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+aulas+de+capoeira.&type=phone_number&app_absent=0">
                            <MdWhatsapp className="text-3xl text-green-500"/>
                        </a>
                        <a href="#">
                            <FaInstagram className='text-3xl' />
                        </a>
                    </div>
                </div>

                <div className="flex gap-2 flex-col border border-gray-300 bg-white p-10 rounded-2xl shadow-lg overflow-hidden">
                    <span className="font-extrabold text-2xl">1º Aula Grátis</span>
                    <a className="p-1" href="https://api.whatsapp.com/send/?phone=5521964933158&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+aulas+de+capoeira.&type=phone_number&app_absent=0">
                        <button className="p-1 cursor-pointer bg-amber-400 text-gray-800 font-bold rounded-2xl">Quero Participar!</button>
                    </a>
                </div>
            </div>
        </div>
        
    )
};

export default AboutMore;