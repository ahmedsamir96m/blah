import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import { userQuery } from '../utils/data'
import logo from '../assets/logo.png'

import Pins from './Pins'
import Footer from '../components/Footer'


const Home = () => {
	const [user, setUser] = useState(null)
	const [toggleSidebar, setToggleSidebar] = useState(false)
	const scrollRef = useRef(null)
	const navigate = useNavigate()
	const userInfo = localStorage.getItem('user') !== undefined || null ?
		JSON.parse(localStorage.getItem('user')) 
		: 
		localStorage.clear()


	useEffect(() => {
		if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null) {
			navigate('/login')
		}
	})

	useEffect(() => {
		const query = userQuery(userInfo?.sub);
		client.fetch(query)
		.then((data) => {
			setUser(data[0])
		})
	} ,[])

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0)
	}, [])

	return (
		<>
			<div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration=75 ease-out'>
			<div className="hidden md:flex h-screen flex-initial">
				<Sidebar user={user && user}/>
			</div>

			<div className="flex md:hidden">
				<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
					<Link to='/'>
						<img src={logo} alt="Logo" className='w-28'/>
					</Link>
					<Link to={`user-profile/${user?._id}`}>
						<img src={user?.image} alt="Logo" className='w-24 rounded-lg'/>
					</Link>
				</div>
			</div>

			{toggleSidebar && (
				<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
					<div className="absolute w-full flex justify-end items-center p-2">
						<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
					</div>
					<Sidebar user={user && user} closeToggle={setToggleSidebar}/>
				</div>
			)}

				<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
					<Routes>
						<Route path='/user-profile/:userId' element={<UserProfile />}/>
						<Route path='/*' element={<Pins user={user && user} />}/>
					</Routes>
				</div>
			</div>		
			<Footer />
		</>
	)
}

export default Home
