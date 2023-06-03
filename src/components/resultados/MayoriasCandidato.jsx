const MayoriasCandidato = ({
  nombre,
  candidato
}) => {
  return (
    <div className='border-r border-slate-600/70 last:border-none
    py-3'>
      <div className='text-sm font-light'>
        {nombre}
      </div>
      <div className={`text-xl font-semibold tracking-wider opacity-80 group-hover:opacity-100
      ${nombre == 'APRUEBO' ? 'text-indigo-300' : 'text-pink-300'}`}>
        {candidato.porcentaje}%
      </div>
      <div className='text-sm font-light tracking-widest opacity-70'>
        {candidato.votos}
      </div>
    </div>
  )
}

export default MayoriasCandidato