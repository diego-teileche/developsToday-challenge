import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const Header = () => {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-20 py-5 backdrop-blur-md">
      <nav className="flex justify-center">
        <ul className="flex items-center gap-14 md:gap-24 lg:gap-48">
          <li className="text-base font-semibold text-neutral-300 hover:text-white">
            <button onClick={() => router.back()}>Back</button>
          </li>
          <li className="text-base font-semibold text-neutral-300 hover:text-white">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
