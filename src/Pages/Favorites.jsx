import { useEffect, useState } from "react";

const DisplayFavorites = ( { favorites }) =>{

    return(
            <div className="favoritesPage">
                <h2>Your Favorite Episodes</h2>
                {favorites.length === 0 ? ( <p>No Favourites yet</p>) : (
                    <div className="favouritesList">
                        {favorites.map((f)=>(
                        <div key={f.title} className="favoritesItem">
                            <h5>Episode {f.episode}: {f.title}</h5>
                            <p>{f.description}</p>
                            <audio controls>
                                <source src={f.file} type="audio/mpeg" />
                            </audio>
                        </div>
                    ))}
                    </div>
                )}
            </div>)
    
}

function Favorites({favorites}){
    return <DisplayFavorites favorites={favorites} />
}

export default Favorites