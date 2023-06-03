import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Bloque = ({
  id,
  titulo,
  subtitulo,
  descripcion,
  tipo,
  icono
}) => {
  return (
    <div className="mb-6 grid gap-2 grid-cols-[auto_1fr]
    font-ubuntu">
      <div className="text-5xl pt-1 text-slate-400">
        <FontAwesomeIcon className="mr-5" icon={icono} />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-400 tracking-wider">
          <span className="mr-3.5 font-light">{subtitulo}</span>
          {titulo}
        </div>
        <div className="text-base text-slate-500 tracking-wider">
          {descripcion}
        </div>
      </div>
    </div>
  )
}

export default Bloque