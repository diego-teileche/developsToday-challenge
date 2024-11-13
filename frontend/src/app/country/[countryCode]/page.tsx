"use client"
import CountryLink from "@/components/CountryLink"
import Header from "@/components/Header"
import MainTitle from "@/components/MainTitle"
import PopulationChart from "@/components/PopulationChart"
import SecondaryTitle from "@/components/SecondaryTitle"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PopulationData {
	year: number
	value: number
}

interface BorderCountry {
	commonName: string
	countryCodeRef: string
}
interface CountryDetails {
	commonName: string
	borders: BorderCountry[]
	populationData: PopulationData[]
	flagUrl: string | null
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
		return (
			<section className="h-[100vh] flex justify-center items-center">
				<p>Loading...</p>
			</section>
		)
	}
	const borderCountries = countryDetails.borders

	return (
		<section className="pb-14">
			<Header />
			<div className="container">
				<div className="flex items-center flex-col gap-5">
					<div className="flex items-center gap-5 justify-center">
						<MainTitle title={countryDetails.commonName} />

						<div className="mt-3">
							{countryDetails.flagUrl ? (
								<Image
									src={countryDetails.flagUrl}
									alt={`${countryDetails.commonName} Flag`}
									width={100}
									height={60}
								/>
							) : (
								<p>No flag available</p>
							)}
						</div>
					</div>

					<div className="flex flex-col items-center py-10 gap-10">
						<SecondaryTitle title="Border Countries" />

						<ul className="flex flex-wrap max-w-[300px] md:max-w-[500px] lg:max-w-[700px] justify-center gap-5">
							{Array.isArray(borderCountries) && borderCountries.length > 0 ? (
								borderCountries.map((borderCountry) => (
									<li key={borderCountry.commonName}>
										<CountryLink
											href={borderCountry.countryCodeRef}
											countryName={borderCountry.commonName}
										/>
									</li>
								))
							) : (
								<li>No border countries available</li>
							)}
						</ul>
					</div>

					<div className="flex flex-col items-center gap-14 py-10">
						<SecondaryTitle title="Population Data" />

						<PopulationChart data={countryDetails.populationData} />
					</div>
				</div>
			</div>
		</section>
	)
}
