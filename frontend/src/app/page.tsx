"use client"
import CountryLink from "@/components/CountryLink"
import MainTitle from "@/components/MainTitle"
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
		<main className="flex justify-center py-10">
			<section>
				<div className="container">
					<div className="flex flex-col items-center gap-10">
						<MainTitle title="List of Countries" />

						<ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-5">
							{countries.map((country) => (
								<CountryLink
									key={country.countryCode}
									href={country.countryCode}
									countryName={country.name}
								/>
							))}
						</ul>
					</div>
				</div>
			</section>
		</main>
	)
}
