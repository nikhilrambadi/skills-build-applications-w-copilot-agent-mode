import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint} (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.docs)) return payload.docs
  return []
}

export function useCollection(endpoint) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchCollection(endpoint)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => {
      active = false
    }
  }, [endpoint])

  return state
}