// sign_in.js

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const forgotPasswordLink = document.querySelector('.forgot-password-link');
const backToLoginLink = document.querySelector('.back-to-login-link');

// Lấy các form
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');
const forgotPasswordForm = document.querySelector('.form-box.forgot-password form');

// Xử lý khi click vào nút "Register" trong form Login
registerLink.addEventListener('click', () => {
    wrapper.classList.remove('active-forgot-password');
    wrapper.classList.add('active');
});

// Xử lý khi click vào nút "Login" trong form Register
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-forgot-password');
});

// NEW: Handle click on "Forgot Password?" link
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
    wrapper.classList.add('active-forgot-password');
});

// NEW: Handle click on "Back to Login" link
backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active-forgot-password');
});

// ----------------- LOGIC XỬ LÝ ĐĂNG KÝ VÀ ĐĂNG NHẬP -----------------


// Xử lý sự kiện submit form ĐĂNG KÝ
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = registerForm.querySelector('input[type="text"]');
    const emailInput = registerForm.querySelector('input[type="email"]');
    const passwordInput = registerForm.querySelector('input[type="password"]');
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !email || !password) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    if (localStorage.getItem(email)) {
        alert('Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.');
        return;
    }
    const userData = {
        username: username,
        password: password
    };
    localStorage.setItem(email, JSON.stringify(userData));
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-forgot-password');
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
});


// Xử lý sự kiện submit form ĐĂNG NHẬP
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
        alert('Vui lòng điền đầy đủ email và mật khẩu!');
        return;
    }
    const storedUserDataJSON = localStorage.getItem(email);
    if (!storedUserDataJSON) {
        alert('Email không tồn tại!');
        return;
    }
    const storedUserData = JSON.parse(storedUserDataJSON);
    const storedPassword = storedUserData.password;
    if (password === storedPassword) {
        alert('Đăng nhập thành công!');
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loggedInUser', storedUserData.username || email);
        window.location.href = '../main/home.html';
    } else {
        alert('Mật khẩu không chính xác!');
    }
});

// Xử lý sự kiện submit form ĐẶT LẠI MẬT KHẨU
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('forgot-password-email');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');
    const email = emailInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmNewPassword = confirmNewPasswordInput.value.trim();
    if (!email || !newPassword || !confirmNewPassword) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    if (newPassword !== confirmNewPassword) {
        alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
        return;
    }

    const storedUserDataJSON = localStorage.getItem(email);
    if (!storedUserDataJSON) {
        alert('Email này chưa được đăng ký!');
        return;
    }
    const storedUserData = JSON.parse(storedUserDataJSON);
    storedUserData.password = newPassword;
    localStorage.setItem(email, JSON.stringify(storedUserData));
    alert('Mật khẩu của bạn đã được đặt lại thành công! Vui lòng đăng nhập bằng mật khẩu mới.');
    emailInput.value = '';
    newPasswordInput.value = '';
    confirmNewPasswordInput.value = '';
    wrapper.classList.remove('active-forgot-password');
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'register') {
        wrapper.classList.add('active');
    }
});