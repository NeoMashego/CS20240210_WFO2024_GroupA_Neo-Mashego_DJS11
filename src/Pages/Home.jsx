import { useEffect, useState } from "react"
import {Link, useSearchParams} from "react-router-dom"
import Genres from "../assets/Genres"
import './Home.css'

const FetchData = function myCompound(){
   
    //set functionality for Home page
    const [data, setData] = useState([]);               //set to hold data functionality
    const [loading, setLoading] = useState(true)        //set loading functionality
    const [error, setError] = useState("");             //set error functionality

    //Fetch podcast data
    useEffect( () =>{
        fetch('https://podcast-api.netlify.app/')
        .then(response =>{
            if(!response.ok){
                throw new Error('Podcast failed to load.')
            }
            return response.json()})            //return response converted to json
        .then((data) => {
            console.log(data)
            // Sort the podcasts alphabetically by title
            const sortedData = data.sort((a, b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())});    // Ensure case-insensitive comparison

            setData(sortedData);
            setLoading(false);
        })
        .catch((error) =>{
            setError('Podcast failed to load.')
            setLoading(false);
            console.error(error)
        })
    }, [])      //empty dependency array ensures it runs only once after the component mounts


    //if statements for conditions set
    if (loading) {
        return <div className="loadingDiv">                           {/*Display loading message while fetching*/}
                <div className="loading"></div>
                <h2>Loading...</h2>
            </div> 
      }

    if(error){
        return <h1 className="error">{error}</h1>
    }


        const dateString = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }

    //displaying podcast
    const displayDataFetched = <div className="podcast">     {/* styling the entire div */}
                                                {data.map(d =>
                                                    <div className="podcastBlock" key={d.id}>
                                                        <Link to={`/${d.id}`} >
                                                            <img className="podcastImg" src={d.image} alt={d.title} />
                                                            <div className="podcastDesc">{d.title}</div>
                                                            <div className="podcastDate">Updated: {new Date(d.updated).toLocaleString('en-GB', dateString)}</div>
                                                        </Link>
                                                </div>)}
                                                </div>
                        
                        
    return(
        <div className="homePage">
            <h1>Podcast</h1>
            < Genres/>
            {displayDataFetched}
        </div>
    )
}

function Home(){
    return(< FetchData/>)
}

export default Home