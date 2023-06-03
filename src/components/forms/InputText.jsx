import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const InputText = ({
    title,
    description,
    name,
    value,
    maxLength = 32,
    placeholder,
    onChange,
    style = ''
}) => {

    return (
        <>
            {
                title &&
                <h2 className='text-slate-300 font-normal pb-3'>
                    {title}
                    {
                        description &&
                        <span className='text-slate-500 font-light ml-5'>{description}</span>
                    }
                </h2>
            }
            <div className='relative'>
                <FontAwesomeIcon className='absolute top-3.5 left-[25px] text-lg text-slate-300' icon={faMagnifyingGlass} />
                <input type='text'
                    className={`form-input-small ${style}`}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    autoComplete="off"
                    onChange={onChange}
                    maxLength={maxLength}
                />
            </div>
        </>
    )
}

export default InputText