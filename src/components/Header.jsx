import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckToSlot, faPersonBooth, faStopwatch, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const Header = ({
    data,
    nuevo_computo,
    set_nuevo_computo
}) => {

    const [animacion, set_animacion] = useState('hidden')

    // Wait for Changes in Event
    useEffect(() => {

        // Validar estado de la precarga
        if(nuevo_computo == true)
        {

            // Asignar animacioón
            set_animacion('animate-precargaOn')

            // Asignar delay
            setTimeout(() => {
                
                // Desactivar Precarga
                set_nuevo_computo(false)

            }, 4000);

        }
        else
        {
            
            // Asignar animacioón
            set_animacion('animate-precargaOff')

            // Asignar delay
            setTimeout(() => {
                
                // Desactivar Precarga
                set_animacion('hidden')

            }, 500);
        }

    }, [nuevo_computo])

    return (
        <div className="relative bg-gradient-to-tl from-indigo-900 to-indigo-700">
            <div className={`z-20 absolute w-full h-full
            ${ animacion }
            bg-gradient-to-tl from-rose-800 to-rose-600
            font-ubuntu text-[3rem] text-white font-bold text-center`}>
                <div className='pt-4 animate-pulse'>
                    <FontAwesomeIcon className='mr-8' icon={faCircleExclamation} /> NUEVO COMPUTO
                </div>
            </div>
            <div className="z-10 relative w-[1440px] mx-auto pt-[24px] pb-[26px]
            font-ubuntu text-white text-[2.3rem] leading-[2.5rem] uppercase
            grid grid-cols-[auto_1fr_auto_auto_auto_auto]">
                <div className="text-5xl font-normal pt-2">
                    <FontAwesomeIcon className="mr-9" icon={faCheckToSlot} />
                </div>
                <div className="font-semibold">
                    <div className="font-bold tracking-wider">ELECCIONES <span className="font-light">CNN</span></div>
                    <div className="text-base font-light opacity-70 tracking-widest">Elección Consejo Constitucional 2023</div>
                </div>
                <div className="text-5xl font-normal pt-1.5">
                    <FontAwesomeIcon className="mr-6" icon={faStopwatch} />
                </div>
                <div className="font-semibold">
                    <div className="font-semibold tracking-wider">{data.hora} Hrs</div>
                    <div className="text-base font-light opacity-70">ÚLTIMA ACTUALIZACIÓN</div>
                </div>
                <div className="text-5xl font-normal ml-14 pt-1.5">
                    <FontAwesomeIcon className="mr-7" icon={faPersonBooth} />
                </div>
                <div className="">
                    <div className="font-semibold tracking-wider">{data.mesas} %</div>
                    <div className="text-base font-light opacity-70">MESAS ESCRUTADAS</div>
                </div>
            </div>
        </div>
    )
}

export default Header