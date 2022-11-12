import React from 'react'

const Footer = () => {
	return (
		<footer>
			<div className='flex justify-center items-center font-bold text-white bg-red-500 p-5 mt-5'>
				<span className='pr-2'>By</span>
				<a href="https://www.linkedin.com/in/ahmedsamir96m"
					className='underline text-slate-300'
				> {`Ahmed Samir - Web Developer`}</a>
			</div>
		</footer>
	)
}

export default Footer