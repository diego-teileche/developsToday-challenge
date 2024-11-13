import React from "react"

interface MainTitleProps {
	title: string
}

const MainTitle = ({ title }: MainTitleProps) => {
	return (
		<h1 className="mt-6 bg-gradient-to-br md:leading-snug leading-tight from-white to-neutral-700 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl">
			{title}
		</h1>
	)
}

export default MainTitle
