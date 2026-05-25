'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function handleLogout() {
  await supabase.auth.signOut()
  setUser(null)
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

  if (loading) {
    return <main className="p-8">Loading...</main>
  }

  if (!user) {
    return <main className="p-8">You are not logged in.</main>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Logged in as: {user.email}</p>
      <button
  onClick={handleLogout}
  className="mt-4 rounded bg-black px-4 py-2 text-white"
>
  Log out
</button>
    </main>
  )
}