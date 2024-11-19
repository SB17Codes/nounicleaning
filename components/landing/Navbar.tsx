"use client"

import { Sparkles } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  RedirectToSignIn
} from "@clerk/nextjs";
import NavLink from "./NavLink";
import RedirectToDashboard from "@/app/(root)/redirect/page";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="flex items-center justify-between gap-4 bg-white h-16 w-full px-5 text-black shadow-md">
      <section>
        <Link href="/" className="flex gap-2" aria-label="Accueil Nouni Cleaning">
          <Sparkles size={32} />
          <span className="text-2xl font-bold">Nouni Cleaning</span>
        </Link>
      </section>

      <section className="hidden md:flex gap-4">
        <SignedOut>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#about">À propos</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </SignedOut>
      </section>

      <section className="flex gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="p-2 bg-white text-black rounded-md hover:bg-gray-200">
            <a href="/sign-in">
              Connexion
            </a>
          </div>
          <div className="p-2 bg-white text-black rounded-md hover:bg-gray-200">
            <a href="/sign-up">Créer un compte</a>
          </div>
        </SignedOut>
      </section>
    </nav>
  );
}