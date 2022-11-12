import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'
import jwt_decode from 'jwt-decode'

import { client } from '../client'

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {
	const navigate = useNavigate()
	// const responseGoogle = (response) => {
	// 	console.log(response)
	// }
	const handleCallbackResponse = (response) => {
		const userObjects = jwt_decode(response.credential)

		/* store userObjects in localstorage */
		localStorage.setItem('user', JSON.stringify(userObjects))

		const name = `${userObjects.given_name} ${userObjects.family_name}`;
		const googleId = userObjects.sub
		const imageUrl = userObjects.picture

		/* create document for the user on sign in */
		const doc = {
			_id: googleId,
			_type: 'user',
			userName: name,
			image: imageUrl
		}
		
		/* create new document for the user if it doesnt exist in the databasee*/
		client.createIfNotExists(doc)
		.then(() => {
			navigate('/', {replace: true})
		})
	}

	useEffect(() => {
		const google = window.google
		/* Global Google */
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
			callback: handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{theme: 'outline', size: 'large'}
		)
	}, [])


	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className="relative w-full h-full">
				<video 
				src={shareVideo} 
				type="video/mp4"
				loop
				controls={false}
				muted
				autoPlay
				className='w-full h-full object-cover'
				/>

				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
					<div className="p-5">
						<img src={logo} width='130px' alt='logo' />
					</div>

					<div id="signInDiv" className="shadow-2xl">
						<GoogleLogin 
							render={(renderProps) => (
								<button
								type="button"
								className="bg-mainColor flex justify-ceenter items-center p-3 rounded-lg cursor-pointer outline-none"
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								>
									<FcGoogle className='mr-4'/>
									Sign in with Google		
								</button>
							)}
							onSuccess={handleCallbackResponse}	
							onFailure={handleCallbackResponse}
							cookiePolicy='single_host_origin'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;