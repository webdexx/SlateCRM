// User data (simulating database)
let users = [];

// Load user data from JSON file
async function loadUsers() {
    try {
        const response = await fetch('js/users.json');
        const data = await response.json();
        users = data.users;
    } catch (error) {
        console.error('Error loading users:', error);
        // Fallback to hardcoded users if JSON loading fails
        users = [
            {
                id: "admin001",
                password: "admin123",
                role: "admin",
                name: "Administrator"
            },
            {
                id: "teacher001",
                password: "teacher123",
                role: "teacher",
                name: "John Smith"
            },
            {
                id: "accountant001",
                password: "account123",
                role: "accounts",
                name: "Sarah Johnson"
            },
            {
                id: "student001",
                password: "student123",
                role: "student",
                name: "Mike Wilson"
            },
            {
                id: "parent001",
                password: "parent123",
                role: "parent",
                name: "Lisa Brown"
            }
        ];
    }
}

// DOM Elements
const loginForm = document.getElementById('loginForm');
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const toast = document.getElementById('toast');

// Slider Elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    await loadUsers();
    initializeSlider();
    initializeFormHandlers();
    showToast('Welcome to EduTech School Management System', 'success');
});

// Slider Functionality
function initializeSlider() {
    // Auto-slide every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Password toggle
    togglePasswordBtn.addEventListener('click', togglePassword);
    
    // Form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Input focus effects
    [userIdInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function togglePassword() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

async function handleLogin(e) {
    e.preventDefault();
    
    const userId = userIdInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Basic validation
    if (!userId || !password) {
        showToast('Please enter both ID and password', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Authenticate user
    const user = authenticateUser(userId, password);
    
    if (user) {
        showToast(`Welcome back, ${user.name}!`, 'success');
        
        // Store user info in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect based on role
        setTimeout(() => {
            redirectToDashboard(user.role);
        }, 1000);
    } else {
        showToast('Invalid ID or password. Please try again.', 'error');
        setLoadingState(false);
    }
}

function authenticateUser(userId, password) {
    return users.find(user => 
        user.id.toLowerCase() === userId.toLowerCase() && 
        user.password === password
    );
}

function redirectToDashboard(role) {
    const roleRoutes = {
        'admin': '/admin/',
        'teacher': '/staff/',
        'accounts': '/accountant/',
        'student': '/student/',
        'parent': '/parent/'
    };
    
    const route = roleRoutes[role];
    if (route) {
        window.location.href = route;
    } else {
        showToast('Invalid user role', 'error');
        setLoadingState(false);
    }
}

function setLoadingState(loading) {
    if (loading) {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && (document.activeElement === userIdInput || document.activeElement === passwordInput)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to close toast
    if (e.key === 'Escape') {
        toast.classList.remove('show');
    }
});

// Form validation on input
userIdInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
});

// Add some visual feedback for form interactions
loginForm.addEventListener('input', function() {
    const userId = userIdInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (userId && password) {
        loginBtn.style.opacity = '1';
    } else {
        loginBtn.style.opacity = '0.7';
    }
});

// Add smooth animations for form elements
const formElements = document.querySelectorAll('.form-group');
formElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    element.style.animation = 'slideIn 0.6s ease-out forwards';
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const loginSection = document.querySelector('.login-section');
    const rect = loginSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle parallax effect
    loginSection.style.transform = `perspective(1000px) rotateY(${(x - rect.width / 2) * 0.01}deg) rotateX(${(y - rect.height / 2) * 0.01}deg)`;
});

// Reset transform on mouse leave
document.querySelector('.login-section').addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});

// Add some particle effects for the background (optional enhancement)
function createParticles() {
    const sliderSection = document.querySelector('.slider-section');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        sliderSection.appendChild(particle);
    }
}

// Initialize particles
createParticles(); 