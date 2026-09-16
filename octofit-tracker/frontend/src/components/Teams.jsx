import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api.js'

function Teams() {
  const endpoint = '/api/teams/'
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/teams/`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Unable to load ${endpoint}`)))
      .then((payload) => setState({ data: normalizeCollection(payload), loading: false, error: '' }))
      .catch((error) => setState({ data: [], loading: false, error: error.message }))
  }, [])

  const { data, loading, error } = state

  return <ResourcePage eyebrow="Together is faster" title="Teams" count={data.length} loading={loading} error={error}><div className="team-grid">{data.map((team) => <article className="team-card" key={team._id || team.id || team.name}><div className="team-mark">{(team.name || '?').slice(0, 2).toUpperCase()}</div><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'No description yet.'}</p><footer><span>Team points</span><strong>{team.points ?? 0}</strong></footer></article>)}</div></ResourcePage>
}

function ResourcePage({ eyebrow, title, count, loading, error, children }) {
  return <section className="resource-page"><PageHeading eyebrow={eyebrow} title={title} count={count} loading={loading} label="teams" />{loading && <StatusMessage>Loading the latest data...</StatusMessage>}{error && <StatusMessage error>{error}</StatusMessage>}{!loading && !error && children}</section>
}

function PageHeading({ eyebrow, title, count, loading, label }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="count-block"><strong>{loading ? '--' : count}</strong><span>{label}</span></div></div>
}

function StatusMessage({ children, error = false }) {
  return <p className={error ? 'status-message error-message' : 'status-message'}>{children}</p>
}

export default Teams