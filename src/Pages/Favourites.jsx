import { useEffect, useState } from "react";

const DisplayFavorites = () =>{
    const [favorites, setFavorites] = useState([])  //set functionality
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect( ()=>{
        const storedFavorites = JSON.parse(localStorage.getItem('Favorites:'))

        if(storedFavorites){
            try {
                setFavorites(storedFavorites)
            } catch(error){
                setError("Error cannot parse favorites data")
                setLoading(false)
            }   } 
            else {
                setError("No favorites data was found in localStorage.")
                setLoading(false)
            }
    }, [])

    if(loading){
        return <div className="loadingDiv">
                    <div className="loading"></div>
                    <h2>Loading...</h2>
                </div>
    }

    if(error){
        return <h1>{error}</h1>
    }
    

    //there are no favourites 
    if(favorites.length === 0){
        return <h1>User has no favorite episodes yet.</h1>
    }

    return(
            <div className="favoritesBox">
                <h2>Your Favorite Episodes</h2>
                    {favorites.map((e, index)=>(
                        <div key={index} className="favoritesItem">
                            <h5>Episode {e.episode}: {e.title}</h5>
                            <p>{e.description}</p>
                            <audio controls>
                                <source src={e.file} type="audio.mpeg" />
                            </audio>
                        </div>
                    ))}
            </div>)
    
}

function Favorites(){
    return <DisplayFavorites />
}

export default Favorites