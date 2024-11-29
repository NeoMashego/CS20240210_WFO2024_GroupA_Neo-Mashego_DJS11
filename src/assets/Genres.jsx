import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Genres.css'

const Genres = () => {
    // State hooks for data, loading, and error
    const [data, setData] = useState([]); // For storing genres
    const [loading, setLoading] = useState(true); // Set to true until data is fetched
    const [error, setError] = useState(""); // Error handling state

    const [selectedGenre, setSelectedGenre] = useState(null)
    const [filteredGenre, setFilteredGenre] = useState([])
    const { id } = useParams(); // Get the id from URL params (though not used in this case)

    const url = "https://podcast-api.netlify.app/";

    const genreMap = {
        1: "Personal Growth",
        2: "Investigative Journalism",
        3: "History",
        4: "Comedy",
        5: "Entertainment",
        6: "Business",
        7: "Fiction",
        8: "News",
        9: "Kids and Family",
    }

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                //setLoading(true); // Set loading to true before starting fetch
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error("Genre Not Found"); // Handle fetch errors
                }

                const previews = await response.json();
                let genresSet = new Set(); // Use a Set to collect unique genres

                // Loop through the data and add each genre to the Set
                for (let preview of previews) {
                    // Check if preview.genres is an array and loop through its items
                    if (Array.isArray(preview.genres)) {
                        preview.genres.forEach(genre => genresSet.add(genre));
                    } else {
                        genresSet.add(preview.genres); // If it's not an array, add it directly
                    }
                }

                // Convert the Set to an array and update the data state
                setData([...genresSet]);
                //console.log(...genresSet)     check genresSet array
                setLoading(false);
            } catch (error) {
                setError('Genre Not Found.');
                setLoading(false); 
                console.error('Genre not found', error)
            }
        };

        fetchData(url);
    }, []); // Dependency array, triggers the effect when URL changes


    //fetch data based on genre
    useEffect(() => {
        if(selectedGenre){
            const fetchDataByGenre = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Error fetching Genre.');
                }

                const previews = await response.json();
                const filteredData = previews.filter((d) =>
                    d.genres && d.genres.includes(selectedGenre)
                );

                setFilteredGenre(filteredData); // Set filtered data based on genre
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch podcasts for this genre.");
                setLoading(false);
                console.error("Genre failed:", error);
            }
        };
        fetchDataByGenre()
        }
    }, [selectedGenre]); // Runs when `id` changes (i.e., when a new genre is selected)

    // Render loading, error, or the list of genres
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleGenreClick = (genreId) =>{
        setSelectedGenre(genreId);
    }

    const dateString = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }
    
    //conditional display of podcast if genre selected
    if(selectedGenre){
        const genreText = genreMap[selectedGenre] || "Unknown Genre";
        return(
            <div>
                <h1>Genre: {genreText}</h1>
                <div className="podcast">     {/* styling the entire div */}
                    {filteredGenre.map(d =>
                        <div className="podcastBlock" key={d.id}>
                            <Link to={`/${d.id}`} >
                                <img className="podcastImg" src={d.image} alt={d.title} />
                                <div className="podcastDesc">{d.title}</div>
                                <div className="podcastDate">Updated: {new Date(d.updated).toLocaleString('en-GB', dateString)}</div>
                            </Link>
                        </div>)}
                </div>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {data.map((genreId, index) => {
                    const genreText = genreMap[genreId] || "Unknown Genre";
                    return(
                        <li key={index}>
                            <button className={`genre-btn ${selectedGenre === genreId ? 'selected' : ''}`}
                                onClick={ ()=> handleGenreClick(genreId)}>
                                {genreText}</button>
                        {/*<Link to={`/genre/${genreId}`}>{genreText}</Link>*/}
                    </li>
                    )
                }
                )}
            </ul>
        </div>
    );
};

export default Genres;
