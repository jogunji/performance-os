'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'


export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function handleLogout() {
  await supabase.auth.signOut()
  setUser(null)
  router.push('/login')
}

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (!error) {
        setUser(data.user)
      }

      setLoading(false)
    }

    getUser()
  }, [])

  useEffect(() =>{
    if (!loading && !user){
      router.push('/login')
    }
  },[loading, user, router])

  if (loading) {
    return <main className="p-8">Loading...</main>
  }

  if (!user) {
    return <main className="p-8">Redirecting...</main>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Logged in as: {user.email}</p>
      <button 
        onClick={handleLogout}
        className="mt-4 rounded bg-black px-4 py-2 text-white">
        Log out
        </button>
    </main>
  )
}