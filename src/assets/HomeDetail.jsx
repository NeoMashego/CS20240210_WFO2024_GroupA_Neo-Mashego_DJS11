import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const DataFetch = function Components(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
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
        }))
    })

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <h2>{error}</h2>
    }

    const seasonsDisplay = data.seasons.map(s => <div key={s.s}>
                                                        <h3>{s.title}</h3>
                                                        <div>
                                                            {s.episodes.map(e => 
                                                            <div key={e.e}>
                                                                <h5>Episode {e.e}: {e.title}</h5>
                                                                <p>{e.description}</p>
                                                            </div>)}
                                                        </div>
                                                    </div>)

    return(
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <div>{seasonsDisplay}</div>
        </div>
    )
}

function HomeDetail(){
    return(
        <DataFetch />
    )
}

export default HomeDetail