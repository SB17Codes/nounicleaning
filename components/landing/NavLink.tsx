import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link href={href} className="block py-2 text-[#191C1D] hover:text-[#56CA00] transition duration-300" onClick={onClick}>
      {children}
    </Link>
  )
}