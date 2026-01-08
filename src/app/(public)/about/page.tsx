'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import './about.css';



const About = () => {
    const [cameBack, setCameBack] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();


    return (
        <div className='md:flex md:justify-between  bg-[#081020] min-h-screen overflow-hidden'>
            <div className="md:w-350 md:h-full min-h-full flex items-center">
                <div className="image-gradient"></div>
            </div>
            <div className='md:flex md:flex-col md:mt-35 mt-15 '>
                <p className='text-white md:text-6xl md:font-extrabold text-4xl ml-19 ' data-aos="fade-left">Mestre Espiga</p>
                <div className='md:p-20 md:w-150 w-100 px-10 py-10 ml-2'>
                    <p className='text-white md:text-xl text-xl' data-aos="fade-up">João Jardim, conhecido como Espiga, iniciou seu aprendizado na Capoeira em 1986, com o então contra mestre do Grupo Senzala Mestre Boneco, participando como aluno da fundação do Grupo Capoeira Brasil em 1989.

                        Há mais de 25 anos dissemina a cultura brasileira pelo mundo como professor de Capoeira e atualmente ministra aulas para crianças e adultos em seu espaço inteiramente dedicado a Capoeira, visando uma didática abrangente que transmita noções musicais, domínio corporal, ensinamentos histórico-culturais brasileiros e afrodescendentes, além de importantes valores para a formação do ser, como a humildade, interação, respeito mútuo e disciplina.

                        Espiga busca através da Capoeira, o desenvolvimento de seus alunos muito além do aspecto físico e é reconhecido pela sua forma de ensinar a Capoeira, participando de eventos em diversos países e transmitindo seus ensinamentos para capoeiristas de diferentes culturas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About