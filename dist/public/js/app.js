const heading = document.querySelector('#username-heading')

async function getUsername(){
    const res = await fetch('http://localhost:4000/check')
    const data = await res.json()
    return data.username
}

async function render(){
    const username = await getUsername()
    heading.innerHTML = `Welcome ${username}`
}

render()