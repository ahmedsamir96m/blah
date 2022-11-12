import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { client } from '../client'
import {MasonryLayout, Spinner} from '../components'
import { feedQuery, searchQuery } from '../utils/data'

const Feed = () => {
	const [loading, setLoading] = useState(false)
	const [pins, setPins] = useState(null)
	const { categoryId } = useParams();
	const navigate = useNavigate()

	/* Fetching Posts from Database using Sanity Query Lang */
	useEffect(() => {
		if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null) {
			navigate('/login')
		}
		setLoading(true);

		if(categoryId) {
			const query = searchQuery(categoryId)

			client.fetch(query)
			.then((data) => {
				setPins(data)
				setLoading(false)
			})
		} else {
			client.fetch(feedQuery)
			.then((data) => {
				setPins(data)
				setLoading(false)
			})
		}
	}, [categoryId, navigate])

	if(loading) return <Spinner message="We are adding new ideas to your feed!"/>
	if(!pins?.length) return <h2>No Pins Available</h2>
	return (
		<div>
			{pins && <MasonryLayout pins={pins}/>}
		</div>
	)
}

export default Feed