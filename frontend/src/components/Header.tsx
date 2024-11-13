import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const Header = () => {
	const router = useRouter()

	return (
		<header className="sticky top-0 py-5 z-20 backdrop-blur-md">
			<nav className="flex justify-center">
				<ul className="flex items-center gap-14 md:gap-24 lg:gap-48">
					<li className="text-base text-neutral-300 hover:text-white font-semibold">
						<button onClick={() => router.back()}>Back</button>
					</li>
					<li className="text-base text-neutral-300 hover:text-white font-semibold">
						<Link href="/">Home</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
