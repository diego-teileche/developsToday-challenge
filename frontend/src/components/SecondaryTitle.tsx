import React from "react"

interface SecondaryTitleProps {
  title: string
}

const SecondaryTitle = ({ title }: SecondaryTitleProps) => {
  return (
    <h2 className="mt-6 bg-gradient-to-br from-white to-neutral-700 bg-clip-text text-2xl font-bold leading-tight tracking-tighter text-transparent md:text-3xl md:leading-snug">
      {title}
    </h2>
  )
}

export default SecondaryTitle
