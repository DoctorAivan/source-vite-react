import { useState } from 'react'

import { faShield } from '@fortawesome/free-solid-svg-icons'

import Modal from '../components/Modal'

const Users = () => {

  const [team_interface_ui, set_team_interface_ui] = useState(false)

  // Change UI interface Status
  const team_interface_ui_change = () => {
    set_team_interface_ui(!team_interface_ui)
  }

  return (
    <>
      <Modal
        status={team_interface_ui}
        width='max-w-xl'
        header={{
          title: 'Titulo Modal',
          description: 'Detalles adicionales del Modal',
          icon: faShield,
          bg: 'bg-indigo-500'
        }}
        buttons={{
          buttonA: {
            title: 'Guardar',
            callback: team_interface_ui_change
          },
          buttonB: {
            title: 'Cancelar',
            callback: team_interface_ui_change
          }
        }}
      >
        <div className='px-8 pb-7'>
          XXX
        </div>
      </Modal>
      <div onClick={team_interface_ui_change}>Users Click</div>
    </>
  )
}

export default Users