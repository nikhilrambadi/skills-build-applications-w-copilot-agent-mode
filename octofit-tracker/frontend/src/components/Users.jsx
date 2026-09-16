import { useEffect, useState } from 'react'
import { apiBaseUrl, normalizeCollection } from '../api.js'

function Users() {
  const endpoint = '/api/users/'
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/users/`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Unable to load ${endpoint}`)))
      .then((payload) => setState({ data: normalizeCollection(payload), loading: false, error: '' }))
      .catch((error) => setState({ data: [], loading: false, error: error.message }))
  }, [])

  const { data, loading, error } = state

  return <ResourcePage eyebrow="The people behind the pace" title="Users" count={data.length} loading={loading} error={error}><div className="resource-list">{data.map((user) => <article className="resource-row user-row" key={user._id || user.id || user.email}><div className="avatar">{(user.name || user.email || '?').charAt(0)}</div><div className="row-main"><h2>{user.name || 'Unnamed user'}</h2><p>{user.email || 'No email provided'}</p></div><div className="row-stat"><strong>{user.level ?? '--'}</strong><span>level</span></div></article>)}</div></ResourcePage>
}

function ResourcePage({ eyebrow, title, count, loading, error, children }) {
  return <section className="resource-page"><PageHeading eyebrow={eyebrow} title={title} count={count} loading={loading} label="users" />{loading && <StatusMessage>Loading the latest data...</StatusMessage>}{error && <StatusMessage error>{error}</StatusMessage>}{!loading && !error && children}</section>
}

function PageHeading({ eyebrow, title, count, loading, label }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="count-block"><strong>{loading ? '--' : count}</strong><span>{label}</span></div></div>
}

function StatusMessage({ children, error = false }) {
  return <p className={error ? 'status-message error-message' : 'status-message'}>{children}</p>
}

export default Users