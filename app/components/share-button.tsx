import { useState } from 'react'
import { RetroButton } from './retro-elements'
import { Share2 } from 'lucide-react'

export function ShareButton() {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Vote for the next song!',
      text: 'Help choose the next song for the stream!',
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        console.error('Error copying to clipboard:', err)
      }
    }
  }

  return (
    <RetroButton onClick={handleShare} className="flex items-center space-x-2">
      <Share2 className="w-5 h-5" />
      <span>{shared ? 'Shared!' : 'Share'}</span>
    </RetroButton>
  )
}

