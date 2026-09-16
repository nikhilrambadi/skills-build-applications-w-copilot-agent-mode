import { useCollection } from '../api.js'

function Workouts() {
  const endpoint = '/api/workouts/'
  const { data, loading, error } = useCollection(endpoint)

  return <ResourcePage eyebrow="Your next good decision" title="Workouts" count={data.length} loading={loading} error={error}><div className="workout-grid">{data.map((workout, index) => <article className="workout-card" key={workout._id || workout.id || workout.name}><span className="workout-number">{String(index + 1).padStart(2, '0')}</span><p className="workout-type">{workout.type || 'Training'}</p><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your day.'}</p><footer><span>{workout.duration ?? '--'} min</span><span className="arrow">↗</span></footer></article>)}</div></ResourcePage>
}

function ResourcePage({ eyebrow, title, count, loading, error, children }) {
  return <section className="resource-page"><PageHeading eyebrow={eyebrow} title={title} count={count} loading={loading} label="workouts" />{loading && <StatusMessage>Loading the latest data...</StatusMessage>}{error && <StatusMessage error>{error}</StatusMessage>}{!loading && !error && children}</section>
}

function PageHeading({ eyebrow, title, count, loading, label }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="count-block"><strong>{loading ? '--' : count}</strong><span>{label}</span></div></div>
}

function StatusMessage({ children, error = false }) {
  return <p className={error ? 'status-message error-message' : 'status-message'}>{children}</p>
}

export default Workouts