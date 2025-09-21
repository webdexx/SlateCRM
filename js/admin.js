// Admin Dashboard JavaScript

// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const notificationBtn = document.getElementById('notificationBtn');
const sendNotificationBtn = document.getElementById('sendNotificationBtn');
const notificationModal = document.getElementById('notificationModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const cancelNotification = document.getElementById('cancelNotification');
const notificationForm = document.getElementById('notificationForm');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const toastContainer = document.getElementById('toastContainer');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadDashboardData();
    showToast('Welcome to Admin Dashboard!', 'success');
});

// Initialize dashboard functionality
function initializeDashboard() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Notification modal
    sendNotificationBtn.addEventListener('click', openNotificationModal);
    modalOverlay.addEventListener('click', closeNotificationModal);
    modalClose.addEventListener('click', closeNotificationModal);
    cancelNotification.addEventListener('click', closeNotificationModal);
    notificationForm.addEventListener('submit', handleNotificationSubmit);
    
    // Profile dropdown
    profileBtn.addEventListener('click', toggleProfileDropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });
    
    // Navigation menu
    initializeNavigation();
    
    // Quick actions
    initializeQuickActions();
    
    // Search functionality
    initializeSearch();
}

// Sidebar functionality
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
    // For mobile devices
    if (window.innerWidth <= 1024) {
        sidebar.classList.toggle('show');
    }
}

// Notification modal functionality
function openNotificationModal() {
    notificationModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeNotificationModal() {
    notificationModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function handleNotificationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(notificationForm);
    const notificationData = {
        title: formData.get('title'),
        message: formData.get('message'),
        type: formData.get('type'),
        recipients: formData.get('recipients'),
        urgent: formData.get('urgent') === 'on'
    };
    
    // Simulate sending notification
    showToast('Sending notification...', 'success');
    
    setTimeout(() => {
        showToast(`Notification "${notificationData.title}" sent successfully!`, 'success');
        closeNotificationModal();
        notificationForm.reset();
        
        // Update notification count
        updateNotificationCount();
        
        // Add to recent activities
        addRecentActivity('Notification Sent', `"${notificationData.title}" sent to ${notificationData.recipients}`, 'bell');
    }, 1500);
}

// Profile dropdown functionality
function toggleProfileDropdown() {
    profileDropdown.classList.toggle('show');
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Handle navigation (you can add page routing here)
            const page = this.querySelector('span').textContent.toLowerCase();
            showToast(`Navigating to ${page}...`, 'success');
        });
    });
}

// Quick actions functionality
function initializeQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showToast(`${action} action triggered!`, 'success');
            
            // Add to recent activities
            addRecentActivity(action, `${action} action performed`, 'cog');
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            // Simulate search
            showToast(`Searching for "${query}"...`, 'success');
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showToast(`Search results for "${query}"`, 'success');
            }
        }
    });
}

// Dashboard data loading
function loadDashboardData() {
    // Simulate loading dashboard data
    setTimeout(() => {
        updateStats();
        updateInsights();
        loadRecentActivities();
    }, 1000);
}

// Update statistics
function updateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        const statValue = card.querySelector('h3');
        const currentValue = parseInt(statValue.textContent.replace(/[^\d]/g, ''));
        
        // Animate the numbers
        animateNumber(statValue, 0, currentValue, 2000);
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        
        // Format the number based on the original format
        const originalText = element.textContent;
        if (originalText.includes('$')) {
            element.textContent = `$${currentValue.toLocaleString()}`;
        } else if (originalText.includes('%')) {
            element.textContent = `${currentValue}%`;
        } else {
            element.textContent = currentValue.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Update insights
function updateInsights() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Load recent activities
function loadRecentActivities() {
    // Activities are already in HTML, just add some interactivity
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showToast(`Viewing details for: ${title}`, 'success');
        });
    });
}

// Add recent activity
function addRecentActivity(title, description, icon) {
    const activityList = document.querySelector('.activity-list');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    const iconMap = {
        'bell': 'fas fa-bell',
        'user': 'fas fa-user-plus',
        'file': 'fas fa-file-alt',
        'calendar': 'fas fa-calendar-check',
        'cog': 'fas fa-cog'
    };
    
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="${iconMap[icon] || 'fas fa-info-circle'}"></i>
        </div>
        <div class="activity-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <span class="activity-time">Just now</span>
        </div>
    `;
    
    // Add to the beginning of the list
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Remove oldest activity if more than 4
    if (activityList.children.length > 4) {
        activityList.removeChild(activityList.lastChild);
    }
    
    // Add click event
    activityItem.addEventListener('click', function() {
        showToast(`Viewing details for: ${title}`, 'success');
    });
}

// Update notification count
function updateNotificationCount() {
    const badge = document.querySelector('.notification-badge');
    const currentCount = parseInt(badge.textContent);
    badge.textContent = currentCount + 1;
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="toast-icon ${iconMap[type]}"></i>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Export report functionality
document.querySelector('.btn-secondary').addEventListener('click', function() {
    showToast('Generating report...', 'success');
    
    setTimeout(() => {
        showToast('Report exported successfully!', 'success');
        addRecentActivity('Report Generated', 'Monthly dashboard report exported', 'file');
    }, 2000);
});

// Notification button click
notificationBtn.addEventListener('click', function() {
    showToast('You have 3 new notifications', 'info');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-container input').focus();
    }
    
    // Ctrl/Cmd + N for new notification
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openNotificationModal();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeNotificationModal();
        profileDropdown.classList.remove('show');
    }
});

// Auto-refresh dashboard data
setInterval(() => {
    // Simulate real-time updates
    const randomStat = Math.floor(Math.random() * 4);
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards[randomStat]) {
        const statValue = statCards[randomStat].querySelector('h3');
        const currentValue = parseInt(statValue.textContent.replace(/[^\d]/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 10);
        
        // Update the value
        if (statValue.textContent.includes('$')) {
            statValue.textContent = `$${newValue.toLocaleString()}`;
        } else if (statValue.textContent.includes('%')) {
            statValue.textContent = `${Math.min(100, newValue)}%`;
        } else {
            statValue.textContent = newValue.toLocaleString();
        }
    }
}, 30000); // Update every 30 seconds

// Responsive sidebar handling
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('show');
    }
});

// Interactive effects removed as requested

// Add loading states
function showLoading(element) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Initialize tooltips (if needed)
function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize tooltips
initializeTooltips(); 