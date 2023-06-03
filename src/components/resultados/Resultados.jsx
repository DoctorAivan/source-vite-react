import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

const Resultados = ({
  pais
}) => {
  return (
    <div className="w-full
    bg-gradient-to-t from-amber-700/10 to-slate-900/30">
      <div className="z-10 py-7 relative w-[1440px] mx-auto
      grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr]
      font-ubuntu text-base text-slate-200">
        <div>
          <FontAwesomeIcon className='text-[3.4rem] mt-4 mr-9' icon={faEarthAmericas} />
        </div>
        <div>
          <div className="text-xl font-normal tracking-widest">TOTAL DE</div>
          <div className="text-3xl font-bold tracking-wider">VOTACIÓN</div>
          <div className="font-normal tracking-wider">A NIVEL NACIONAL</div>
        </div>
        <div className='border-l-2 border-slate-600/40 pl-10'>
          <div className="text-xl font-normal tracking-widest">{pais.totales_porcentaje} %</div>
          <div className="text-indigo-200 text-3xl font-bold tracking-wider">{pais.totales}</div>
          <div className="font-light tracking-wider opacity-80">VOTOS TOTALES</div>
        </div>
        <div className='border-l-2 border-slate-600/40 pl-10'>
          <div className="text-xl font-normal tracking-widest">{pais.validos_porcentaje} %</div>
          <div className="text-lime-100 text-3xl font-bold tracking-wider">{pais.validos}</div>
          <div className="font-light tracking-wider opacity-80">VOTOS VALIDOS</div>
        </div>
        <div className='border-l-2 border-slate-600/40 pl-10'>
          <div className="text-xl font-normal tracking-widest">{pais.blancos_porcentaje} %</div>
          <div className="text-3xl font-bold tracking-wider">{pais.blancos}</div>
          <div className="font-light tracking-wider opacity-80">VOTOS BLANCOS</div>
        </div>
        <div className='border-l-2 border-slate-600/40 pl-10'>
          <div className="text-xl font-normal tracking-widest">{pais.nulos_porcentaje} %</div>
          <div className="text-rose-200 text-3xl font-bold tracking-wider">{pais.nulos}</div>
          <div className="font-light tracking-wider opacity-80">VOTOS NULOS</div>
        </div>
      </div>
    </div>
  )
}

export default Resultados