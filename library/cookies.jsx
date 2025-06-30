'use server'

import { cookies } from 'next/headers'
import result from '../app/signin/page'

export default async function theCookies() {

    //const token = localStorage.getItem('accessToken')
    
    cookies().set("Initia", result.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
        secure: true
    })
}