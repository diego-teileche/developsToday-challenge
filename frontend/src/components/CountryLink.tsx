import Link from "next/link"
import React from "react"

interface countryLinkProps {
	countryName: string
	href: string
}

const CountryLink = ({ countryName, href }: countryLinkProps) => {
	return (
		<Link
			href={`/country/${href}`}
			className="size-full border border-neutral-600 hover:bg-neutral-500 items-center rounded-lg flex justify-center px-3 py-2"
		>
			{countryName}
		</Link>
	)
}

export default CountryLink
