// favorites.js

$(document).ready(() => {
    const favoritesContainer = $('#favorites-list');

    function getFavorites() {
        const favorites = localStorage.getItem('favoriteMovies');
        return favorites ? JSON.parse(favorites) : [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }
    

    // Tạo thẻ phim
    function createFavoriteMovieCard(movie) {
        return `
            <div class="movie-card" data-id="${movie.id}">
                <div class="favorite-icon" data-id="${movie.id}">
                    <i class='bx bxs-heart'></i> </div>
                <a href="detail.html?id=${movie.id}">
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-item-content">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-infos">
                            <div class="movie-infor"><i class="bx bxs-star"></i><span>${movie.rating}</span></div>
                            <div class="movie-infor"><i class="bx bxs-time"></i><span>${movie.duration}</span></div>
                            <div class="movie-infor"><span>${movie.quality}</span></div>
                            <div class="movie-infor"><span>${movie.age_restriction}</span></div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // Hiển thị danh sách phim
    function displayFavorites() {
        const favoriteIds = getFavorites();
        if (favoriteIds.length === 0) {
            favoritesContainer.html('<p class="no-results">Bạn chưa có phim yêu thích nào.</p>');
            return;
        }
        const favoriteMovies = moviesData.filter(movie => favoriteIds.includes(movie.id));
        let moviesHtml = '';
        favoriteMovies.forEach(movie => {
            moviesHtml += createFavoriteMovieCard(movie);
        });
        favoritesContainer.html(moviesHtml);
        
        handleRemoveFavorite();
    }
    
    
    // Sử lý sự kiện
    function handleRemoveFavorite() {
        $('.favorite-icon').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const movieIdToRemove = $(this).data('id');
            // 1. Xóa khỏi localStorage
            let currentFavorites = getFavorites();
            currentFavorites = currentFavorites.filter(id => id !== movieIdToRemove);
            saveFavorites(currentFavorites);

            // 2. Xóa thẻ phim khỏi giao diện ngay lập tức
            $(this).closest('.movie-card').fadeOut(300, function() { 
                $(this).remove(); 
                
                // 3. Kiểm tra nếu danh sách rỗng thì hiển thị thông báo
                if (getFavorites().length === 0) {
                    favoritesContainer.html('<p class="no-results">Bạn chưa có phim yêu thích nào.</p>');
                }
            });
        });
    }

    displayFavorites();
});