interface TestimonialCardProps {
    quote: string
    author: string
  }
  
  export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
    return (
      <div className="bg-[#F4F4F4] rounded-lg p-6 shadow-lg">
        <p className="mb-4 italic">"{quote}"</p>
        <p className="font-bold text-right">- {author}</p>
      </div>
    )
  }