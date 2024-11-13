import Link from "next/link"
import React from "react"

interface countryLinkProps {
	countryName: string
	key: string
	href: string
}

const CountryLink = ({ countryName, key, href }: countryLinkProps) => {
	return (
		<li
			key={key}
			className="border border-neutral-600 rounded-lg flex items-center justify-center hover:bg-neutral-500"
		>
			<Link
				href={`/country/${href}`}
				className="size-full flex justify-center px-3 py-2"
			>
				{countryName}
			</Link>
		</li>
	)
}

export default CountryLink
