async function getProducts() {
    const res = await fetch("https://dummyjson.com/products")
    return res.json()
}
   
async function getArtistAlbums(username: string) {
const res = await fetch(`https://api.example.com/artist/${username}/albums`)
return res.json()
}