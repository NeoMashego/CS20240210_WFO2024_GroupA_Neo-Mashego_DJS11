import { useEffect, useState } from "react";

const displayFavourites = () =>{
    const [favorites, setFavorites] = useState([])  //set functionality
    const [error, setError] = useState("")

    useEffect( ()=>{
        const storedFavorites = localStorage.getItem('Favorites:')

        if(storedFavorites){
            setFavorites(JSON.parse(storedFavorites))
        }
        
    }, [])

    //there are no favourites 
    if(favorites.length === 0){
        return <h1>User has no favorite episodes yet.</h1>
    }

    const display = <div className="favoritesBox">
                                <h2>Your Favorite Episodes</h2>
                                <ul>
                                    {favorites.map((e, index)=>(
                                        <div key={index} className="favoritesItem">
                                            <h5>Episode {e.episode}: {e.title}</h5>
                                                <p>{e.description}</p>
                                                <audio controls>
                                                    <source src={e.file} type="audio.mpeg" />
                                                </audio>
                                        </div>
                                    ))}
                                </ul>
                            </div>

    return(
        {display}
    )
    
}

function Favorites(){
    {displayFavourites}
}

export default Favorites