// Parent Dashboard JavaScript

// Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const toastContainer = document.getElementById('toastContainer');

// Parent elements
const parentNameEls = [
    document.getElementById('parentName'),
    document.getElementById('parentFullName'),
    document.getElementById('headerParentName')
];

// Child selection
const childCards = document.getElementById('childCards');
let selectedChild = null;

// Sections
const progressList = document.getElementById('progressList');
const gradesList = document.getElementById('gradesList');
const homeworkList = document.getElementById('homeworkList');
const noticeList = document.getElementById('noticeList');
const communicationList = document.getElementById('communicationList');

// Attendance
const attendanceRing = document.getElementById('attendanceRing');
const attendancePercentEl = document.getElementById('attendancePercent');
const attendancePercentText = document.getElementById('attendancePercentText');
const presentDaysEl = document.getElementById('presentDays');
const absentDaysEl = document.getElementById('absentDays');
const totalDaysEl = document.getElementById('totalDays');

document.addEventListener('DOMContentLoaded', function() {
    guardRoute();
    initializeUI();
    loadParentData();
});

function guardRoute() {
    const currentUserRaw = sessionStorage.getItem('currentUser');
    if (!currentUserRaw) {
        window.location.href = '/';
        return;
    }
    const currentUser = JSON.parse(currentUserRaw);
    if (currentUser.role !== 'parent') {
        window.location.href = '/';
    }
}

function initializeUI() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle('show');
        }
    });

    // Profile dropdown
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });
    document.addEventListener('click', function(e) {
        if (!profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        showToast('Logged out');
        setTimeout(() => window.location.href = '/', 600);
    });

    // Buttons
    const refreshProgress = document.getElementById('refreshProgress');
    const refreshGrades = document.getElementById('refreshGrades');
    const downloadReport = document.getElementById('downloadReport');
    const contactTeacher = document.getElementById('contactTeacher');
    const newMessage = document.getElementById('newMessage');

    refreshProgress.addEventListener('click', function() {
        loadProgress();
        showToast('Progress refreshed');
    });
    refreshGrades.addEventListener('click', function() {
        loadGrades();
        showToast('Grades refreshed');
    });
    downloadReport.addEventListener('click', function() {
        showToast('Generating report...');
        setTimeout(() => showToast('Report downloaded'), 1200);
    });
    contactTeacher.addEventListener('click', function() {
        showToast('Opening teacher contact form...');
    });
    newMessage.addEventListener('click', function() {
        showToast('Opening new message form...');
    });

    // Responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('show');
        }
    });
}

function loadParentData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    parentNameEls.forEach(el => el && (el.textContent = currentUser.name));

    // Simulated data
    const children = [
        { id: 'student001', name: 'Mike Wilson', grade: '10th Grade', avatar: '/assets/avatar-student.jpg' },
        { id: 'student002', name: 'Lisa Chen', grade: '11th Grade', avatar: '/assets/avatar-student2.jpg' }
    ];

    const attendance = { percent: 94, present: 94, absent: 6, total: 100 };
    const progress = [
        { subject: 'Mathematics', score: 88 },
        { subject: 'Physics', score: 82 },
        { subject: 'English', score: 90 },
        { subject: 'Chemistry', score: 84 }
    ];
    const grades = [
        { subject: 'Mathematics', assignment: 'Unit Test 3', score: 88, date: 'Sep 8, 2024' },
        { subject: 'Physics', assignment: 'Lab Report', score: 92, date: 'Sep 6, 2024' },
        { subject: 'English', assignment: 'Essay Writing', score: 85, date: 'Sep 5, 2024' }
    ];
    const homework = [
        { subject: 'Mathematics', task: 'Complete Chapter 5 exercises', dueDate: 'Sep 12, 2024', status: 'pending' },
        { subject: 'Physics', task: 'Read Chapter 8', dueDate: 'Sep 10, 2024', status: 'completed' },
        { subject: 'English', task: 'Write book review', dueDate: 'Sep 15, 2024', status: 'pending' }
    ];
    const notices = [
        { title: 'PTM Scheduled', message: 'Parent Teacher Meeting on 15th Sep', icon: 'fa-bullhorn' },
        { title: 'Library Timing', message: 'Extended hours during exam week', icon: 'fa-book' },
        { title: 'Sports Day', message: 'Annual Sports Day on 20th Sep', icon: 'fa-trophy' }
    ];
    const messages = [
        { teacher: 'John Smith', subject: 'Mathematics', message: 'Mike is doing well in class. Keep encouraging him!', time: '2 hours ago', avatar: '/assets/teacher1.jpg' },
        { teacher: 'Emily Davis', subject: 'Physics', message: 'Please ensure Mike completes his lab assignments on time.', time: '1 day ago', avatar: '/assets/teacher2.jpg' }
    ];

    renderChildren(children);
    updateAttendance(attendance);
    renderProgress(progress);
    renderGrades(grades);
    renderHomework(homework);
    renderNotices(notices);
    renderMessages(messages);
}

function renderChildren(children) {
    childCards.innerHTML = '';
    children.forEach((child, index) => {
        const card = document.createElement('div');
        card.className = `child-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <img src="${child.avatar}" alt="${child.name}" class="child-avatar">
            <div class="child-info">
                <h4>${child.name}</h4>
                <p>${child.grade}</p>
            </div>
        `;
        card.addEventListener('click', () => selectChild(child, card));
        childCards.appendChild(card);
    });
    if (children.length > 0) {
        selectedChild = children[0];
    }
}

function selectChild(child, cardElement) {
    // Remove active class from all cards
    document.querySelectorAll('.child-card').forEach(card => card.classList.remove('active'));
    // Add active class to selected card
    cardElement.classList.add('active');
    selectedChild = child;
    showToast(`Selected ${child.name}'s profile`);
    // Refresh data for selected child
    loadChildData(child);
}

function loadChildData(child) {
    // This would typically fetch data for the selected child
    showToast(`Loading ${child.name}'s data...`);
}

function updateAttendance(a) {
    attendancePercentEl.textContent = `${a.percent}%`;
    attendancePercentText.textContent = `${a.percent}%`;
    presentDaysEl.textContent = a.present;
    absentDaysEl.textContent = a.absent;
    totalDaysEl.textContent = a.total;
    attendanceRing.setAttribute('stroke-dasharray', `${a.percent}, 100`);
}

function renderProgress(items) {
    progressList.innerHTML = '';
    items.forEach(item => {
        const wrap = document.createElement('div');
        wrap.className = 'progress-item';
        wrap.innerHTML = `
            <div class="subject">${item.subject}</div>
            <div class="progress-bar-wrap"><div class="progress-bar"></div></div>
            <div class="progress-score">${item.score}%</div>`;
        progressList.appendChild(wrap);
        requestAnimationFrame(() => {
            const bar = wrap.querySelector('.progress-bar');
            bar.style.width = `${item.score}%`;
        });
    });
}

function renderGrades(items) {
    gradesList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'grade-item';
        el.innerHTML = `
            <div class="grade-info">
                <h4>${item.assignment}</h4>
                <p>${item.subject} • ${item.date}</p>
            </div>
            <div class="grade-score">${item.score}%</div>`;
        gradesList.appendChild(el);
    });
}

function renderHomework(items) {
    homeworkList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'homework-item';
        el.innerHTML = `
            <div class="homework-info">
                <h4>${item.task}</h4>
                <p>${item.subject} • Due: ${item.dueDate}</p>
            </div>
            <div class="homework-status ${item.status}">${item.status}</div>`;
        homeworkList.appendChild(el);
    });
}

function renderNotices(items) {
    noticeList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'notice-item';
        el.innerHTML = `
            <div class="icon"><i class="fas ${item.icon}"></i></div>
            <div>
                <h4>${item.title}</h4>
                <p>${item.message}</p>
            </div>`;
        noticeList.appendChild(el);
    });
    const noticesCount = document.getElementById('noticesCount');
    noticesCount.textContent = String(items.length);
}

function renderMessages(items) {
    communicationList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'message-item';
        el.innerHTML = `
            <img src="${item.avatar}" alt="${item.teacher}" class="message-avatar">
            <div class="message-content">
                <h4>${item.teacher} - ${item.subject}</h4>
                <p>${item.message}</p>
                <div class="message-time">${item.time}</div>
            </div>`;
        communicationList.appendChild(el);
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}