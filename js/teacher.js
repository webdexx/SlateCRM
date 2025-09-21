// Teacher Portal JavaScript

// Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const toastContainer = document.getElementById('toastContainer');

// Teacher elements
const teacherNameEls = [
    document.getElementById('teacherName'),
    document.getElementById('teacherFullName'),
    document.getElementById('headerTeacherName')
];
const teacherDepartmentEl = document.getElementById('teacherDepartment');

// Sections
const classesList = document.getElementById('classesList');
const assignmentsList = document.getElementById('assignmentsList');
const studentsList = document.getElementById('studentsList');
const messagesList = document.getElementById('messagesList');
const reportsGrid = document.getElementById('reportsGrid');

// Attendance
const presentCountEl = document.getElementById('presentCount');
const absentCountEl = document.getElementById('absentCount');
const attendanceRateEl = document.getElementById('attendanceRate');

document.addEventListener('DOMContentLoaded', function() {
    guardRoute();
    initializeUI();
    loadTeacherData();
});

function guardRoute() {
    const currentUserRaw = sessionStorage.getItem('currentUser');
    if (!currentUserRaw) {
        window.location.href = '/';
        return;
    }
    const currentUser = JSON.parse(currentUserRaw);
    if (currentUser.role !== 'teacher') {
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
    const refreshAssignments = document.getElementById('refreshAssignments');
    const createAssignment = document.getElementById('createAssignment');
    const takeAttendance = document.getElementById('takeAttendance');
    const viewAllStudents = document.getElementById('viewAllStudents');
    const newMessage = document.getElementById('newMessage');

    refreshClasses.addEventListener('click', function() {
        loadClasses();
        showToast('Classes refreshed');
    });
    refreshAssignments.addEventListener('click', function() {
        loadAssignments();
        showToast('Assignments refreshed');
    });
    createAssignment.addEventListener('click', function() {
        showToast('Opening assignment creation form...');
    });
    takeAttendance.addEventListener('click', function() {
        showToast('Opening attendance form...');
    });
    viewAllStudents.addEventListener('click', function() {
        showToast('Loading all students...');
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

function loadTeacherData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    teacherNameEls.forEach(el => el && (el.textContent = currentUser.name));
    if (currentUser.department) {
        teacherDepartmentEl.textContent = currentUser.department;
    } else {
        teacherDepartmentEl.textContent = 'Teacher';
    }

    // Simulated data
    const classes = [
        { name: 'Mathematics 10A', students: 30, time: '09:00 AM', room: 'A-201', subject: 'Mathematics' },
        { name: 'Mathematics 10B', students: 28, time: '10:30 AM', room: 'A-202', subject: 'Mathematics' },
        { name: 'Advanced Math', students: 25, time: '02:00 PM', room: 'A-205', subject: 'Mathematics' },
        { name: 'Statistics', students: 22, time: '03:30 PM', room: 'A-210', subject: 'Mathematics' }
    ];

    const assignments = [
        { title: 'Algebra Quiz', class: 'Mathematics 10A', dueDate: 'Sep 12, 2024', status: 'pending', submissions: 25 },
        { title: 'Geometry Assignment', class: 'Mathematics 10B', dueDate: 'Sep 10, 2024', status: 'graded', submissions: 28 },
        { title: 'Calculus Problem Set', class: 'Advanced Math', dueDate: 'Sep 15, 2024', status: 'pending', submissions: 20 }
    ];

    const students = [
        { name: 'Mike Wilson', grade: '10th Grade', score: 92, avatar: '/assets/student1.jpg' },
        { name: 'Lisa Chen', grade: '10th Grade', score: 88, avatar: '/assets/student2.jpg' },
        { name: 'John Smith', grade: '11th Grade', score: 85, avatar: '/assets/student3.jpg' },
        { name: 'Sarah Johnson', grade: '10th Grade', score: 90, avatar: '/assets/student4.jpg' }
    ];

    const messages = [
        { sender: 'Parent - Lisa Brown', subject: 'Mike Wilson Progress', message: 'How is Mike performing in class?', time: '2 hours ago', avatar: '/assets/parent1.jpg' },
        { sender: 'Principal - Dr. Smith', subject: 'Faculty Meeting', message: 'Reminder about tomorrow\'s meeting', time: '4 hours ago', avatar: '/assets/principal.jpg' },
        { sender: 'Parent - Robert Chen', subject: 'Lisa Chen Assignment', message: 'Lisa needs help with the geometry assignment', time: '1 day ago', avatar: '/assets/parent2.jpg' }
    ];

    const reports = [
        { title: 'Class Performance', icon: 'fas fa-chart-line', action: 'generateClassReport' },
        { title: 'Attendance Report', icon: 'fas fa-user-check', action: 'generateAttendanceReport' },
        { title: 'Grade Distribution', icon: 'fas fa-chart-bar', action: 'generateGradeReport' },
        { title: 'Student Progress', icon: 'fas fa-user-graduate', action: 'generateStudentReport' }
    ];

    const attendance = { present: 45, absent: 3, rate: 94 };

    updateAttendance(attendance);
    renderClasses(classes);
    renderAssignments(assignments);
    renderStudents(students);
    renderMessages(messages);
    renderReports(reports);
    renderGradeDistribution();
}

function updateAttendance(a) {
    presentCountEl.textContent = a.present;
    absentCountEl.textContent = a.absent;
    attendanceRateEl.textContent = `${a.rate}%`;
}

function renderClasses(items) {
    classesList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'class-item';
        el.innerHTML = `
            <div class="class-meta">
                <div class="icon"><i class="fas fa-chalkboard-teacher"></i></div>
                <div class="class-info">
                    <h4>${item.name}</h4>
                    <p>${item.students} students • ${item.room}</p>
                </div>
            </div>
            <div class="class-actions">
                <button class="btn btn-secondary"><i class="fas fa-clock"></i> ${item.time}</button>
                <button class="btn btn-primary"><i class="fas fa-arrow-right"></i> Open</button>
            </div>`;
        classesList.appendChild(el);
    });
}

function renderAssignments(items) {
    assignmentsList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'assignment-item';
        el.innerHTML = `
            <div class="assignment-info">
                <h4>${item.title}</h4>
                <p>${item.class} • Due: ${item.dueDate} • ${item.submissions} submissions</p>
            </div>
            <div class="assignment-status ${item.status}">${item.status}</div>`;
        assignmentsList.appendChild(el);
    });
}

function renderStudents(items) {
    studentsList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'student-item';
        el.innerHTML = `
            <img src="${item.avatar}" alt="${item.name}" class="student-avatar">
            <div class="student-info">
                <h4>${item.name}</h4>
                <p>${item.grade}</p>
            </div>
            <div class="student-score">${item.score}%</div>`;
        studentsList.appendChild(el);
    });
}

function renderMessages(items) {
    messagesList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'message-item';
        el.innerHTML = `
            <img src="${item.avatar}" alt="${item.sender}" class="message-avatar">
            <div class="message-content">
                <h4>${item.sender} - ${item.subject}</h4>
                <p>${item.message}</p>
                <div class="message-time">${item.time}</div>
            </div>`;
        messagesList.appendChild(el);
    });
    const messagesCount = document.getElementById('messagesCount');
    messagesCount.textContent = String(items.length);
}

function renderReports(items) {
    reportsGrid.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'report-item';
        el.innerHTML = `
            <div class="report-icon"><i class="${item.icon}"></i></div>
            <div class="report-title">${item.title}</div>`;
        el.addEventListener('click', () => generateReport(item.action));
        reportsGrid.appendChild(el);
    });
}

function renderGradeDistribution() {
    const gradeDistribution = document.getElementById('gradeDistribution');
    const grades = [
        { grade: 'A+', count: 15, percentage: 30 },
        { grade: 'A', count: 20, percentage: 40 },
        { grade: 'B+', count: 10, percentage: 20 },
        { grade: 'B', count: 3, percentage: 6 },
        { grade: 'C', count: 2, percentage: 4 }
    ];

    gradeDistribution.innerHTML = '';
    grades.forEach(grade => {
        const el = document.createElement('div');
        el.className = 'grade-bar';
        el.innerHTML = `
            <div class="grade-bar-fill">
                <div class="grade-bar-progress" style="height: ${grade.percentage}%"></div>
            </div>
            <div class="grade-label">${grade.grade}</div>`;
        gradeDistribution.appendChild(el);
    });
}

function generateReport(action) {
    const reportActions = {
        generateClassReport: 'Class Performance Report',
        generateAttendanceReport: 'Attendance Report',
        generateGradeReport: 'Grade Distribution Report',
        generateStudentReport: 'Student Progress Report'
    };
    
    showToast(`Generating ${reportActions[action]}...`);
    setTimeout(() => {
        showToast(`${reportActions[action]} generated successfully!`);
    }, 1500);
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