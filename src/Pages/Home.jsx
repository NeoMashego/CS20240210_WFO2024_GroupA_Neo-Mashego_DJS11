import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

const FetchData = function myCompound(){
    const [data, setData] = useState([]);               //set data functionality
    const [error, setError] = useState("");             //set error functionality

    useEffect( () =>{
        fetch('https://podcast-api.netlify.app/')
        .then(response =>{
            if(!response.ok){
                throw new Error('Podcast failed to load.')
            }
            return response.json()})            //return response converted to json
        .then((data) => {
             
            const sortedData = data.sort((a, b) => {            // Sort the podcasts alphabetically by title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())});    // Ensure case-insensitive comparison
            setData(sortedData);
        })
        .catch((error) =>{
            setError('Podcast failed to load.')
            //console.error(error)
        })
    }, [])      //empty dependency array ensures it runs only once after the component mounts

    if(error){
        return <h1>{error}</h1>
    }

    const displayDataFetched = data.map(d => <div key={d.id}>
                                                    <Link to={`/${d.id}`} >
                                                    <p>{d.title}</p>
                                                    </Link>
                                                </div>)
                        
    return(
        <div>
            <h1>Podcast</h1>
            {displayDataFetched}
        </div>
    )
}

function Home(){
    return(< FetchData/>)
}

export default Home