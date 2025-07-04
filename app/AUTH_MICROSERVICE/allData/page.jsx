'use server'
import React from "react"


export default async function Page() {
	const response = await fetch('http://localhost:8000')
	const result = await response.json()
	
	return (
	    <div>
			<h1>All Members</h1>
			<ul>
				{result.map((member) => {
					return (
						`${member.email}`
					)
				})}
			</ul>

		</div>
	)
}