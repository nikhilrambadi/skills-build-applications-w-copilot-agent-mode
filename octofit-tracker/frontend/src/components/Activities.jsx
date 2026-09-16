import { useCollection } from '../api.js'

function Activities() {
  const { data, loading, error } = useCollection('activities')

  return (
    <ResourcePage eyebrow="Movement log" title="Activities" count={data.length} loading={loading} error={error}>
      <div className="resource-list">
        {data.map((activity, index) => (
          <article className="resource-row" key={activity._id || activity.id || activity.name}>
            <div className="row-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="row-main"><h2>{activity.name || 'Untitled activity'}</h2><p>{activity.type || 'General movement'}</p></div>
            <div className="row-stat"><strong>{activity.duration ?? '--'}</strong><span>minutes</span></div>
            <div className="row-stat accent-stat"><strong>{activity.points ?? 0}</strong><span>points</span></div>
          </article>
        ))}
      </div>
    </ResourcePage>
  )
}

function ResourcePage({ eyebrow, title, count, loading, error, children }) {
  return <section className="resource-page"><PageHeading eyebrow={eyebrow} title={title} count={count} loading={loading} label="records" />{loading && <StatusMessage>Loading the latest data...</StatusMessage>}{error && <StatusMessage error>{error}</StatusMessage>}{!loading && !error && children}</section>
}

function PageHeading({ eyebrow, title, count, loading, label }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><div className="count-block"><strong>{loading ? '--' : count}</strong><span>{label}</span></div></div>
}

function StatusMessage({ children, error = false }) {
  return <p className={error ? 'status-message error-message' : 'status-message'}>{children}</p>
}

export default Activities