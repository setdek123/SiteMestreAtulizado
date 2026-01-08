const Grounp = () => {
    return (
        <div 
            className="flex min-h-screen items-center justify-center relative px-4"
            style={{
                background: 'linear-gradient(50deg, #fff, #242424 50%, #081020 80%)'
            }}
        >
            {/* Logo */}
            <img 
                src={'/img/Logo.png'} 
                className="w-150 md:w-200 md:h-200 md:ml-140 md:mt-1 md:w-60 md:h-60 object-cover brightness-20 mt-150 -ml-5 absolute items-center justify-center top-5 left-5"
            />

            {/* Container dos cards */}
            <div className="w-full max-w-6xl flex justify-center z-2 mt-32 mb-20">
                
                <div className="flex flex-wrap gap-10 justify-center">

                    {/* Card 1 */}
                    <div className="shadow-2xl rounded-3xl bg-[#242424] max-w-xs" data-aos="fade-right" data-aos-delay="500">
                        <img 
                            src="/img/turma-mirim.jpg"
                            className="w-full rounded-t-3xl"
                        />
                        <div className="flex flex-col px-5 py-5 rounded-b-3xl">
                            <h2 className="text-2xl text-white mb-5">Turma Mirim</h2>
                            <span className="text-gray-500">Horario: <strong>17:30 Horas</strong></span>
                            <span className="text-gray-500">Saida: <strong>18:30 Horas</strong></span>
                            <span className="text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="shadow-2xl rounded-3xl bg-[#242424] max-w-xs" data-aos="fade-up" data-aos-delay="400">
                        <img 
                            src="/img/turma-infantil.jpg" 
                            className="w-full rounded-t-3xl"
                        />
                        <div className="flex flex-col px-5 py-5 rounded-b-3xl">
                            <h2 className="text-2xl text-white mb-5">Turma Infantil</h2>
                            <span className="text-gray-500">Horario: <strong>18:30 Horas</strong></span>
                            <span className="text-gray-500">Saida: <strong>19:30 Horas</strong></span>
                            <span className="text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="shadow-2xl rounded-3xl bg-[#242424] max-w-xs" data-aos="fade-right" data-aos-delay="500">
                        <img 
                            src="/img/img-5.jpg" 
                            className="w-full rounded-t-3xl h-80 object-cover"
                        />
                        <div className="flex flex-col px-5 py-5 rounded-b-3xl">
                            <h2 className="text-2xl text-white mb-5">Turma Adultos</h2>
                            <span className="text-gray-500">Horario: <strong>19:30 Horas</strong></span>
                            <span className="text-gray-500">Saida: <strong>21:00 Horas</strong></span>
                            <span className="text-gray-400 text-2xl">Dias: <strong>segunda á sexta</strong></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Grounp;
