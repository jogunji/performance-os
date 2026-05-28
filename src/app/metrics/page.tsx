'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type Metric = {
  id: string
  user_id: string
  name: string
  type: string
  target_value: number | null
  unit: string | null
  created_at: string
}

export default function MetricsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('numeric')
  const [targetValue, setTargetValue] = useState('')
  const [unit, setUnit] = useState('')

  async function handleCreateMetric(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()

    if(!user){
        setMessage('You must be logged in to create a metric.')
        return
    }

    const {data, error} = await supabase
        .from('metrics')
        .insert({
            user_id: user.id,
            name,
            type,
            target_value: targetValue? Number(targetValue) : null,
            unit: unit || null,
        })
        .select()
        .single()

        if(error){
        setMessage(error.message)
        return
        }

        setMetrics([data, ...metrics])
        setName('')
        setType('numeric')
        setTargetValue('')
        setUnit('')
        setMessage('Metric created.')
  }
  

  useEffect(() => {
    async function loadMetrics() {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        setMessage('You must be logged in to view metrics.')
        setLoading(false)
        return
      }

      setUser(userData.user)

      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setMessage(error.message)
      } else {
        setMetrics(data)
      }

      setLoading(false)
    }

    loadMetrics()
  }, [])

  if (loading) {
    return <main className="p-8">Loading metrics...</main>
  }

  if (!user) {
    return <main className="p-8">{message}</main>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Metrics</h1>
      <p className="mt-2 text-sm text-gray-600">Logged in as {user.email}</p>

      {message && <p className="mt-4">{message}</p>}

    <form onSubmit={handleCreateMetric} className="mt-6 space-y-4 rounded border p-4">
        <input
        className="w-full rounded border p-2"
        placeholder="Metric name"
        value={name}
         onChange={(event) => setName(event.target.value)}
        />

        <select
        className="w-full rounded border p-2"
        value={type}
        onChange={(event) => setType(event.target.value)}
        >
        <option value="numeric">Numeric</option>
        <option value="boolean">Boolean</option>
        <option value="rating">Rating</option>
        </select>

    <input
        className="w-full rounded border p-2"
        placeholder="Target value"
        value={targetValue}
        onChange={(event) => setTargetValue(event.target.value)}
    />

    <input
        className="w-full rounded border p-2"
        placeholder="Unit, e.g. minutes, hours"
        value={unit}
        onChange={(event) => setUnit(event.target.value)}
    />

    <button className="rounded bg-black px-4 py-2 text-white" type="submit">
        Add metric
    </button>
</form>

      <ul className="mt-6 space-y-2">
        {metrics.map((metric) => (
          <li key={metric.id} className="rounded border p-3">
            <p className="font-medium">{metric.name}</p>
            <p className="text-sm text-gray-600">
              Target: {metric.target_value ?? 'None'} {metric.unit ?? ''}
            </p>
            <p className="text-sm text-gray-600">Type: {metric.type}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}