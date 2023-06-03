import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import Bloque from '../bloques/Bloque'
import MayoriasCandidato from './MayoriasCandidato'

const Mayorias = ({
  titulo,
  subtitulo,
  descripcion,
  icono,
  zonas,
  ui,
  actuales
}) => {

  // Marcar Vista
  const marcar_vista = (zona) => {

    // Enviar zona marcada
    ui(zona)
  }

  // Marcar vista si existe en el listado general
  const validar_vista = (id) => {

    // Validar que existan mesas actuales
    if( actuales[0] )
    {

      // Buscar la referencia
      const buscar_zona = actuales[0].vistas.find(vista => vista.codigo == id);

      // Validar que exista coincidencia
      if( buscar_zona )
      {
        return <div className='py-2 text-[0.8rem] font-light text-center tracking-wider text-white
        bg-gradient-to-b from-teal-600/50 to-teal-500/50 animate-buttonActive'>
            <FontAwesomeIcon className='mr-2' icon={faCircleCheck} /> ASIGNADO <span className='font-bold ml-2'>VISTA {buscar_zona.vista}</span>
          </div>
      }
      else
      {
        return <div className='py-2 text-[0.8rem] font-light text-center tracking-wider text-slate-400/80'>
          CLICK PARA ASIGNAR
        </div>
      }
    }
  }

  return (
    <div className="z-10 relative w-[1440px] mx-auto">

      <Bloque
        id='0'
        titulo={titulo}
        subtitulo={subtitulo}
        descripcion={descripcion}
        tipo='test'
        icono={icono}
      />

      <div className="relative w-[1440px] grid gap-4 grid-cols-6">
        {
          zonas.map((zona) => (

            <div key={zona.id}  
            onClick={() => { marcar_vista(zona) }}
            className={`
            ${
              zona.mayoria == 'I' ?
              'grayscale-[0.8] cursor-not-allowed opacity-40 shadow-slate-900/10'
              :
              'opacity-70 hover:opacity-100 hover:scale-105 cursor-pointer shadow-slate-900/20 hover:shadow-slate-900/50'
            }
            group relative rounded-xl overflow-hidden
            shadow-xl
            transition-all duration-300
            font-ubuntu text-center text-slate-300
            bg-slate-700/50`}>

              <div className="py-2 text-sm font-semibold tracking-wide">
                {zona.nombre}
              </div>

              <div className='grid grid-cols-2'>
                {
                  zona.mayoria == 'A' ?
                  <div className='h-[1px] bg-indigo-300'></div>
                  :
                  <div className='h-[1px] bg-slate-600'></div>
                }
                {
                  zona.mayoria == 'R' ?
                  <div className='h-[1px] bg-pink-300'></div>
                  :
                  <div className='h-[1px] bg-slate-600'></div>
                }
              </div>

              <div className='grid grid-cols-2
              bg-gradient-to-t from-slate-700/50 to-slate-600/50'>

                <MayoriasCandidato
                  nombre='APRUEBO'
                  candidato={zona.apruebo}
                />

                <MayoriasCandidato
                  nombre='RECHAZO'
                  candidato={zona.rechazo}
                />

              </div>

              { validar_vista(zona.id) }

            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Mayorias