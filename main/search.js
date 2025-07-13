// search.js

function getFavorites() {
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

// Tạo thẻ phim
function createMovieCard(movie) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(movie.id);
    const heartIconClass = isFavorite ? 'bxs-heart' : 'bx-heart'; 

    return `
        <div class="movie-card" data-id="${movie.id}">
             <div class="favorite-icon" data-id="${movie.id}">
                <i class='bx ${heartIconClass}'></i>
            </div>
            <a href="detail.html?id=${movie.id}">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-item-content">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-infos">
                        <div class="movie-infor">
                            <i class="bx bxs-star"></i>
                            <span>${movie.rating}</span>
                        </div>
                        <div class="movie-infor">
                            <i class="bx bxs-time"></i>
                            <span>${movie.duration}</span>
                        </div>
                        <div class="movie-infor">
                            <span>${movie.quality}</span>
                        </div>
                        <div class="movie-infor">
                            <span>${movie.age_restriction}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Sự kiện click yêu thích
function handleFavoriteClick() {
    $('.favorite-icon').on('click', function(e) {
        e.stopPropagation(); 
        e.preventDefault();
        
        const movieId = $(this).data('id');
        let favorites = getFavorites();

        const heartIcon = $(this).find('i');

        if (favorites.includes(movieId)) {
            favorites = favorites.filter(id => id !== movieId);
            heartIcon.removeClass('bxs-heart').addClass('bx-heart');
        } else {
            favorites.push(movieId);
            heartIcon.removeClass('bx-heart').addClass('bxs-heart');
        }
        saveFavorites(favorites);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('search-results');
    const queryDisplay = document.getElementById('search-query-display');

    // Lấy query từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query')?.toLowerCase().trim();

    if (query && resultsContainer && queryDisplay) {
        queryDisplay.textContent = urlParams.get('query');

        // Lọc phim dựa trên query
        const filteredMovies = moviesData.filter(movie => 
            movie.title.toLowerCase().includes(query)
        );

        // Hiển thị kết quả
        if (filteredMovies.length > 0) {
            let resultsHtml = '';
            filteredMovies.forEach(movie => {
                resultsHtml += createMovieCard(movie);
            });
            resultsContainer.innerHTML = resultsHtml;
            handleFavoriteClick(); 

        } else {
            resultsContainer.innerHTML = '<p class="no-results">Không tìm thấy kết quả nào phù hợp.</p>';
        }
    } else {
        if(resultsContainer) {
            resultsContainer.innerHTML = '<p class="no-results">Vui lòng nhập từ khóa để tìm kiếm.</p>';
        }
    }

    // Xử lý tìm kiếm ngay trên trang kết quả
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `search.html?query=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
});