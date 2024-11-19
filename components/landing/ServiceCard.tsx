interface ServiceCardProps {
    title: string
    description: string
    icon: React.ReactNode
  }
  
  export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
    return (
      <div className="bg-[#F4F4F4] rounded-lg p-6 shadow-lg">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
        <p className="text-center">{description}</p>
      </div>
    )
  }