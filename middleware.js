import { NextResponse } from 'next/server'
import checkAuth from './app/actions/checkAuth'

export async function middleware(request) {
    
    const {isAuthenicated} = await checkAuth()

    if(!isAuthenicated){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
    
}

export const config = {
    matcher: ['/bookings', '/rooms/add', '/rooms/my']
}