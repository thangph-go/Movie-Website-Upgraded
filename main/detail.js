// detail.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy ID phim từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // 2. Tìm phim trong mảng moviesData (được load từ moviesData.js)
    const movie = moviesData.find(m => m.id === movieId);

    // 3. Kiểm tra nếu tìm thấy phim, điền dữ liệu vào HTML
    if (movie) {
        document.getElementById('pageTitle').textContent = `Xem phim: ${movie.title}`;
        document.getElementById('moviePoster').src = movie.poster;
        document.getElementById('moviePoster').alt = `Poster ${movie.title}`;
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieDescription').textContent = movie.description;
        document.getElementById('movieRating').textContent = movie.rating;
        document.getElementById('movieDuration').textContent = movie.duration;
        document.getElementById('movieQuality').textContent = movie.quality;
        document.getElementById('movieAgeRestriction').textContent = movie.age_restriction;
        document.getElementById('movieGenre').textContent = movie.genre;
        document.getElementById('movieReleaseYear').textContent = movie.releaseYear;
        document.getElementById('movieDirector').textContent = movie.director;
        document.getElementById('movieActors').textContent = movie.actors;


        const movieTrailerIframe = document.getElementById('movieTrailer');
        if (movie.trailer) {
            movieTrailerIframe.src = movie.trailer;
        }
    } 
});