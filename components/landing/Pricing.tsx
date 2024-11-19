import { Home, CheckCircle } from 'lucide-react'
import SubscriptionOption from './SubscriptionOption'

export default function Pricing() {
  return (
    <section className="py-12 md:py-24 bg-[#37B7C0]" id="pricing">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Nos forfaits d'abonnement</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <SubscriptionOption
            title="2 Pièces"
            price="900 DH/mois"
            description="Parfait pour les petits appartements. Comprend un nettoyage en profondeur bimensuel et des retouches hebdomadaires."
          />
          <SubscriptionOption
            title="3 Pièces"
            price="1100 DH/mois"
            description="Idéal pour les espaces plus grands. Comprend un nettoyage en profondeur hebdomadaire et des retouches en milieu de semaine."
          />
        </div>
      </div>
    </section>
  )
}