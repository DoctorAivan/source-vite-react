import { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import VistaCandidato from './VistaCandidato'

const Vista = ({
  vista,
  bloque,
  vista_open,
  actualizar
}) => {

  const vista_nueva = () => {

    const vista_data = {
      id: vista.id,
      vista: vista.vista,
      codigo: vista.codigo,
      tipo: bloque.tipo,
      bloque: bloque.id
    }

    vista_open(vista_data)
  }

  // Wait for Changes in Event
  useEffect(() => {

    let timeout;

    if (vista.actualizado == true) {

      // Asignar delay
      timeout = setTimeout(() => {
        actualizar(bloque.id, vista.id)
      }, 1250);

    }

    return () => {
      clearTimeout(timeout);
    }

  }, [vista.actualizado])

  return (
    <div key={vista.id}
      onClick={vista_nueva}
      className={`group relative rounded-xl overflow-hidden cursor-pointer
        bg-gradient-to-br from-slate-700 to-slate-600/30
        shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40
        font-ubuntu transition-all duration-300
        opacity-80 hover:opacity-100 hover:scale-105
      `}>
      {
        vista.actualizado &&
        <div className={`animate-update absolute w-full h-full
        grid place-content-center text-white text-6xl
        ${vista.tipo == 'R' ?
          'bg-gradient-to-br from-indigo-400/50 to-indigo-600/50'
          :
          'bg-gradient-to-br from-pink-400/50 to-pink-600/50'
        }`}
        >
          <FontAwesomeIcon className='drop-shadow-lg shadow-black' icon={faCircleCheck} />
        </div>
      }
      <div className={`pl-5 pr-[25px] py-2.5
        ${vista.tipo == 'R' ?
          'bg-gradient-to-r from-indigo-500/60 to-indigo-500/40'
          :
          'bg-gradient-to-r from-pink-500/60 to-pink-500/40'
        }
        grid gap-1 grid-cols-[auto_1fr_auto_auto]
        text-lg font-light text-white tracking-wider`}>
        <FontAwesomeIcon className='mr-3 mt-[5px]' icon={faBoxArchive} />
        <div className='font-normal'>VISTA {vista.vista}</div>
        <FontAwesomeIcon className='mr-3 mt-[5px]' icon={faLocationDot} />
        <div className='font-bold'>
          { vista.tipo == 'R' ? 'REGIÓN' : 'COMUNA' }
        </div>
      </div>
      <div className={`px-5 pt-4 text-xl font-bold text-center
        ${ vista.tipo == 'R' ? 'text-indigo-300' : 'text-pink-300' }`}
      >
        {vista.nombre}
      </div>
      <div className='px-5 pb-4 text-lg text-slate-400 tracking-wider font-normal text-center'>
        VOTOS VALIDOS : {vista.votos}
      </div>
      <div className='grid grid-cols-2
      text-slate-300 text-center
      bg-gradient-to-t from-slate-700 to-slate-600
      '>

        <VistaCandidato
          tipo_zona={vista.tipo}
          titulo='APRUEBO'
          candidato={vista.apruebo}
        />

        <VistaCandidato
          titipo_zonapo={vista.tipo}
          titulo='RECHAZO'
          candidato={vista.rechazo}
        />

      </div>
      <div className={`pt-2.5 pb-3
        transition-all duration-300
        ${ vista.tipo == 'R' ? 'group-hover:text-indigo-300' : 'group-hover:text-pink-300' }
        text-slate-400/50 text-sm font-light text-center`}>
        CLICK PARA MODIFICAR
      </div>
    </div>
  )
}

export default Vista