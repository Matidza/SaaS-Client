'use client'

import Link from "next/link"
import SignOutButton from "../../auth/signout/page"
import { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/check-auth', {
          credentials: 'include', // send HttpOnly cookies
        })

        const data = await res.json()
        if (res.ok && data.success) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return null // or <Spinner animation="border" size="sm" />

  return (
    <Navbar bg="white" className="shadow-sm w-auto" expand="lg">
      <Container>
        <Link href="/AUTH_MICROSERVICE/"><h1 className="fs-2 fw-bolder text-black decoration-none">Project:<span className="text-primary text-wrap">17</span> </h1></Link>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto ">
            {!isAuthenticated ? (
              <>
                <Link href="/auth/signin" className="px-2"> 
                  <button  className="btn btn-white btn-sm border rounded-pill text-black border-1 border-dark fw-light">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup-as-professional" >
                  <button className="btn btn-white btn-sm border rounded-pill text-white border-1 bg-dark border-dark fw-light">
                  Join as Professional
                  </button>
                </Link>        
              </>
            ) : (
              <>
                <Link href="/auth/allData" className="text-sm text-black fs-5 px-2 fw-light">data</Link>
                <Link href="/auth/change-password" className="text-sm fs-5 px-2 text-muted fw-light">update password</Link>
                <SignOutButton />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
