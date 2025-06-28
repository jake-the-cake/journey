'use client'

import { useEvents } from '@/features/events/context'
import { useEffect, useState } from 'react'

interface HasIsLoaded {
  isLoaded: boolean
}

interface LoaderProps {
  id: string
  loads: string[]
}

const loading = 'Loading...'

export default function Loader({ id, loads }: LoaderProps) {
  const [text, setText] = useState('')
  const { events } = useEvents()

  // Map of available loadable objects
  const loadable: Record<string, HasIsLoaded> = {
    events
  }

  // Get the actual objects to check
  const checkLoads: HasIsLoaded[] = loads
    .map(load => loadable[load])
    .filter(Boolean)

  // Effect to show/hide loader based on isLoaded status
  useEffect(() => {
    const loader = document.getElementById(id)
    if (!loader) return

    const allLoaded = checkLoads.every(load => load.isLoaded)
    if (allLoaded) loader.classList.add('hide')
    else loader.classList.remove('hide')
  }, [id, ...checkLoads.map(load => load.isLoaded)])

  // Animated loading text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => {
        if (prev === loading) return ''
        return prev + loading[prev.length]
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='loader' id={id}>{text}</div>
  )
}