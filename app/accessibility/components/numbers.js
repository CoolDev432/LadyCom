'use client'

import React, { useState } from 'react'
import { ShieldCheck, HeartPulse, PhoneCall, Flame, AlertTriangle, Baby } from 'lucide-react'

const emergencyList = [
    { label: 'Police', number: '112', icon: <ShieldCheck className="w-6 h-6" /> },
    { label: 'Ambulance', number: '108', icon: <HeartPulse className="w-6 h-6" /> },
    { label: 'Women Helpline', number: '1091', icon: <PhoneCall className="w-6 h-6" /> },
    { label: 'Fire Emergency', number: '101', icon: <Flame className="w-6 h-6" /> },
    { label: 'Disaster Management', number: '1078', icon: <AlertTriangle className="w-6 h-6" /> },
    { label: 'Child Helpline', number: '1098', icon: <Baby className="w-6 h-6" /> }
]

const Numbers = () => {
    const [copied, setCopied] = useState()

    const handleCopy = (number) => {
        navigator.clipboard.writeText(number)
        setCopied(number)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className='bg-orange-300 p-6 rounded-3xl mt-8 max-w-2xl mx-auto space-y-4'>
            {emergencyList.map((item, index) => (
                <div
                    key={index}
                    className='bg-gray-800 text-white p-4 rounded-3xl flex items-center justify-between cursor-pointer hover:bg-gray-700 transition'
                    onClick={() => handleCopy(item.number)}
                >
                    <div className="flex items-center gap-4">
                        {item.icon}
                        <h2 className='font-semibold text-lg'>{item.label}: {item.number}</h2>
                    </div>
                    {copied === item.number && (
                        <span className="text-sm text-green-400">Copied!</span>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Numbers
