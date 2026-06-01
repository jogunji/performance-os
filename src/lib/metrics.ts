import { supabase } from '@/lib/supabase'

export async function fetchMetrics() {
    return supabase
        .from('metrics')
        .select('*')
        .order('created_at', { ascending: false })
}

export async function fetchMetricEntries() {
    return supabase
        .from('metric_entries')
        .select('*')
        .order('created_at', { ascending: false })
}

export async function createMetric(metric: {
    user_id: string
    name: string
    type: string
    target_value: number | null
    unit: string | null
}) {
    return supabase.from('metrics').insert(metric).select().single()
}

export async function createMetricEntry(entry: {
    metric_id: string
    user_id: string
    value: number
    entry_date: string
}) {
    return supabase.from('metric_entries').insert(entry).select().single()
}

export async function deleteMetric(id: string){
    return supabase.from('metrics').delete().eq('id', id)
}

export async function deleteMetricEntry(id: string){
    return supabase.from('metric_entries').delete().eq('id', id)
}