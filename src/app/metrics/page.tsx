'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import {
    createMetric,
    createMetricEntry,
    deleteMetric,
    deleteMetricEntry,
    fetchMetrics,
    fetchMetricEntries,
} from '@/lib/metrics'


type Metric = {
    id: string
    user_id: string
    name: string
    type: string
    target_value: number | null
    unit: string | null
    created_at: string
}

type MetricEntry = {
    id: string
    metric_id: string
    user_id: string
    value: number
    entry_date: string
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
    const [entries, setEntries] = useState<MetricEntry[]>([])
    const [selectedMetricId, setSelectedMetricId] = useState('')
    const [entryValue, setEntryValue] = useState('')
    const [entryDate, setEntryDate] = useState('')

    async function handleCreateMetric(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!user) {
            setMessage('You must be logged in to create a metric.')
            return
        }

        const { data, error } = await createMetric({
            user_id: user.id,
            name,
            type,
            target_value: targetValue ? Number(targetValue) : null,
            unit: unit || null,
        })


        if (error) {
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

    async function handleCreateEntry(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!user) {
            setMessage('You must be logged in')
            return
        }

        const { data, error } = await createMetricEntry({
            metric_id: selectedMetricId,
            user_id: user.id,
            value: Number(entryValue),
            entry_date: entryDate,
        })

        if (error) {
            setMessage(error.message)
            return
        }

        setEntries([data, ...entries])
        setEntryValue('')
        setEntryDate('')

        setMessage('Entry created.')
    }

    async function handleDeleteMetric(id: string) {
        const { error } = await deleteMetric(id)

        if (error) {
            setMessage(error.message)
            return
        }
        setMetrics(metrics.filter((metric) => metric.id !== id))
        setEntries(entries.filter((entry) => entry.metric_id !== id))
        setMessage('Metric deleted.')
    }

    async function handleDeleteEntry(id: string) {

        const { error } = await deleteMetricEntry(id)
        if (error) {
            setMessage(error.message)
            return
        }
        setEntries(entries.filter((entry) => entry.id !== id))
        setMessage('Entry deleted.')
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

            const { data, error } = await fetchMetrics()

            if (error) {
                setMessage(error.message)
            } else {
                setMetrics(data)
            }

            const { data: entryData, error: entryError } = await fetchMetricEntries()

            if (entryError) {
                setMessage(entryError.message)
            }
            else {
                setEntries(entryData)
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
            <Link href="/dashboard" className="mt-4 inline-block underline">
                Back to Dashboard
            </Link>

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

            <form
                onSubmit={handleCreateEntry}
                className="mt-6 space-y-4 rounded border p-4"
            >
                <h2 className="text-lg font-semibold">Add Metric Entry</h2>

                <select
                    className="w-full rounded border p-2"
                    value={selectedMetricId}
                    onChange={(event) => setSelectedMetricId(event.target.value)}
                >
                    <option value="">Select metric</option>

                    {metrics.map((metric) => (
                        <option key={metric.id} value={metric.id}>
                            {metric.name}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full rounded border p-2"
                    type="number"
                    placeholder="Value"
                    value={entryValue}
                    onChange={(event) => setEntryValue(event.target.value)}
                />

                <input
                    className="w-full rounded border p-2"
                    type="date"
                    value={entryDate}
                    onChange={(event) => setEntryDate(event.target.value)}
                />

                <button
                    className="rounded bg-black px-4 py-2 text-white"
                    type="submit"
                >
                    Add Entry
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

                        <div className="mt-3">
                            <p className="text-sm font-medium">Entries</p>

                            <ul className="mt-1 space-y-1">
                                {entries
                                    .filter((entry) => entry.metric_id === metric.id)
                                    .map((entry) => (
                                        <li key={entry.id} className="flex items-center justify-between
                                         text-sm text-gray-600">
                                            <span>
                                                {entry.entry_date}: {entry.value}
                                            </span>
                                            <button className="rounded bg-red-600 px-2 py-1 text-xs text-white:"
                                                onClick={() => handleDeleteEntry(entry.id)}>
                                                Delete
                                            </button>



                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <button
                            className="mt-3 rounded bg-red-600 px-3 py-1 text-sm text-white"
                            onClick={() => handleDeleteMetric(metric.id)}
                        >
                            Delete metric
                        </button>

                    </li>
                ))}
            </ul>
        </main>
    )
}