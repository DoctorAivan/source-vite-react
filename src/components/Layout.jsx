import { Outlet, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {
  return (
    <div>

      <div className="h-10 bg-gradient-to-tl from-indigo-900 to-indigo-700">
        <FontAwesomeIcon icon={faServer} /> Server
      </div>

      <Outlet />

    </div>
  )
}

export default Layout