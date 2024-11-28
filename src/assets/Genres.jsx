import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Genres.css'

const GenreComponent = () => {
    // State hooks for data, loading, and error
    const [data, setData] = useState([]); // For storing genres
    const [loading, setLoading] = useState(true); // Set to true until data is fetched
    const [error, setError] = useState(""); // Error handling state
    const { id } = useParams(); // Get the id from URL params (though not used in this case)

    const url = "https://podcast-api.netlify.app/";

    // Fetching data in useEffect hook
    useEffect(() => {
        const fetchData = async (url) => {
            try {
                setLoading(true); // Set loading to true before starting fetch
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch data"); // Handle fetch errors
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
                console.log(...genresSet)
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError(error.message); // If an error occurs, set the error state
                setLoading(false); // Stop loading even if there's an error
            }
        };

        fetchData(url); // Call the fetchData function
    }, [url]); // Dependency array, triggers the effect when URL changes

    // Render loading, error, or the list of genres
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <ul>
                {data.map((genre, index) => (
                    <li key={index}>
                        <Link to={`/genre/${genre}`}>{genre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GenreComponent;
