import { Home, CheckCircle, Link, OctagonX } from 'lucide-react'

interface SubscriptionOptionProps {
  title: string
  price: string
  description: string
}

export default function SubscriptionOption({ title, price, description }: SubscriptionOptionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Home className="text-[#0196A1] mr-2" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-3xl font-bold mb-4 text-[#56CA00]">{price}</p>
      <p className="mb-4">{description}</p>
      <ul className="mb-6">
        <li className="flex items-center mb-2">
          <CheckCircle className="text-[#56CA00] mr-2" />
          <span>9 interventions par mois</span>
        </li>
        <li className="flex items-center mb-2">
          <OctagonX className="text-[#ff0000] mr-2" />
          <span>Produit inclus</span>
        </li>
        <li className="flex items-center">
          <CheckCircle className="text-[#56CA00] mr-2" />
          <span>Réservations 24h à l'avance</span>
        </li>
      </ul>
       <button className="w-full bg-[#0196A1] text-white font-bold py-2 px-4 rounded hover:bg-[#37B7C0] transition duration-300">
        <a href="/sign-up" className='w-full'>       
         Commencez Maintenant
        </a>
      </button>
    </div>
  )
}