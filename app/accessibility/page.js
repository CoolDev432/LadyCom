'use client'

import React from 'react'
import { Lightbulb } from 'lucide-react'
import Numbers from './components/numbers'

const QuickContacts = () => {
    return (
        <div className="text-center px-4">
            <div className="bg-yellow-500 mx-auto mt-10 text-white font-bold px-6 py-4 rounded-3xl w-fit flex items-center gap-4 shadow-lg">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8" />
                <h1 className="text-2xl md:text-3xl">Quick Glance (India)</h1>
            </div>
            <p className="text-gray-700 mt-4 mb-6 text-base md:text-lg max-w-xl mx-auto">
                Tap on any emergency service to instantly copy the number to your clipboard. Stay safe!
            </p>
            <Numbers />
        </div>
    )
}

export default QuickContacts
