const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError(null)
    setPasswordError(null)
    setSuccessMessage(null)

    try {
        const response = await fetch('http://localhost:8000/api/auth/signin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const result = await response.json()

        if (response.ok) {
            // ✅ Save the token to localStorage
            localStorage.setItem('accessToken', result.accessToken)

            setSuccessMessage("🎉 Logged in successfully! Redirecting...")
            //setTimeout(() => router.push('/dashboard'), 2000)
        } else {
            if (result.field === 'email') {
                setEmailError(result.message)
            } else if (result.field === 'password') {
                setPasswordError(result.message)
            } else {
                alert(result.message)
            }
        }
    } catch (err) {
        alert("Something went wrong. Please try again.")
        console.error("Signin Error:", err.message)
    }
}
