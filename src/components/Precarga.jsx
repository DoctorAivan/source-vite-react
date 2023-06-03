import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Precarga = ({
    estado_preparga,
    set_estado_preparga
}) => {

    const [animacion, set_animacion] = useState('')

    // Wait for Changes in Event
    useEffect(() => {

        // Validar estado de la precarga
        if(estado_preparga == true)
        {

            // Asignar animacioón
            set_animacion('animate-precargaOn')

            // Asignar delay
            setTimeout(() => {
                
                // Desactivar Precarga
                set_estado_preparga(false)

            }, 500);

        }
        else
        {
            
            // Asignar animacioón
            set_animacion('animate-precargaOff')

            // Asignar delay
            setTimeout(() => {
                
                // Desactivar Precarga
                set_animacion('hidden')

            }, 250);
        }

    }, [estado_preparga])

    return (
        <div className={`z-20 fixed w-full h-full
        ${ animacion }
        grid place-content-center
        bg-slate-800 opacity-80
        text-7xl text-indigo-400`}>
            <FontAwesomeIcon className='animate-spin' icon={faSpinner} />
        </div>
    )
}

export default Precarga