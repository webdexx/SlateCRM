// Student Dashboard JavaScript

// Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const toastContainer = document.getElementById('toastContainer');

// Student elements
const studentNameEls = [
    document.getElementById('studentName'),
    document.getElementById('studentFullName'),
    document.getElementById('headerStudentName')
];
const studentGradeEl = document.getElementById('studentGrade');

// Sections
const classList = document.getElementById('classList');
const performanceList = document.getElementById('performanceList');
const testsList = document.getElementById('testsList');
const noticeList = document.getElementById('noticeList');

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
    loadStudentData();
});

function guardRoute() {
    const currentUserRaw = sessionStorage.getItem('currentUser');
    if (!currentUserRaw) {
        window.location.href = '/';
        return;
    }
    const currentUser = JSON.parse(currentUserRaw);
    if (currentUser.role !== 'student') {
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
    const refreshClasses = document.getElementById('refreshClasses');
    const refreshTests = document.getElementById('refreshTests');
    const downloadReport = document.getElementById('downloadReport');
    const joinClass = document.getElementById('joinClass');

    refreshClasses.addEventListener('click', function() {
        loadClasses();
        showToast('Classes refreshed');
    });
    refreshTests.addEventListener('click', function() {
        loadTests();
        showToast('Tests refreshed');
    });
    downloadReport.addEventListener('click', function() {
        showToast('Generating report...');
        setTimeout(() => showToast('Report downloaded'), 1200);
    });
    joinClass.addEventListener('click', function() {
        showToast('Opening your next class...');
    });

    // Responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('show');
        }
    });
}

function loadStudentData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    studentNameEls.forEach(el => el && (el.textContent = currentUser.name));
    if (currentUser.grade) {
        studentGradeEl.textContent = currentUser.grade;
    } else {
        studentGradeEl.textContent = 'Student';
    }

    // Simulated data
    const attendance = { percent: 92, present: 92, absent: 8, total: 100 };
    const classes = [
        { name: 'Mathematics', teacher: 'John Smith', time: '09:00 AM', room: 'A-201' },
        { name: 'Physics', teacher: 'Emily Davis', time: '10:30 AM', room: 'B-104' },
        { name: 'English', teacher: 'Anna Lee', time: '01:00 PM', room: 'C-210' },
    ];
    const performance = [
        { subject: 'Mathematics', score: 88 },
        { subject: 'Physics', score: 82 },
        { subject: 'English', score: 90 },
        { subject: 'Chemistry', score: 84 }
    ];
    const tests = [
        { title: 'Math Unit Test', date: 'Tue, 10 Sep', time: '10:00 AM', subject: 'Mathematics' },
        { title: 'Physics Quiz', date: 'Thu, 12 Sep', time: '11:30 AM', subject: 'Physics' },
        { title: 'English Essay', date: 'Fri, 13 Sep', time: '02:00 PM', subject: 'English' }
    ];
    const notices = [
        { title: 'PTM Scheduled', message: 'Parent Teacher Meeting on 15th Sep', icon: 'fa-bullhorn' },
        { title: 'Library Timing', message: 'Extended hours during exam week', icon: 'fa-book' }
    ];

    updateAttendance(attendance);
    renderClasses(classes);
    renderPerformance(performance);
    renderTests(tests);
    renderNotices(notices);
}

function updateAttendance(a) {
    attendancePercentEl.textContent = `${a.percent}%`;
    attendancePercentText.textContent = `${a.percent}%`;
    presentDaysEl.textContent = a.present;
    absentDaysEl.textContent = a.absent;
    totalDaysEl.textContent = a.total;
    attendanceRing.setAttribute('stroke-dasharray', `${a.percent}, 100`);
}

function renderClasses(items) {
    classList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'class-item';
        el.innerHTML = `
            <div class="class-meta">
                <div class="icon"><i class="fas fa-book"></i></div>
                <div>
                    <h4>${item.name}</h4>
                    <div class="muted">${item.teacher} • ${item.room}</div>
                </div>
            </div>
            <div class="class-actions">
                <button class="btn btn-secondary"><i class="fas fa-clock"></i> ${item.time}</button>
                <button class="btn btn-primary"><i class="fas fa-arrow-right"></i> Open</button>
            </div>`;
        classList.appendChild(el);
    });
}

function renderPerformance(items) {
    performanceList.innerHTML = '';
    items.forEach(item => {
        const wrap = document.createElement('div');
        wrap.className = 'performance-item';
        wrap.innerHTML = `
            <div class="subject">${item.subject}</div>
            <div class="performance-bar-wrap"><div class="performance-bar"></div></div>
            <div class="performance-score">${item.score}%</div>`;
        performanceList.appendChild(wrap);
        requestAnimationFrame(() => {
            const bar = wrap.querySelector('.performance-bar');
            bar.style.width = `${item.score}%`;
        });
    });
}

function renderTests(items) {
    testsList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'test-item';
        el.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <div class="test-meta"><i class="fas fa-book-open"></i> ${item.subject}</div>
            </div>
            <div class="test-actions">
                <button class="btn btn-secondary"><i class="fas fa-calendar"></i> ${item.date}</button>
                <button class="btn btn-primary"><i class="fas fa-clock"></i> ${item.time}</button>
            </div>`;
        testsList.appendChild(el);
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
                <p class="muted">${item.message}</p>
            </div>`;
        noticeList.appendChild(el);
    });
    const noticesCount = document.getElementById('noticesCount');
    noticesCount.textContent = String(items.length);
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
