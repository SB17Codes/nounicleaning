import TestimonialCard from './TestimonialCard'

export default function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-white" id="testimonials">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Ce que disent nos clients</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="CleanBnB a révolutionné mon activité Airbnb. Mes invités commentent toujours la propreté de l'espace !"
            author="Sarah K., Superhôte Airbnb"
          />
          <TestimonialCard
            quote="J'adore la flexibilité de leur service. Il s'adapte parfaitement à mon planning Airbnb variable."
            author="Mohammed L., Gestionnaire immobilier"
          />
          <TestimonialCard
            quote="L'attention aux détails est impressionnante. Ils remarquent des choses auxquelles je ne penserais même pas !"
            author="Amina R., Propriétaire de location de vacances"
          />
        </div>
      </div>
    </section>
  )
}