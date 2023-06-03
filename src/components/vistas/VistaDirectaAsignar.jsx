import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faCircleCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const VistaDirectaAsignar = ({
  i,
  vista_directo_id,
  set_vista_directo_id,
  vista,
  vista_directo_data
}) => {

  const marcar_vista_directa = () => {

    set_vista_directo_id(i)

    console.log( vista );

    console.log( vista_directo_data );

  }

  return (
    <div
    onClick={marcar_vista_directa}
    className={`
    ${vista_directo_id == i ?
    'bg-gradient-to-b from-pink-800/80 to-pink-600/80 shadow-pink-600/30 text-white font-bold animate-buttonActive cursor-default'
    :
    'bg-gradient-to-t from-slate-600/50 to-slate-500/70 shadow-slate-800/20 text-slate-200 font-light hover:text-slate-100 cursor-pointer'}
    rounded-xl overflow-hidden
    shadow-xl`}>

      <div className={`pl-5 pr-[25px] py-2.5
        ${vista_directo_id == i ?
          'bg-gradient-to-r from-pink-500/60 to-pink-500/40'
        :
          'bg-gradient-to-r from-indigo-500/60 to-indigo-500/40'
        }
        text-lg font-light text-center text-white tracking-wider`}>
        <div className='font-bold text-xl'>VISTA {vista.vista}</div>
      </div>
      <div className={`pt-3 px-4 text-base text-center font-light border-b border-slate-300/20 mb-2 pb-3`}>
      {
          vista_directo_id == i ?
            <>ASIGNARÁS</>
            :
            <>ZONA ACTUAL</>
        }
      </div>
      <div className={`pt-1 pb-2 px-4 text-base font-semibold text-center`}>
        {
          vista_directo_id == i ?
            vista_directo_data.nombre
            :
            vista.nombre
        }
      </div>
      <div className='pb-3.5 text-base text-white tracking-wider font-light opacity-60 text-center'>
        <div className='font-bold'>VOTOS</div>
        <div>
        {
          vista_directo_id == i ?
            vista_directo_data.validos
            :
            vista.votos
        }
        </div>
      </div>
    </div>
  )
}

export default VistaDirectaAsignar