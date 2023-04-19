import { path } from 'd3'
import { Outlet, useLocation } from 'react-router-dom'
import roseImg from '../assets/rose.svg'
import Rose from './Rose'

function ExoSkeleton() {
  const { pathname } = useLocation()
  return (
    <div className='outerMost'>
      <nav>
        <div className="left navItems">
          <Rose id='logoImg' />
          <h2 className='cursive'>
            BlackRose
          </h2>
        </div>
        <div className="right navItems">
          <div className={(pathname === '/login' ? 'active' : '')}>
            Login
          </div>
          <div className={(pathname === '/dashboard' ? 'active' : '')}>
            Dashboard
          </div>
        </div>
      </nav >
      <main>
        <Outlet />
      </main>
      <footer>
        <div>
          Made for <span className="text-green neonText">Blackrose</span>
        </div>
      </footer>
    </div >
  )
}

export default ExoSkeleton
