import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="welcome-panel">
      <p className="eyebrow">OctoFit Tracker</p>
      <h1>Make every move count.</h1>
      <p className="lead-copy">
        Track the team&apos;s momentum, find your next workout, and keep the
        leaderboard moving.
      </p>
      <div className="overview-grid">
        <NavLink className="overview-link overview-link-coral" to="/activities">
          <span>01</span><strong>Log activity</strong><small>See the latest movement</small>
        </NavLink>
        <NavLink className="overview-link overview-link-blue" to="/workouts">
          <span>02</span><strong>Choose a workout</strong><small>Find your next session</small>
        </NavLink>
        <NavLink className="overview-link overview-link-yellow" to="/leaderboard">
          <span>03</span><strong>Check the climb</strong><small>See who is leading</small>
        </NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <img src={logo} alt="OctoFit Tracker" />
          <span>OCTOFIT<span> / TRACKER</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
      <footer className="footer"><span>OCTOFIT / 2026</span><span>Move with purpose.</span></footer>
    </div>
  )
}

export default App
