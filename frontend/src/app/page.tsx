"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CountryProps {
	countryCode: string
	name: string
}

export default function Home() {
	const [countries, setCountries] = useState<CountryProps[]>([])
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch("http://localhost:4000")

				if (!response.ok) throw new Error("Failed to fetch countries")

				const data = await response.json()
				setCountries(data)
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message)
				} else {
					setError("An unknown error occurred")
				}
			}
		}

		fetchCountries()
	}, [])

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<main className="flex flex-col items-center py-10 gap-5">
			<h1 className="text-4xl font-bold pb-5">List of Countries</h1>
			<ul className="grid grid-cols-4 gap-5">
				{countries.map((country) => (
					<li key={country.countryCode}>
						<Link href={`/country/${country.countryCode}`}>{country.name}</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
