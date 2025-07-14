$(document).ready(() => {
    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"];

    function getFavorites() {
        const favorites = localStorage.getItem('favoriteMovies');
        return favorites ? JSON.parse(favorites) : [];
    }
    function saveFavorites(favorites) {
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }

    //Thêm biểu tượng yêu thích
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


    // Hàm để tạo một slide HTML cho banner chính
    function createBannerSlide(movie) {
        const imageUrl = movie.banner_image;
        return `
            <div class="hero-slide-item" data-id="${movie.id}">
                <img src="${imageUrl}" alt="${movie.title}">
                <div class="overlay"></div>
                <div class="hero-slide-item-content">
                    <div>
                        <div class="item-content-title top-down">
                            ${movie.title}
                        </div>
                        <div class="movie-infos top-down delay-2">
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
                        <div class="item-content-description top-down delay-4">
                            ${movie.description}
                        </div>
                        <div class="top-down delay-6">
                            <a href="detail.html?id=${movie.id}" class="btn btn-hover">
                                <i class="bx bxs-right-arrow"></i>
                                <span>XEM NGAY</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Hàm để hiển thị các slide vào carousel banner chính
    function displayBannersIntoCarousel(containerId, requiredType) {
        const carouselContainer = document.getElementById(containerId);
        if (!carouselContainer) {
            console.warn(`Container with ID "${containerId}" not found for banners.`);
            return;
        }

        const filteredBanners = moviesData.filter(movie => movie.type === requiredType);

        let bannersHtml = '';
        filteredBanners.forEach(movie => {
            bannersHtml += createBannerSlide(movie);
        });

        carouselContainer.innerHTML = bannersHtml;
        $(carouselContainer).owlCarousel({
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: navText,
            autoplayTimeOut: 4000,
            autoplay: true,
        });
    }


    // Hàm để hiển thị các slide phim vào một carousel cụ thể
    function displayMoviesIntoCarousel(containerId, requiredType) {
        const carouselContainer = document.getElementById(containerId);
        if (!carouselContainer) {
            console.warn(`Container with ID "${containerId}" not found.`);
            return;
        }

        const filteredMovies = moviesData.filter(movie => movie.type === requiredType);
        let moviesHtml = '';
        filteredMovies.forEach(movie => {
            moviesHtml += createMovieCard(movie);
        });

        carouselContainer.innerHTML = moviesHtml;
        $(carouselContainer).owlCarousel({
            items: 4,
            dots: false,
            loop: false,
            nav: true,
            navText: navText,
            margin: 15,
        });
    }


    displayBannersIntoCarousel('hero-carousel', 'banners');
    displayMoviesIntoCarousel('latest-movies-carousel', 'latest');
    displayMoviesIntoCarousel('trending-movies-carousel', 'trending');
    displayMoviesIntoCarousel('movies-carousel', 'movies');
    displayMoviesIntoCarousel('series-carousel', 'series');
    displayMoviesIntoCarousel('cartoons-carousel', 'cartoons');
    
    //Sự kiện click vào icon yêu thích
    function handleFavoriteClick() {
        $('.favorite-icon').on('click', function(e) {
            e.stopPropagation();
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

    handleFavoriteClick();
    $('.owl-carousel').on('translated.owl.carousel', function(event) {
        handleFavoriteClick();
    });

    const popupUsernameSpan = document.getElementById('popupUsername');
    const popupEmailSpan = document.getElementById('popupEmail');
    const accountButton = document.querySelectorAll('.accountButton');
    const accountInfoPopup = document.getElementById('accountInfoPopup');
    const logoutButtonPopup = document.getElementById('logoutButtonPopup');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (loggedInUser) {
        popupUsernameSpan.textContent = loggedInUser;

        const emailFromLocalStorage = Object.keys(localStorage).find(key => {
            if (key === 'favoriteMovies') return false;
            try {
                const userData = JSON.parse(localStorage.getItem(key));
                return userData && userData.username === loggedInUser;
            } catch (e) {
                return false;
            }
        });

        if (emailFromLocalStorage) {
            popupEmailSpan.textContent = emailFromLocalStorage;
        } else {
            popupEmailSpan.textContent = 'Không tìm thấy Email';
        }
    }

    // pop-up tài khoản
    accountButton.forEach( acc => {
        acc.addEventListener('click', (event) => {
            event.stopPropagation();
            if (accountInfoPopup) {
                accountInfoPopup.classList.toggle('show');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const isClickOnButton = Array.from(accountButton).some(button => button.contains(event.target));

        if (accountInfoPopup && !accountInfoPopup.contains(event.target) && !isClickOnButton) {
            accountInfoPopup.classList.remove('show');
        }
    });

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../welcome/welcome.html';
    };

    if (logoutButtonPopup) {
        logoutButtonPopup.addEventListener('click', (event) => {
            event.preventDefault();
            handleLogout();
        });
    }

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            }
        });
    }
});


//  Pop-up thông báo bảng giá
function showAlert(alertId) {
    document.getElementById(alertId).style.display = 'block';
}

function closeAlert(alertId) {
    document.getElementById(alertId).style.display = 'none';
}

const watchLinks = document.querySelectorAll('.price-alert');
watchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetAlertId = link.getAttribute('data-target');
        showAlert(targetAlertId);
    });
});
