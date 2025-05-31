'use client'

import React, { useEffect, useState } from 'react'
import { Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'

const Contacts = () => {
    const { user, isLoaded } = useUser()

    const [email, setEmail] = useState('')
    const [sosName, setSosName] = useState('')
    const [sosNumber, setSosNumber] = useState('')
    const [saved, setSaved] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendSuccess, setSendSuccess] = useState(null)

    // Load email and localStorage items when Clerk loads
    useEffect(() => {
        if (isLoaded && user) {
            const userEmail = user.emailAddresses[0]?.emailAddress || ''
            setEmail(userEmail)
        }

        const storedName = localStorage.getItem('sosName')
        const storedNumber = localStorage.getItem('sosNumber')
        if (storedName) setSosName(storedName)
        if (storedNumber) setSosNumber(storedNumber)
    }, [isLoaded, user])

    const handleSave = () => {
        if (sosName.trim() === '' || sosNumber.trim() === '') {
            alert('Please enter both name and number.')
            return
        }
        localStorage.setItem('sosName', sosName)
        localStorage.setItem('sosNumber', sosNumber)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleSendSMS = async () => {
        if (!sosNumber) {
            alert('Please save a valid SOS number first.')
            return
        }
        setSending(true)
        setSendSuccess(null)

        const senderName = user?.firstName || 'User'
        const message = `SOS Alert! Please contact ${email} (${senderName}).`

        try {
            const response = await fetch(`/api/sendSMS?to=${encodeURIComponent(sosNumber)}&text=${encodeURIComponent(message)}`)
            const data = await response.json()

            setSendSuccess(response.ok && data.success)
        } catch (error) {
            setSendSuccess(false)
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="min-h-screen p-6 bg-white">
            {/* Header */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <Phone className="scale-150 text-green-700" />
                <h1 className="text-4xl font-semibold text-green-700">SOS Settings</h1>
            </div>

            {/* Input Section */}
            <div className="flex flex-col items-center mt-10 gap-6">
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-lg">Name:</label>
                    <input
                        type="text"
                        value={sosName}
                        onChange={(e) => setSosName(e.target.value)}
                        placeholder="e.g. Mom"
                        className="p-2 rounded-xl shadow-md w-72 border border-black"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <label className="font-bold text-lg">Number:</label>
                    <input
                        type="text"
                        value={sosNumber}
                        onChange={(e) => setSosNumber(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="p-2 rounded-xl shadow-md w-72 border border-black"
                    />
                </div>
                <Button
                    className="cursor-pointer mt-2"
                    onClick={handleSave}
                    disabled={!user}
                >
                    Save Contact
                </Button>
            </div>

            {/* Alert */}
            {saved && <p className="text-center text-green-600 mt-4 font-medium">✅ SOS Contact Saved!</p>}

            {/* Preview Card */}
            {(sosName || sosNumber) && (
                <div className="mt-10 mx-auto max-w-md bg-green-100 p-6 rounded-3xl shadow-xl text-center">
                    <div className="flex flex-col items-center gap-2">
                        <User className="w-10 h-10 text-green-700" />
                        <h2 className="text-2xl font-bold">{sosName || 'Name not set'}</h2>
                        <p className="text-lg text-gray-700">{sosNumber || 'Number not set'}</p>
                    </div>

                    <Button
                        className="cursor-pointer mt-5"
                        onClick={handleSendSMS}
                        disabled={sending || !user}
                    >
                        {sending ? 'Sending...' : 'Send SMS'}
                    </Button>

                    {sendSuccess === true && (
                        <p className="text-green-600 mt-3 font-medium">✅ SMS sent successfully!</p>
                    )}
                    {sendSuccess === false && (
                        <p className="text-red-600 mt-3 font-medium">❌ Failed to send SMS.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Contacts
