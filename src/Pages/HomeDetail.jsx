import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './HomeDetail.css'

const DataFetch = function Components(){

    //set functionality for homeDetails
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedSeason, setSelectedSeason] = useState(null);  // State to store the selected season
    const {id} = useParams();       //retrieves URL path = id

    useEffect( () =>{
        fetch(`https://podcast-api.netlify.app/id/${id}`)
        .then(response =>{
            if(!response.ok){
                throw new Error('ID details not found.')
            } return response.json()
        })
        .then((data =>{
            setData(data);
            setLoading(false);
        }))
        .catch((error => {
            setError('ID details not found.')
            setLoading(false)
            console.error('Check error', error)
        }))
    }, [id])

    if(loading){
        return <div className="loadingDiv">
                <div className="loading"></div>
                <h2>Loading...</h2>
            </div>
        
    }

    if(error){
        return <h2 className="error">{error}</h2>
    }

    //seasonID = seasons.season

    //Filter Season Button
    const handleSeasonSelect = (seasonId) => {
        if (selectedSeason === seasonId) {
            setSelectedSeason(null);  // Deselect if the same season is clicked
        } else {
            setSelectedSeason(seasonId);  // Set the selected season
        }
    };


    //Season Button
    const seasonsButton = data.seasons
                            .map(s => (
                                <button key={s.season} onClick={ () => {handleSeasonSelect(s.season)}}
                                className={selectedSeason === s.season ? 'selected' : ''}
                                > {s.title} </button>
                            ))


    const seasonsDisplay = data.seasons
                            .filter(s => selectedSeason === null || selectedSeason === s.season)
                                            .map(s => <div className="seasonsDisplay" key={s.season}>
                                                        <h3>{s.title}</h3>
                                                        <img className="seasonsImg" src={s.image} />
                                                        {/*Episodes mapped */}
                                                            {s.episodes.map(e => 
                                                            <div className="episodesBlock" key={e.episode}>
                                                                <h5>Episode {e.episode}: {e.title}</h5>
                                                                <p>{e.description}</p>
                                                                <audio controls>
                                                                    <source src={e.file} type="audio.mpeg" />
                                                                </audio>
                                                            </div>)}
                                                    </div>)
                                                    
    //Return values
    return(
        <div className="homeDetails">
            <div className="detailsHeading">
                <img src={data.image} alt={data.title} />
                <h1>{data.title}</h1>
            </div>
            <p className="desciption">{data.description}</p>
            <div className="seasonButtonsBlock">{seasonsButton}</div>
            {seasonsDisplay}
        </div>
    )
}

function HomeDetail(){
    return(
        <DataFetch />
    )
}

export default HomeDetail