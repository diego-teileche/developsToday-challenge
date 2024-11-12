"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PopulationData {
	year: number
	value: number
}

interface BorderCountry {
	commonName: string
}
interface CountryDetails {
	commonName: string
	officialName: string
	countryCode: string
	region: string
	borderCountries: { borders: BorderCountry[] }
	populationData: PopulationData[]
	flagData: string | null
}

export default function CountryInfo() {
	const pathname = usePathname()
	const countryCode = pathname.split("/").pop()
	const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(
		null
	)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCountryDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/country-details/${countryCode}`
				)
				console.log("Response: ", response)

				if (!response.ok) throw new Error("Failed to fetch country details")

				const data = await response.json()
				setCountryDetails(data)
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message)
				} else {
					setError("An unknown error occurred")
				}
			}
		}

		if (countryCode) {
			fetchCountryDetails()
		} else {
			console.log("countryCode is null or undefined")
		}
	}, [countryCode])

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!countryDetails) {
		return <div>Loading...</div>
	}
	console.log("country details: ", countryDetails)
	const borderCountries = countryDetails.borderCountries.borders

	return (
		<div className="flex items-center flex-col gap-5 py-10">
			<h1>{countryCode} Details</h1>
			<div>
				<h2>Border Countries</h2>
				<ul>
					{Array.isArray(borderCountries) && borderCountries.length > 0 ? (
						borderCountries.map((borderCountry) => (
							<li key={borderCountry.commonName}>{borderCountry.commonName}</li>
						))
					) : (
						<li>No border countries available</li>
					)}
				</ul>
			</div>
			<div>
				<h2>Population Data</h2>
				<ul>
					{Array.isArray(countryDetails.populationData) &&
					countryDetails.populationData.length > 0 ? (
						countryDetails.populationData.map((population, index) => (
							<li key={index}>{`${population.year}: ${population.value}`}</li>
						))
					) : (
						<li>No population data available</li>
					)}
				</ul>
			</div>
			<div>
				<h2>Flag</h2>
				{countryDetails.flagData ? (
					<Image
						src={countryDetails.flagData}
						alt={`${countryDetails.commonName} Flag`}
						width={300}
						height={200}
					/>
				) : (
					<p>No flag available</p>
				)}
			</div>
		</div>
	)
}
