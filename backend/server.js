import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const port = process.env.PORT || 4000
const availableCountries = process.env.AVAILABLE_COUNTRIES_API
const bordersCountries = process.env.BORDERS_COUNTRIES_API
const populationCountries = process.env.POPULATION_COUNTRIES_API
const flagsCountries = process.env.FLAGS_COUNTRIES_API

app.use(cors())

app.get("/", async (req, res) => {
	try {
		const response = await fetch(availableCountries)

		if (!response.ok) throw new Error("Error getting countries.")

		const countries = await response.json()
		res.json(countries)
	} catch (error) {
		res.status(500).json({ error: "Error fetching countries." })
	}
})

app.get("/country-details/:countryCode", async (req, res) => {
	const countryCode = req.params.countryCode

	try {
		const [borderResponse, populationResponse, flagResponse] =
			await Promise.all([
				fetch(`${bordersCountries}/${countryCode}`),
				fetch(populationCountries),
				fetch(flagsCountries),
			])

		if (!borderResponse.ok || !populationResponse.ok || !flagResponse.ok)
			throw new Error("Error getting countries data")

		const borderCountries = await borderResponse.json()
		const populationData = await populationResponse.json()
		const flagData = await flagResponse.json()

		const countryPopulationData = populationData.data.find(
			(country) => country.code === countryCode
		)
		const countryFlagData = flagData.data.find(
			(country) => country.iso2 === countryCode
		)

		const countryDetails = {
			borders: borderCountries.map((country) => ({
				commonName: country.commonName,
			})),
			populationData: countryPopulationData
				? countryPopulationData.populationCounts.map((population) => ({
						year: population.year,
						value: population.value,
				  }))
				: [],
			flagUrl: countryFlagData ? countryFlagData.flag : null,
		}

		res.json(countryDetails)
	} catch (error) {
		res.status(500).json({ error: "Error fetching countryCode info." })
	}
})

app.listen(port, () => console.log(`Server running on port: ${port}`))
