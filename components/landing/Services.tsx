import { Sparkles, Home, CheckCircle } from 'lucide-react'
import ServiceCard from './ServiceCard'

export default function Services() {
  return (
    <section className="py-12 md:py-24 bg-white" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Nettoyage en profondeur"
            description="Nettoyage complet de toutes les zones, y compris les endroits difficiles d'accès."
            icon={<Sparkles className="h-12 w-12 text-[#56CA00]" />}
          />
          <ServiceCard
            title="Produits écologiques"
            description="Nous utilisons des produits de nettoyage respectueux de l'environnement pour une maison plus saine."
            icon={<Home className="h-12 w-12 text-[#56CA00]" />}
          />
          <ServiceCard
            title="Horaires flexibles"
            description="Choisissez des heures de nettoyage qui correspondent à votre planning de réservation Airbnb."
            icon={<CheckCircle className="h-12 w-12 text-[#56CA00]" />}
          />
        </div>
      </div>
    </section>
  )
}