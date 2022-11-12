import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({message}) => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<Circles 
			color="#ec4444"
			height="50"
			width="200"
			radius="9"
			className="m-5"
			ariaLabel = 'three-dots-loading'     
			wrapperStyle
			wrapperClass
			/>

			<p className="text-lg text-center px=2">{message}</p>
		</div>
	)
}

export default Spinner