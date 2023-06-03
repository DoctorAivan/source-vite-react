import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import InputText from "../forms/InputText"

const VistaComuna = ({
    regiones,
    zonas,
    filtro,
    filtro_asignar,
    vista,
    eleccion,
    marcar
}) => {

    const buscar_region = (codigo) => {
        const region = regiones.find(({ id }) => id === codigo);
        return 'R. ' + region.region
    }

    return (
        <div>
            <div className="px-8 mb-5">
                <InputText
                    title='Buscar una Comuna'
                    description=''
                    name='filtro'
                    value={filtro}
                    placeholder='Chaitén, Concepción, Providencia'
                    onChange={filtro_asignar}
                />
            </div>
            <div className='grid gap-5 grid-cols-[auto_220px_1fr_auto]
            font-ubuntu font-light text-slate-400 px-8 pb-2.5'>
                <div><FontAwesomeIcon className="pt-1 opacity-30" icon={faCircle} /></div>
                <div>COMUNA</div>
                <div>REGIÓN</div>
                <div>VOTOS</div>
            </div>
            <div className='max-h-[328px] overflow-y-auto'>
                {
                    zonas.filter(comuna => {
                        if (!filtro) return true
                        let search = comuna.comuna.toLowerCase()
                        return search.includes(filtro.toLowerCase())
                    }).map((comuna) => (

                        <div onClick={() => {
                            comuna.id != vista.codigo &&
                                marcar(comuna.id)
                        }}
                            key={comuna.id}
                            className={`grid gap-5 grid-cols-[auto_220px_1fr_auto]
                font-ubuntu
                px-8 pt-[8px] pb-[9px]
                ${comuna.id == vista.codigo ?
                                    'cursor-default text-slate-100 font-light bg-gradient-to-bl from-indigo-800 to-indigo-700'
                                    :
                                    comuna.id == eleccion ?
                                        'animate-buttonActive cursor-default text-white font-semibold bg-gradient-to-bl from-rose-700 to-rose-600'
                                        :
                                        'cursor-pointer text-slate-300 hover:text-white font-light bg-gradient-to-bl from-slate-600 to-slate-700 hover:to-indigo-800/80'}
                `}>
                            {
                                comuna.id == vista.codigo ?
                                    <FontAwesomeIcon className="pt-1 text-slate-100" icon={faCircleCheck} />
                                    :
                                    comuna.id == eleccion ?
                                        <FontAwesomeIcon className="pt-1 text-white" icon={faCircleCheck} />
                                        :
                                        <FontAwesomeIcon className="pt-1 text-slate-500" icon={faCircle} />
                            }
                            <div className='font-semibold'>{comuna.comuna}</div>
                            <div className='font-light opacity-70'>{buscar_region(comuna.region)}</div>
                            <div className="font-bold text-lime-300 tracking-wider">{comuna.votos}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VistaComuna