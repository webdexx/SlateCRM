// Accountant Portal JavaScript

// Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const toastContainer = document.getElementById('toastContainer');

// Accountant elements
const accountantNameEls = [
    document.getElementById('accountantName'),
    document.getElementById('accountantFullName'),
    document.getElementById('headerAccountantName')
];
const accountantDepartmentEl = document.getElementById('accountantDepartment');

// Sections
const paymentsList = document.getElementById('paymentsList');
const studentsList = document.getElementById('studentsList');
const transactionsList = document.getElementById('transactionsList');
const reportsGrid = document.getElementById('reportsGrid');
const expensesChart = document.getElementById('expensesChart');
const quickActionsGrid = document.getElementById('quickActionsGrid');

// Financial stats
const totalRevenueEl = document.getElementById('totalRevenue');
const pendingFeesEl = document.getElementById('pendingFees');
const monthlyPaymentsEl = document.getElementById('monthlyPayments');
const totalExpensesEl = document.getElementById('totalExpenses');

document.addEventListener('DOMContentLoaded', function() {
    guardRoute();
    initializeUI();
    loadAccountantData();
});

function guardRoute() {
    const currentUserRaw = sessionStorage.getItem('currentUser');
    if (!currentUserRaw) {
        window.location.href = '/';
        return;
    }
    const currentUser = JSON.parse(currentUserRaw);
    if (currentUser.role !== 'accounts') {
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
    const refreshFees = document.getElementById('refreshFees');
    const refreshTransactions = document.getElementById('refreshTransactions');
    const generateReport = document.getElementById('generateReport');
    const addTransaction = document.getElementById('addTransaction');
    const viewAllStudents = document.getElementById('viewAllStudents');

    refreshFees.addEventListener('click', function() {
        loadFeeStatus();
        showToast('Fee status refreshed');
    });
    refreshTransactions.addEventListener('click', function() {
        loadTransactions();
        showToast('Transactions refreshed');
    });
    generateReport.addEventListener('click', function() {
        showToast('Generating financial report...');
        setTimeout(() => showToast('Report generated successfully!'), 1500);
    });
    addTransaction.addEventListener('click', function() {
        showToast('Opening transaction form...');
    });
    viewAllStudents.addEventListener('click', function() {
        showToast('Loading all students...');
    });

    // Responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('show');
        }
    });
}

function loadAccountantData() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    accountantNameEls.forEach(el => el && (el.textContent = currentUser.name));
    if (currentUser.department) {
        accountantDepartmentEl.textContent = currentUser.department;
    } else {
        accountantDepartmentEl.textContent = 'Finance Department';
    }

    // Simulated financial data
    const payments = [
        { student: 'Mike Wilson', amount: 10000, date: 'Sep 10, 2024', method: 'Online Transfer' },
        { student: 'Lisa Chen', amount: 10000, date: 'Sep 9, 2024', method: 'Cash' },
        { student: 'John Smith', amount: 10000, date: 'Sep 8, 2024', method: 'Cheque' },
        { student: 'Sarah Johnson', amount: 10000, date: 'Sep 7, 2024', method: 'Online Transfer' }
    ];

    const students = [
        { name: 'Mike Wilson', grade: '10th Grade', status: 'paid', amount: 10000, avatar: '/assets/student1.jpg' },
        { name: 'Lisa Chen', grade: '11th Grade', status: 'paid', amount: 10000, avatar: '/assets/student2.jpg' },
        { name: 'John Smith', grade: '10th Grade', status: 'pending', amount: 10000, avatar: '/assets/student3.jpg' },
        { name: 'Sarah Johnson', grade: '11th Grade', status: 'overdue', amount: 10000, avatar: '/assets/student4.jpg' }
    ];

    const transactions = [
        { description: 'Fee Payment - Mike Wilson', amount: 10000, type: 'credit', date: 'Sep 10, 2024' },
        { description: 'School Supplies Purchase', amount: 3750, type: 'debit', date: 'Sep 9, 2024' },
        { description: 'Fee Payment - Lisa Chen', amount: 10000, type: 'credit', date: 'Sep 8, 2024' },
        { description: 'Maintenance Expense', amount: 2670, type: 'debit', date: 'Sep 7, 2024' }
    ];

    const reports = [
        { title: 'Monthly Revenue', icon: 'fas fa-chart-line', action: 'generateMonthlyRevenue' },
        { title: 'Fee Collection', icon: 'fas fa-money-bill-wave', action: 'generateFeeCollection' },
        { title: 'Expense Report', icon: 'fas fa-receipt', action: 'generateExpenseReport' },
        { title: 'Student Ledger', icon: 'fas fa-users', action: 'generateStudentLedger' }
    ];

    const expenses = [
        { category: 'Staff Salaries', amount: 150000, percentage: 56 },
        { category: 'Utilities', amount: 29200, percentage: 11 },
        { category: 'Maintenance', amount: 23400, percentage: 9 },
        { category: 'Supplies', amount: 18400, percentage: 7 },
        { category: 'Other', amount: 46800, percentage: 17 }
    ];

    const quickActions = [
        { title: 'Record Payment', icon: 'fas fa-plus-circle', action: 'recordPayment' },
        { title: 'Send Reminder', icon: 'fas fa-bell', action: 'sendReminder' },
        { title: 'Generate Invoice', icon: 'fas fa-file-invoice', action: 'generateInvoice' },
        { title: 'View Reports', icon: 'fas fa-chart-bar', action: 'viewReports' }
    ];

    updateFinancialStats();
    renderPayments(payments);
    renderStudents(students);
    renderTransactions(transactions);
    renderReports(reports);
    renderExpenses(expenses);
    renderQuickActions(quickActions);
}

function updateFinancialStats() {
    // These would typically come from API calls
    totalRevenueEl.textContent = '₹10,45,000';
    pendingFeesEl.textContent = '₹73,000';
    monthlyPaymentsEl.textContent = '₹3,77,000';
    totalExpensesEl.textContent = '₹2,68,000';
}

function renderPayments(items) {
    paymentsList.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.student}</td>
            <td class="payment-amount">₹${item.amount.toLocaleString()}</td>
            <td><span class="payment-method">${item.method}</span></td>
            <td>${item.date}</td>
            <td><span class="payment-status completed">Completed</span></td>`;
        paymentsList.appendChild(row);
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
                <p>${item.grade} • ₹${item.amount.toLocaleString()}</p>
            </div>
            <div class="student-status ${item.status}">${item.status}</div>`;
        studentsList.appendChild(el);
    });
}

function renderTransactions(items) {
    transactionsList.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'transaction-item';
        el.innerHTML = `
            <div class="transaction-info">
                <h4>${item.description}</h4>
                <p>${item.date}</p>
            </div>
            <div class="transaction-amount ${item.type}">₹${item.amount.toLocaleString()}</div>`;
        transactionsList.appendChild(el);
    });
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

function renderExpenses(items) {
    expensesChart.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'expense-item';
        el.innerHTML = `
            <div class="expense-info">
                <h4>${item.category}</h4>
                <p>${item.percentage}% of total</p>
            </div>
            <div class="expense-amount">₹${item.amount.toLocaleString()}</div>`;
        expensesChart.appendChild(el);
    });
}

function renderQuickActions(items) {
    quickActionsGrid.innerHTML = '';
    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'action-item';
        el.innerHTML = `
            <div class="action-icon"><i class="${item.icon}"></i></div>
            <div class="action-title">${item.title}</div>`;
        el.addEventListener('click', () => performAction(item.action));
        quickActionsGrid.appendChild(el);
    });
}

function generateReport(action) {
    const reportActions = {
        generateMonthlyRevenue: 'Monthly Revenue Report',
        generateFeeCollection: 'Fee Collection Report',
        generateExpenseReport: 'Expense Report',
        generateStudentLedger: 'Student Ledger Report'
    };
    
    showToast(`Generating ${reportActions[action]}...`);
    setTimeout(() => {
        showToast(`${reportActions[action]} generated successfully!`);
    }, 1500);
}

function performAction(action) {
    const actions = {
        recordPayment: 'Opening payment recording form...',
        sendReminder: 'Sending fee payment reminders...',
        generateInvoice: 'Generating invoice...',
        viewReports: 'Loading financial reports...'
    };
    
    showToast(actions[action]);
    setTimeout(() => {
        showToast('Action completed successfully!');
    }, 1000);
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