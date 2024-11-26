import { Link } from "react-router-dom";

function Genres() {

    return(
        <div>
            <Link to="genre/1">Personal Growth</Link>
            <Link to="genre/2">Investigative Journalism</Link>
            <Link to="genre/3">History</Link>
            <Link to="genre/4">Compedy</Link>
            <Link to="genre/5">Entertainment</Link>
            <Link to="genre/6">Business</Link>
            <Link to="genre/7">Fiction</Link>
            <Link to="genre/8">News</Link>
            <Link to="genre/9">Kids and Family</Link>
        </div>
    )
}

export default Genres;
