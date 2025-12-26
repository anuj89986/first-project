# CARE+ Hospital Management System

A comprehensive full-stack hospital management system built with MERN stack, enabling patients to book appointments, doctors to manage consultations, and administrators to oversee operations.

## 🏗️ Project Structure

```
├── backend/          # Node.js Express server & API
├── frontend/         # Patient-facing React application
└── manager/          # Admin & Doctor management dashboard
```

## ✨ Features

### Patient Portal (Frontend)
- 🔐 User authentication (Sign up/Login)
- 👨‍⚕️ Browse doctors by specialty
- 📅 Book appointments with available time slots
- 💳 Secure payment integration with Stripe
- 📋 View appointment history
- 📄 Access medical reports and prescriptions
- 👤 Manage user profile

### Doctor Portal (Manager)
- 📊 View and manage appointments
- 🩺 Add vital signs and prescriptions
- 📝 Generate patient reports
- 👨‍⚕️ Update doctor profile
- 📈 Dashboard with appointment statistics

### Admin Portal (Manager)
- ➕ Add/remove doctors
- 📋 View all appointments
- 👥 Manage users and doctors
- 📊 System overview and analytics

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary
- **Payment:** Stripe

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS 4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Forms:** React Hook Form

### Manager (Admin/Doctor Dashboard)
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS 4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Configure environment variables (see Backend README)

npm start
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Add VITE_API_URL=http://localhost:3000

npm run dev
```

### Manager Setup

```bash
cd manager
npm install

# Create .env file
# Add VITE_API_URL=http://localhost:3000

npm run dev
```

## 🌐 Application URLs

- **Backend API:** http://localhost:3000
- **Patient Portal:** http://localhost:5173
- **Admin/Doctor Portal:** http://localhost:5174

## 📚 Documentation

Detailed documentation for each component:
- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [Manager Documentation](manager/README.md)

## 🔑 Environment Variables

Each application requires specific environment variables. See individual README files for details.

## 🗂️ Database Schema

### User Model
- Name, Email, Password
- Phone, Address, Gender, DOB
- Profile Image

### Doctor Model
- Name, Email, Password
- Specialty, Qualification, Experience
- Hospital, Address, Phone
- Availability, Fees

### Appointment Model
- User, Doctor references
- Date, Time, Status
- Vital Signs, Prescriptions
- Payment Status

### Admin Model
- Email, Password

## 🔐 Authentication

- **JWT-based** authentication
- Separate auth for Users, Doctors, and Admins
- Token stored in HTTP-only cookies

## 💳 Payment Integration

- **Stripe** payment gateway
- Secure payment processing
- Payment confirmation

## 📸 Image Upload

- **Cloudinary** integration
- Profile images
- Doctor images

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Anuj**

## 🙏 Acknowledgments

- React team for amazing frontend library
- TailwindCSS for utility-first CSS framework
- Stripe for payment processing
- Cloudinary for image hosting