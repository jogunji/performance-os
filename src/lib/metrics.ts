import {supabase} from '@/lib/supabase'

export async function fetchMetrics(){
    return supabase
    .from('metrics')
    .select('*')
    .order('created_at', {ascending: false})
}

export async function fetchMetricEntries(){
    return supabase
    .from('metric_entries')
    .select('*')
    .order('created_at', {ascending: false})
}
