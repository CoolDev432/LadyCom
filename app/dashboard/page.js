'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import Nav from './components/Nav'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-gray-500 text-lg">
        Loading your dashboard...
      </div>
    )
  }

  return (
    <main className="relative flex flex-col md:flex-row items-center justify-between px-10 py-16 min-h-screen bg-gradient-to-r from-white via-gray-50 to-white overflow-hidden">
      
      {/* 🌟 Yellow & Warm Blur Backgrounds */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-yellow-200 rounded-full blur-3xl opacity-40 z-0" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-yellow-100 rounded-full blur-2xl opacity-40 z-0" />
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-orange-200 rounded-full blur-2xl opacity-30 z-0" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-yellow-150 rounded-full blur-2xl opacity-40 z-0" />
      <div className="absolute bottom-10 left-1/4 w-[250px] h-[250px] bg-yellow-300 rounded-full blur-[80px] opacity-20 z-0" />

      {/* 🌟 Main Content */}
      <section className="relative z-10 flex flex-col max-w-xl space-y-6 text-center md:text-left">
        <h2 className="text-xl font-medium text-gray-500">
          Welcome back, <span className="font-semibold">{user?.fullName || 'User'}</span>
        </h2>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight drop-shadow-md">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          This is your space. Track your progress, manage your settings, and take control.
        </p>
        <Nav/>
      </section>

      <figure className="relative z-10 mt-12 md:mt-0 md:ml-12">
        <img
          src="/woman_walking.gif"
          alt="Animated illustration of a walking woman"
          className="w-[300px] md:w-[400px] rounded-full border-4 border-gray-200 shadow-2xl bg-orange-100 object-cover"
        />
      </figure>
    </main>
  )
}

export default Dashboard
