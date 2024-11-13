import React from "react"

interface SecondaryTitleProps {
	title: string
}

const SecondaryTitle = ({ title }: SecondaryTitleProps) => {
	return (
		<h2 className="mt-6 bg-gradient-to-br md:leading-snug leading-tight from-white to-neutral-700 bg-clip-text text-2xl font-bold tracking-tighter text-transparent md:text-3xl">
			{title}
		</h2>
	)
}

export default SecondaryTitle
