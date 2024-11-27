import { useEffect, useState } from "react"
import {Link, useSearchParams} from "react-router-dom"
import Genres from "../assets/Genres"
import './Home.css'

const FetchData = function myCompound(){
   
    //set functionality for Home page
    const [data, setData] = useState([]);               //set to hold data functionality
    const [loading, setLoading] = useState(true)        //set loading functionality
    const [error, setError] = useState("");             //set error functionality
    const [selectGenre, setSelectGenre] = useState(null)   //set to store selected genre
    const [searchParams, setSearchParams] = useSearchParams()

    //get genre filter from the searchParams
    const genreFilter = searchParams.get("genre");

    //Fetch podcast data
    useEffect( () =>{
        fetch('https://podcast-api.netlify.app/')
        .then(response =>{
            if(!response.ok){
                throw new Error('Podcast failed to load.')
            }
            return response.json()})            //return response converted to json
        .then((data) => {

            // Sort the podcasts alphabetically by title
            const sortedData = data.sort((a, b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())});    // Ensure case-insensitive comparison
            
            // Filter podcasts by genre if a genre is selected
            //const filteredData = genreFilter ? sortedData.filter(d => d.genre === genreFilter) : sortedData;
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


    /*handle genres selection
    const handleGenreSelect = (genreID) => {
        // Update the URL with the selected genre
        setSearchParams({ genre: genreID });}

    //Season Button
    const genresButton = data.genres
    .map(g => (
        <button key={g.id} onClick={ () => {handleGenreSelect(g.id)}}
        className={selectGenre === g.id ? 'selected' : ''}
        > {g.title} </button>
    ))*/


    //displaying podcast
    const displayDataFetched = <div className="podcast">     {/* styling the entire div */}
                                                {data.map(d =>
                                                    <div className="podcastBlock" key={d.id}>
                                                        <Link to={`/${d.id}`} >
                                                            <img className="podcastImg" src={d.image} alt={d.title} />
                                                            <div className="podcastDesc">{d.title}</div>
                                                        </Link>
                                                </div>)}
                                                </div>

                                                console.log(data)
                        
    
/*    const genresList = <div>
                            <Link to="genre/1">Personal Growth</Link>
                            <Link to="genre/2">Investigative Journalism</Link>
                            <Link to="genre/3">History</Link>
                            <Link to="genre/4">Compedy</Link>
                            <Link to="genre/5">Entertainment</Link>
                            <Link to="genre/6">Business</Link>
                            <Link to="genre/7">Fiction</Link>
                            <Link to="genre/8">News</Link>
                            <Link to="genre/9">Kids and Family</Link>
                        </div>*/
                        
    return(
        <div className="homePage">
            <h1>Podcast</h1>
            {displayDataFetched}
        </div>
    )
}

function Home(){
    return(< FetchData/>)
}

export default Home