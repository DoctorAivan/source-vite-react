import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";

import { apiGet, apiPost, apiPut, apiDelete } from '../hooks/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faLocationDot, faTreeCity, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'

import Modal from "./Modal";

import Vista from "./vistas/Vista";
import Estudios from "./estudios/Estudios";
import Header from "./Header";
import Resultados from "./resultados/Resultados";
import Bloque from "./bloques/Bloque";
import Separador from "./bloques/Separador";
import Precarga from "./Precarga";
import VistaAsignar from "./vistas/VistaAsignar";

import socket from "../hooks/websocket"
import Mayorias from "./resultados/Mayorias";
import VistaDirectaAsignar from "./vistas/VistaDirectaAsignar";

const Layout = () => {

  const [actualizacion, set_actualizacion] = useState({
    fecha: '00-00-00',
    hora: '00:00',
    mesas: '00.00'
  })

  const [nuevo_computo, set_nuevo_computo] = useState(false)

  const [pais, set_pais] = useState({})
  const [zonas, set_zonas] = useState([])
  const [regiones, set_regiones] = useState([])
  const [comunas, set_comunas] = useState([])

  const [estado_preparga, set_estado_preparga] = useState(false)

  const [estudios, set_estudios] = useState([])
  const [estudio_actual, set_estudio_actual] = useState(0)

  const [bloques, set_bloques] = useState([])

  const [vista_data, set_vista_data] = useState({})
  const [vista_filtro, set_vista_filtro] = useState('')
  const [vista_eleccion, set_vista_eleccion] = useState({})
  const [vista_ui, set_vista_ui] = useState(false)

  const [vista_directo_id, set_vista_directo_id] = useState(0)
  const [vista_directo_data, set_vista_directo_data] = useState({})
  const [vista_directo_ui, set_vista_directo_ui] = useState(false)
  
  //        -       -       -       -       -       -       -       -       -       -       -

  // Coach List
  const estudios_get = async (estudio_guardado) => {

    // Send API Request
    let { response } = await apiGet('estudios')

    // Almacenar listado de regiones
    set_zonas(response.zonas)

    // Almacenar Votos total país
    set_pais(response.votos_pais)

    // Listado de estadios
    set_estudios(response.estudios.map((estudio) => {
      if (estudio.id === estudio_guardado) {
        return { ...estudio, activo: true }
      }
      return { ...estudio, activo: false }
    }))

    // Información de la actualización
    set_actualizacion({
      fecha: response.actualizacion.fecha,
      hora: response.actualizacion.hora,
      mesas: response.actualizacion.mesas
    })

    // Obtener los Blqoues del estudio
    bloques_get(estudio_guardado)

    // Send API Request
    let { response: mayorias } = await apiGet('region-mayorias')
    set_regiones(mayorias)

    // Send API Request
    let { response: favoritas } = await apiGet('comunas-favoritas')
    set_comunas(favoritas)
  }

  // Obtener los bloques del estudio
  const estudio_asignar = async (id) => {

    // Validar ID del estudio
    if (id != estudio_actual) {

      // Obtener los Blqoues
      bloques_get(id)

      // Almacenar ID del estudio seleccionado
      set_estudio_actual(id)

      // Desplegar Precarga
      set_estado_preparga(true)

      // Reestructurar el listado de estudios
      set_estudios(estudios.map((estudio) => {
        if (estudio.id === id) {
          return { ...estudio, activo: true }
        }
        return { ...estudio, activo: false }
      }))

      // Almacenar el ID del estudio
      window.localStorage.setItem('estudio', id)
    }
  }

  // Obtener los Blqoues
  const bloques_get = async (id) => {

    // Send API Request
    let { response } = await apiGet('bloques/' + id)

    // Asignar los bloques del estudio
    set_bloques(response)
  }

  //        -       -       -       -       -       -       -       -       -       -       -

  // Vista iniciar funcionalidad
  const vista_open = async (vista) => {

    // Almacenar la información de la vista
    set_vista_data(vista)

    // Iniciar interfaz
    set_vista_ui(true)
  }

  // Vista confirmar modificación
  const vista_marcar = (vista) => {

    // Validar el ID de la zona
    if (vista_eleccion.id == vista.id) {
      set_vista_eleccion({})
    }
    else {
      set_vista_eleccion(vista)
    }
  }

  // Update League Data
  const vista_filtro_asignar = (e) => {

    // Set League Data
    set_vista_filtro(e.target.value)
  }

  // Vista confirmar modificación
  const vista_confirmar = async () => {

    // Estructura de la vista
    const vista_envio = {
      id: vista_data.id,
      vista: vista_data.vista,
      bloque: vista_data.bloque,
      tipo: vista_eleccion.tipo,
      codigo: vista_eleccion.id
    }

    // Send API Request
    let { response, status_code } = await apiPost('vista-asignar/', vista_envio)

    // Validate API Response
    if (status_code == 200) {

      // Actualizar la información de la vista
      const bloque = bloques.map(item => {
        if (item.id === response.bloque) {
          const actualizar_vista = item.vistas.map(vista => {
            if (vista.id === response.id) {
              return {
                ...vista,
                votos: response.votos,
                tipo: response.tipo,
                codigo: response.codigo,
                nombre: response.nombre,
                apruebo: response.apruebo,
                rechazo: response.apruebo,
                mayoria: response.mayoria,
                actualizado: response.actualizado
              };
            }
            return vista;
          });
          return { ...item, vistas: actualizar_vista };
        }
        return item;
      })

      // Actualizar Bloque
      set_bloques(bloque)

      // Quitar la interfaz
      set_vista_ui(false)

      // Quitar seleccion de zona
      set_vista_eleccion(0)

      // Quitar filtro
      set_vista_filtro('')
    }
  }

  // Actualizar la animación de la vista
  const vista_actualizar_ui = (bloque_id, vista_id) => {

    // Actualizar la información de la vista
    const bloque = bloques.map(item => {
      if (item.id === bloque_id) {
        const actualizar_vista = item.vistas.map(vista => {
          if (vista.id === vista_id) {
            return { ...vista, actualizado: false };
          }
          return vista;
        });
        return { ...item, vistas: actualizar_vista };
      }
      return item;
    })

    // Actualizar Bloque
    set_bloques(bloque)

  }

  // Vista cancelar modificación
  const vista_cancelar = () => {

    // Quitar la interfaz
    set_vista_ui(false)

    // Quitar seleccion de zona
    set_vista_eleccion(0)

    // Quitar filtro
    set_vista_filtro('')
  }

  //        -       -       -       -       -       -       -       -       -       -       -

  // Vista cancelar modificación
  const vista_directa_iniciar = ( zona ) => {

    set_vista_directo_data(zona)

    // Quitar la interfaz
    set_vista_directo_ui(true)
  }

  // Vista asignar a la interfaz
  const vista_directa_confirmar = async () => {

    const vista_marcada = vista_directo_id - 1
    const vista_data = bloques[0].vistas[vista_marcada]

    // Estructura de la vista
    const vista_envio = {
      id: vista_data.id,
      vista: vista_data.vista,
      bloque: vista_data.bloque,
      tipo: vista_directo_data.tipo,
      codigo: vista_directo_data.id
    }

    // Send API Request
    let { response, status_code } = await apiPost('vista-asignar/', vista_envio)

    // Validate API Response
    if (status_code == 200) {

      // Actualizar la información de la vista
      const bloque = bloques.map(item => {
        if (item.id === response.bloque) {
          const actualizar_vista = item.vistas.map(vista => {
            if (vista.id === response.id) {
              return {
                ...vista,
                votos: response.votos,
                tipo: response.tipo,
                codigo: response.codigo,
                nombre: response.nombre,
                candidatos: response.candidatos,
                actualizado: response.actualizado
              };
            }
            return vista;
          });
          return { ...item, vistas: actualizar_vista };
        }
        return item;
      })

      // Actualizar Bloque
      set_bloques(bloque)

      // Quitar la interfaz
      set_vista_directo_ui(false)

      // Reiniciar ID de la vista
      set_vista_directo_id(0)
    }
  }

  // Vista cancelar modificación
  const vista_directa_cancelar = () => {

    // Quitar la interfaz
    set_vista_directo_ui(false)

    // Reiniciar ID de la vista
    set_vista_directo_id(0)
  }

  //        -       -       -       -       -       -       -       -       -       -       

  // Wait for Changes in Event
  useEffect(() => {

    // Obtener el último estudio seleccionado
    const estudio_guardado = Number(window.localStorage.getItem('estudio'))

    // Obtener el listado de estudios
    estudios_get(estudio_guardado)

    return () => { }

  }, [0])

  // Suscribe to Websocket
  socket.onmessage = (response) => {

    // Create object
    const mensaje = JSON.parse(response.data)

    // Obtener el último estudio seleccionado
    const estudio_guardado = Number(window.localStorage.getItem('estudio'))

    // Actualizar los votos en la interfaz
    if (mensaje.tipo == 'computo') {

      // Obtener el listado de estudios
      estudios_get(estudio_guardado)

      // Desplegar alerta de nuevo dato
      set_nuevo_computo(true)
    }
  }

  return (
    <div>

      <Modal
        status={vista_ui}
        habilitado={vista_eleccion}
        vista={vista_data}
        width={vista_data.tipo == 'R' ? 'w-[480px]' : 'w-[650px]'}
        header={{
          title: 'ASIGNAR UNA ZONA',
          description: 'Selecciona una de las opciones del listado',
          icon: faLocationDot,
          bg: 'bg-indigo-500'
        }}
        buttons={{
          buttonA: {
            title: 'Confirmar',
            callback: vista_confirmar
          },
          buttonB: {
            title: 'Cancelar',
            callback: vista_cancelar
          }
        }}>

        <VistaAsignar
          zonas={zonas}
          filtro={vista_filtro}
          filtro_asignar={vista_filtro_asignar}
          vista={vista_data}
          eleccion={vista_eleccion}
          marcar={vista_marcar}
        />

      </Modal>

      <Modal
        status={vista_directo_ui}
        habilitado={vista_directo_id}
        vista={vista_directo_data}
        width={'w-[820px]'}
        header={{
          title: 'REEMPLAZAR VISTA',
          description: 'Selecciona una de las vistas disponibles',
          icon: faLocationDot,
          bg: 'bg-indigo-500'
        }}
        buttons={{
          buttonA: {
            title: 'Confirmar',
            callback: vista_directa_confirmar
          },
          buttonB: {
            title: 'Cancelar',
            callback: vista_directa_cancelar
          }
        }}>

        <div className="grid gap-7 grid-cols-4 mx-8 mb-7">
          {
            bloques[0] &&
              bloques[0].vistas.map((vista,i) => (
                <VistaDirectaAsignar
                  key={vista.id}
                  i={ i + 1 }
                  vista={vista}
                  vista_directo_id={vista_directo_id}
                  set_vista_directo_id={set_vista_directo_id}
                  vista_directo_data={vista_directo_data}
                />
              ))
          }
        </div>

      </Modal>

      <Precarga
        estado_preparga={estado_preparga}
        set_estado_preparga={set_estado_preparga}
      />

      <Header
        data={actualizacion}
        pais={pais}
        nuevo_computo={nuevo_computo}
        set_nuevo_computo={set_nuevo_computo}
      />

      <div className="relative w-full">

        <Resultados
          pais={pais}
        />

        <Estudios
          estudios={estudios}
          asignar={estudio_asignar}
        />

        <div className="z-0 relative pt-10 pb-11
        border-t border-slate-700 bg-slate-800">

          <div className="z-10 relative w-[1440px] mx-auto">
            {
              bloques.map((bloque) => (

                <div key={bloque.id}>

                  <Bloque
                    id={bloque.id}
                    titulo='DE 4 VISTAS'
                    subtitulo='LISTADO'
                    descripcion='ESPACIOS DISPONIBLES PARA ASIGNAR DATOS'
                    tipo={bloque.tipo}
                    icono={faLayerGroup}
                  />

                  <div className="grid grid-cols-4 gap-10">
                    {
                      bloque.vistas.map((vista) => (
                        <Vista
                          key={vista.id}
                          vista={vista}
                          bloque={bloque}
                          vista_open={vista_open}
                          actualizar={vista_actualizar_ui}
                        />
                      ))
                    }
                  </div>

                  <Separador />

                </div>

              ))
            }
          </div>

          <Mayorias
            titulo='REGIONES'
            subtitulo='LISTADO'
            descripcion={'LISTA CON LAS 16 REGIONES Y SUS VOTOS'}
            icono={faTreeCity}
            zonas={regiones}
            ui={vista_directa_iniciar}
            actuales={bloques}
          />

          <Separador />

          <Mayorias
            titulo='FAVORITAS'
            subtitulo='COMUNAS'
            descripcion={'LISTADO CON LAS COMUNAS MARCADAS COMO FAVORITAS'}
            icono={faHeartCircleCheck}
            zonas={comunas}
            ui={vista_directa_iniciar}
            actuales={bloques }
          />

        </div>

        <Outlet />

      </div>

    </div>
  )
}

export default Layout