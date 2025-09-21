const MovieCard = ({movie : {title, poster_path, vote_average, original_language, release_date}}) => {
    return(
        <div className="movie-card">
            <div>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './No-Poster.svg'} alt="" />
            </div>
            <div className="mt-4">
                <h3>{title}</h3>
            </div>

            <div className="content">
                <div className="rating">
                    <img src="Rating.svg" alt="" />
                    <p>{vote_average ? vote_average.toFixed(2) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className="lang">{original_language}</p>
            
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            
            </div>        
        </div>
    )
}


export default MovieCard