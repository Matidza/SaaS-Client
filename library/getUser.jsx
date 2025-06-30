

export  function getUserFromLocalStorage() {
    const accessToken =  localStorage.getItem("accesstoken")?.value
    if (accessToken) {
        try {
            const decodecCode = jwt.verify(accessToken, )
            return decodecCode
        } catch(error) {
            return null
        }
    }
}