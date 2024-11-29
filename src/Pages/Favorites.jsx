import { useEffect, useState } from "react";

const DisplayFavorites = ( { favorites, setFavorites }) =>{

    const filterAndSortFavorites = (sortOption) => {
        let sortedFavorites;

        switch(sortOption) {
            case "most-recent":
                // Sort by the most recent (latest added)
                sortedFavorites = [...favorites].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case "least-recent":
                // Sort by the least recent (oldest added)
                sortedFavorites = [...favorites].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
                break;
            case "a-z":
                // Sort alphabetically by title (A-Z)
                sortedFavorites = [...favorites].sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "z-a":
                // Sort alphabetically by title (Z-A)
                sortedFavorites = [...favorites].sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                sortedFavorites = [...favorites];
                break;
        }

        setFavorites(sortedFavorites);
    }

    const removeAllFavorites = () => {
        setFavorites([]);  // Clear the favorites state
        localStorage.setItem('Favorites', JSON.stringify([]));  // Update localStorage as well
    }

    return(
            <div className="favoritesPage">
                <h1>Your Favorite Episodes</h1>
                <div className="filter-buttons">
                    <button onClick={() => filterAndSortFavorites("most-recent")}>Most Recent</button>
                    <button onClick={() => filterAndSortFavorites("least-recent")}>Least Recent</button>
                    <button onClick={() => filterAndSortFavorites("a-z")}>A-Z</button>
                    <button onClick={() => filterAndSortFavorites("z-a")}>Z-A</button>
                    <button onClick={removeAllFavorites}>Remove All</button>
                </div>
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

function Favorites({favorites, setFavorites}){
    return <DisplayFavorites favorites={favorites} setFavorites={setFavorites} />
}

export default Favorites