function login(credentials){
    return fetch( this.baseUrl+'/auth/login',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    })
    .then(res => res.json())
}

export default login;