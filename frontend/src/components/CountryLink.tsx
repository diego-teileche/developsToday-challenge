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
      className="flex size-full items-center justify-center rounded-lg border border-neutral-600 px-3 py-2 hover:bg-neutral-500"
    >
      {countryName}
    </Link>
  )
}

export default CountryLink
