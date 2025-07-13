// welcome.js

$(document).ready(() => {
    let navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]

    $('.owl-carousel').owlCarousel({
        items: 4,
        dots: false,
        nav:true,
        navText: navText,
        margin: 10,
        
    })
})


function showAlert() {
    document.getElementById('customAlert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

const watchLinks = document.querySelectorAll('.watch');
watchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});





