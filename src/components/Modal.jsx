import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Modal = ({
    children,
    status,
    width,
    header,
    buttons
}) => {

    return (
        <>
            {
                status &&
                <div className='animate-modal fixed mt-0 inset-0 z-10
                    bg-slate-800/90 overflow-y-auto'>
                    <div className='min-h-screen text-center mx-7'>
                        <div className={`${width} w-full max-w-xl
                        bg-gradient-to-t from-slate-700 to-slate-700/70
                        inline-block text-left align-middle overflow-hidden
                        rounded-2xl shadow-2xl shadow-slate-900/50`}>

                            <div className="flex space-x-6 px-8 pt-7 pb-7">
                                <div className={`flex-0 grid place-content-center ${header.bg} w-[60px] h-[60px] rounded-xl`}>
                                    <FontAwesomeIcon className="text-3xl text-slate-200" icon={header.icon} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-slate-300 text-2xl font-medium tracking-wide">
                                        {header.title}
                                    </div>
                                    <div className="col-span-2 text-slate-400 font-light">
                                        {header.description}
                                    </div>
                                </div>
                            </div>

                            {children}

                            <div className="md:flex md:space-x-6 md:space-y-0 space-y-3 px-8 py-7
                                border-t border-slate-600 bg-gradient-to-tr from-slate-700 to-slate-800">
                                <div onClick={buttons.buttonA.callback}
                                    className='transition rounded-lg cursor-pointer text-sm font-light uppercase py-3 px-6
                                    bg-indigo-600 text-slate-300 hover:bg-indigo-500 hover:text-slate-100'>
                                    <FontAwesomeIcon icon={faCircleCheck} className='mr-3' />{buttons.buttonA.title}
                                </div>
                                <div onClick={buttons.buttonB.callback}
                                    className='transition rounded-lg cursor-pointer text-sm font-light uppercase py-3 px-6
                                    bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-slate-100'>
                                    <FontAwesomeIcon icon={faCircleXmark} className='mr-3' />{buttons.buttonB.title}
                                </div>
                            </div>

                        </div>
                        <div className='-z-10 fixed inset-0  opacity-90'></div>
                        <span className='-z-10 inline-block h-screen align-middle' aria-hidden='true'>&#8203;</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal