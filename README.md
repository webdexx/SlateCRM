# School Management System - Login Page

A modern, futuristic, and minimalistic login page for the School Management System built with HTML, CSS, and JavaScript.

## Features

### 🎨 Modern Design
- **Split-screen layout** with promotional slider on the left and login form on the right
- **Glassmorphism effects** with backdrop blur and transparency
- **Smooth animations** and transitions throughout the interface
- **Responsive design** that works on all device sizes
- **Futuristic color scheme** with gradients and glowing effects

### 🔄 Interactive Slider
- **Auto-rotating promotional content** every 4 seconds
- **Manual navigation** with clickable dots
- **Smooth transitions** between slides
- **Educational content** highlighting system features

### 🔐 Authentication System
- **Role-based login** supporting multiple user types
- **JSON-based user database** for easy management
- **Form validation** with real-time feedback
- **Loading states** and success/error notifications
- **Session storage** for user data persistence

### 🎯 User Roles & Access
- **Administrator** - Full system access
- **Teacher** - Staff management interface
- **Accounts** - Financial management
- **Student** - Student portal access
- **Parent** - Parent portal access

## File Structure

```
SMS/
├── index.html          # Main login page
├── css/
│   └── login.css       # Styling for login page
├── js/
│   ├── login.js        # Login functionality
│   └── users.json      # User database
├── admin/              # Administrator dashboard
├── staff/              # Staff/Teacher dashboard
├── student/            # Student portal
├── parent/             # Parent portal
└── assets/             # Additional assets
```

## Test Credentials

### Administrator
- **ID:** `admin001`
- **Password:** `admin123`
- **Redirects to:** `/admin/`

### Teacher
- **ID:** `teacher001`
- **Password:** `teacher123`
- **Redirects to:** `/staff/`

### Accountant
- **ID:** `accountant001`
- **Password:** `account123`
- **Redirects to:** `/staff/`

### Student
- **ID:** `student001`
- **Password:** `student123`
- **Redirects to:** `/student/`

### Parent
- **ID:** `parent001`
- **Password:** `parent123`
- **Redirects to:** `/parent/`

## Getting Started

1. **Open the project** in your web browser
2. **Navigate to** `index.html`
3. **Use any of the test credentials** above to log in
4. **Experience the smooth animations** and modern interface

## Features in Detail

### 🎨 Visual Design
- **Gradient backgrounds** with animated particles
- **Glassmorphism login form** with backdrop blur
- **Floating animations** for icons and elements
- **Hover effects** and micro-interactions
- **Toast notifications** for user feedback

### 🔧 Technical Features
- **Pure JavaScript** - No frameworks required
- **Async/await** for data loading
- **Event-driven architecture** for smooth interactions
- **Local storage** for session management
- **Responsive breakpoints** for mobile devices

### 🛡️ Security Features
- **Input validation** and sanitization
- **Password visibility toggle**
- **Session management** with storage
- **Role-based access control**
- **Secure redirects** based on user roles

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Customization

### Adding New Users
Edit `js/users.json` to add new users:

```json
{
  "id": "newuser001",
  "password": "password123",
  "role": "teacher",
  "name": "New Teacher",
  "email": "newteacher@school.com",
  "department": "English"
}
```

### Modifying Styles
Edit `css/login.css` to customize:
- Color schemes
- Animations
- Layout dimensions
- Typography

### Updating Content
Edit `index.html` to modify:
- Slider content
- Form labels
- Branding elements

## Future Enhancements

- [ ] **Two-factor authentication**
- [ ] **Password reset functionality**
- [ ] **Remember me option**
- [ ] **Dark/Light theme toggle**
- [ ] **Multi-language support**
- [ ] **Advanced analytics dashboard**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for modern education management** 