import {supabase} from '@/lib/supabase'

export default function SupabaseTestPage(){
 const urlExists = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

 return(
    <main className="p-8">
     <h1 className="text-2x1 font-bold">Supabase Test</h1>
     <p>Env loaded: {urlExists ? 'Yes' : 'No'}</p>
     <p>Client created: {supabase ? 'Yes' : 'No'}</p>
    </main>
 )    
}