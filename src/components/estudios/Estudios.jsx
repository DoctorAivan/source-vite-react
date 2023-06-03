import EstudiosItem from './EstudiosItem'

const Estudios = ({
  estudios,
  asignar
}) => {
  return (
    <div className="w-full pt-9
    bg-gradient-to-t from-indigo-700/20 to-slate-900/20
    ">
      <div className="z-10 relative w-[1440px] mx-auto
      grid grid-cols-3 gap-10 h-[58px]">
        {
          estudios.map((estudio) => (
            <EstudiosItem
              key={estudio.id}
              data={estudio}
              asignar={asignar}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Estudios