import { useCollection } from '../api.js'

function Leaderboard() {
  const endpoint = '/api/leaderboard/'
  const { data, loading, error } = useCollection(endpoint)
  const ranked = [...data].sort((first, second) => (second.score ?? second.points ?? 0) - (first.score ?? first.points ?? 0))

  return (
    <section className="resource-page">
      <div className="page-heading"><div><p className="eyebrow">Competitive pulse</p><h1>Leaderboard</h1></div><div className="count-block"><strong>{loading ? '--' : ranked.length}</strong><span>athletes</span></div></div>
      {loading && <p className="status-message">Loading the latest data...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && <div className="leaderboard-list">{ranked.map((entry, index) => <article className={`leaderboard-row rank-${index + 1}`} key={entry._id || entry.id || entry.name}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{(entry.name || '?').charAt(0)}</div><div className="row-main"><h2>{entry.name || 'Unnamed athlete'}</h2><p>{index === 0 ? 'Current pace setter' : 'In the running'}</p></div><div className="score"><strong>{entry.score ?? entry.points ?? 0}</strong><span>score</span></div></article>)}</div>}
    </section>
  )
}

export default Leaderboard