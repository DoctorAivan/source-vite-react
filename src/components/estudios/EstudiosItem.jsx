import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComputer , faChevronDown } from '@fortawesome/free-solid-svg-icons'

const EstudiosItem = ({
  data,
  asignar
}) => {
  return (
    <div onClick={() => { asignar(data.id) }}
      className={`rounded-tl-xl rounded-tr-xl overflow-hidden
        ${data.activo == true ?
          'bg-gradient-to-b from-slate-700 to-slate-800 border-indigo-300 text-indigo-300 font-bold h-[59px]'
          :
          'bg-gradient-to-b from-slate-900/60 to-slate-800/70 border-slate-700 hover:border-slate-500 text-slate-500 hover:text-slate-400 font-normal h-[58px]'
        }
        transition-all duration-400
        border-t-4 border-l border-r
        cursor-pointer`}>
      <div className="px-8 pt-3 pb-3.5
        grid gap-5 grid-cols-[auto_1fr_auto]
        text-left text-xl uppercase tracking-wider">
        <FontAwesomeIcon className='pt-1' icon={faComputer} />
        <div>{data.nombre}</div>
        {
          data.activo == true && <FontAwesomeIcon className='pt-1 text-lg' icon={faChevronDown} />
        }
      </div>
    </div>
  )
}

export default EstudiosItem