function query(query){
    return fetch( this.baseUrl+'/graphql',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({
            query
        })
    })
    .then(res => res.json())
} 

export default query;