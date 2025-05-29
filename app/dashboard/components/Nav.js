import React from 'react'
import Link from 'next/link'
import { Settings, Map, Accessibility, Lightbulb, Phone  } from 'lucide-react'
import { IconMessage } from '@tabler/icons-react'

const Nav = () => {
  return (
    <div className='bg-yellow-400 h-20 w-100 rounded-4xl flex justify-evenly items-center text-white '>
      <Link href={'/accessibility'}>
        <Lightbulb className='scale-150 hover:scale-170 cursor-pointer'/>
      </Link>
        <Link href={'/map'}>
        <Map className='scale-150 hover:scale-170 cursor-pointer'/>
        </Link>
        <Link href={'/forum'}>
        <IconMessage className='scale-150 hover:scale-170 cursor-pointer'/>
        </Link>
        <Link href={'/contacts'}>
        <Phone className='scale-150 hover:scale-170 cursor-pointer'/>
        </Link>
    </div>
  )
}

export default Nav