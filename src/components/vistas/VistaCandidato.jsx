const VistaCandidato = ({
  tipo_zona,
  titulo,
  candidato
}) => {

  return (
    <div className='py-4 border-r border-slate-500/60 last:border-none'>
      <div className='text-lg font-semibold'>
        {titulo}
      </div>
      <div className={`text-3xl pt-[1px] pb-[2px] font-semibold tracking-wider
      ${tipo_zona == 'R' ? 'text-indigo-300' : 'text-pink-300'}`}>
        {candidato.porcentaje}%
      </div>
      <div className='text-lg font-normal tracking-widest'>
        {candidato.votos}
      </div>
    </div>
  )
}

export default VistaCandidato