import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GenreComponent = () =>{

        //set functionality
        const [data, setData] = useState([]) //set it as an array
        const [loading, setLoading] = useState(true) //set to true until its not = notLoading
        const [error, setError] = useState("") //empty string because a string will be entered here
        const {id} = useParams();
    
        useEffect( ()=> {
            fetch(`https://podcast-api.netlify.app/genre`)
                .then((response)=>{
                    if(!response.ok){
                        throw new Error('Genre is not being fethced')
                    } return response.json()
                })
                .then((data)=>{
                    setData(data)
                    setLoading(false)
                })
                .catch((error)=>{
                    setLoading(false)
                    console.error('Genre error here', error)
                })
        }, [])

        if(loading){
            return <div className="loadingDiv">
                    <div className="loading"></div>
                    <h2>Loading...</h2>
                </div>
            
        }
    
        if(error){
            return <h2 className="error">{error}</h2>
        }
    

    //genreDisplay
    const genreDisplay = genres.map(g => <div className="genreButtons" key={g.id}>
                                            <Link to={g.id} ><button>{g.title}</button></Link>
                                        </div>)
    
    //console.log(genreDisplay)


    return(
        {genreDisplay}
    )
}

function Genres() {

    return(
        {GenreComponent}
    )
}

export default Genres;
