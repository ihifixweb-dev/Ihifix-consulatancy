import { MessageCircle, Phone } from 'lucide-react'
import { contact } from '@/lib/content'

export function MobileContactBar() {
  return (
    <div className="mobile-bar fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-1.5 rounded-full bg-white/90 p-1.5 shadow-[0_18px_40px_-16px_rgba(5,20,90,0.45)] ring-1 ring-black/5 backdrop-blur-xl lg:hidden">
      <a href={contact.phoneHref} className="btn btn-ghost btn-sm h-12 bg-white" aria-label={`Call us on ${contact.phone}`}>
        <Phone aria-hidden="true" className="size-4 text-primary" />
        Call us
      </a>
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm h-12">
        <MessageCircle aria-hidden="true" className="size-4" />
        WhatsApp
      </a>
    </div>
  )
}
