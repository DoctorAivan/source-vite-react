import { useRef, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faLock, faX } from '@fortawesome/free-solid-svg-icons'

import InputText from "../forms/InputText"

const VistaAsignar = ({
    zonas,
    filtro,
    filtro_asignar,
    vista,
    eleccion,
    marcar
}) => {

    const zonasRef = useRef(null);
    const zonaRef = useRef(null);

    useEffect(() => {
        
        if (zonaRef.current) {
          const contenedor = zonasRef.current;
          const elemento = zonaRef.current;
    
          // Calcula la posición del elemento objetivo con respecto al contenedor
          const elementoSeparador = elemento.offsetTop - 594;
    
          // Mueve el scroll del contenedor a la posición del elemento objetivo
          contenedor.scrollTo({ top: elementoSeparador });
        }

      }, []);

    return (
        <>
        
            <div className="px-8 mb-5">
                <InputText
                    title='Buscar una Región'
                    description=''
                    name='filtro'
                    value={filtro}
                    placeholder='R. Metropolitana, Punta arenas, viña del mar'
                    onChange={filtro_asignar}
                />
            </div>

            <div className='grid gap-5 grid-cols-[auto_89px_1fr_auto]
            font-ubuntu font-light text-slate-400 px-8 pb-2.5'>
                <div><FontAwesomeIcon className="pt-1 opacity-30" icon={faCircle} /></div>
                <div className='text-center'>TIPO</div>
                <div>NOMBRE ZONA</div>
                <div>VOTOS VALIDOS</div>
            </div>

            <div ref={zonasRef} className='max-h-[369px] overflow-y-auto'>
                {
                    zonas.filter(zona => {

                        if( !filtro )
                        {
                            return true
                        }
                        else
                        {
                            let search = zona.nombre.toLowerCase()
                            let resultado = search.startsWith(filtro.toLowerCase())
                            // let resultado = search.endsWith(filtro.toLowerCase())
                            // let resultado = search.include(filtro.toLowerCase())
    
                            return resultado
                        }

                    })
                    .map((zona) => (

                        <div onClick={() => {
                            zona.votos != 0 &&
                                zona.id != vista.codigo &&
                                    marcar(zona)
                            }}
                            key={zona.id} ref={zona.id === vista.codigo ? zonaRef : null}
                            className={`grid gap-6 grid-cols-[auto_82px_1fr_auto]
                            font-ubuntu
                            px-8 pt-[8px] pb-[9px]
                            ${zona.id == vista.codigo ?
                                'cursor-default text-slate-100 bg-gradient-to-bl from-indigo-800 to-indigo-700'
                                :
                                zona.votos == 0 ?
                                'cursor-not-allowed opacity-60 text-white bg-gradient-to-br from-zinc-700 to-zinc-600'
                                :
                                    zona.id == eleccion.id ?
                                        'animate-buttonActive cursor-default text-white bg-gradient-to-l from-green-800 to-green-600'
                                        :
                                        'cursor-pointer text-slate-300 hover:text-white bg-gradient-to-bl from-slate-600 to-slate-700 hover:to-indigo-800/80'}
                            `}>
                            {
                                zona.id == vista.codigo ?
                                    <FontAwesomeIcon className="pt-1 text-slate-100" icon={faLock} />
                                    :
                                    zona.votos == 0 ?
                                    <FontAwesomeIcon className="pt-1 text-rose-500" icon={faX} />
                                    :
                                        zona.id == eleccion.id ?
                                            <FontAwesomeIcon className="pt-1 text-white" icon={faCircleCheck} />
                                            :
                                            <FontAwesomeIcon className="pt-1 text-slate-500" icon={faCircle} />
                            }
                            {
                                zona.tipo == 'R' ?
                                <div className='bg-indigo-500 rounded-md text-white font-light text-center text-sm pt-0.5 px-2'>REGIÓN</div>
                                :
                                <div className='bg-pink-500 rounded-md text-white font-light text-center text-sm pt-0.5 px-2'>COMUNA</div>
                            }
                            <div className='font-normal'>{zona.nombre}</div>
                            <div className="font-bold text-lime-300 tracking-wider">{zona.votos}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default VistaAsignar