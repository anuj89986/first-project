# CARE+ Hospital - Admin & Doctor Dashboard

Management dashboard for administrators and doctors built with React, TailwindCSS, and Vite.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Application will run at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
manager/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and static files
│   ├── components/     # Reusable components
│   │   ├── AdminSidebar.jsx
│   │   ├── DocNavbar.jsx
│   │   └── Logo.jsx
│   ├── context/        # React Context
│   │   ├── AdminContext.jsx
│   │   └── DocContext.jsx
│   ├── pages/          # Page components
│   │   ├── AddDoctor.jsx
│   │   ├── AdminHome.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AppE.jsx
│   │   ├── Appointments.jsx
│   │   ├── DocAppointments.jsx
│   │   ├── DocHome.jsx
│   │   ├── DocLogin.jsx
│   │   ├── DocProfile.jsx
│   │   ├── Doctors.jsx
│   │   └── Report.jsx
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── config/
│   └── API.js          # Axios configuration
└── index.html
```

## 👨‍💼 Admin Features

### Dashboard ([`src/pages/AdminHome.jsx`](src/pages/AdminHome.jsx))
- Total statistics
- Recent appointments
- Doctor overview
- Patient count

### Add Doctor ([`src/pages/AddDoctor.jsx`](src/pages/AddDoctor.jsx))
- Add new doctors
- Upload doctor image
- Set availability
- Define fees

### Manage Doctors ([`src/pages/Doctors.jsx`](src/pages/Doctors.jsx))
- View all doctors
- Update doctor details
- Remove doctors
- Toggle availability

### View Appointments ([`src/pages/Appointments.jsx`](src/pages/Appointments.jsx))
- All appointments list
- Filter by status
- View patient details
- Appointment analytics

### Admin Login ([`src/pages/AdminLogin.jsx`](src/pages/AdminLogin.jsx))
- Secure authentication
- JWT token management
- Remember me option

## 👨‍⚕️ Doctor Features

### Doctor Dashboard ([`src/pages/DocHome.jsx`](src/pages/DocHome.jsx))
- Today's appointments
- Earnings statistics
- Patient count
- Quick actions

### Doctor Appointments ([`src/pages/DocAppointments.jsx`](src/pages/DocAppointments.jsx))
- View scheduled appointments
- Add vital signs
- Add prescriptions
- Complete appointments

### Doctor Profile ([`src/pages/DocProfile.jsx`](src/pages/DocProfile.jsx))
- Update profile information
- Change availability
- Update fees
- Profile picture

### Medical Report ([`src/pages/Report.jsx`](src/pages/Report.jsx))
- Add vital signs (temperature, BP, weight)
- Write doctor's remarks
- Add prescriptions
- Complete appointment

### Doctor Login ([`src/pages/DocLogin.jsx`](src/pages/DocLogin.jsx))
- Doctor authentication
- JWT token
- Redirect to dashboard

## 🎨 Components

### AdminSidebar ([`src/components/AdminSidebar.jsx`](src/components/AdminSidebar.jsx))
- Navigation menu
- Active route highlighting
- Logout functionality
- Responsive design

### DocNavbar ([`src/components/DocNavbar.jsx`](src/components/DocNavbar.jsx))
- Doctor navigation
- Profile dropdown
- Logout option
- Mobile responsive

### Logo ([`src/components/Logo.jsx`](src/components/Logo.jsx))
- Hospital logo
- Brand identity
- Consistent styling

## 🔐 Authentication Context

### Admin Context ([`src/context/AdminContext.jsx`](src/context/AdminContext.jsx))
```javascript
export const AdminContext = createContext(null);

// Usage
const { admin, setAdmin } = useContext(AdminContext);
```

### Doctor Context ([`src/context/DocContext.jsx`](src/context/DocContext.jsx))
```javascript
export const DocContext = createContext(null);

// Usage
const { doctor, setDoctor } = useContext(DocContext);
```

## 🛣️ Routing

Admin Routes:
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/add-doctor` - Add new doctor
- `/admin/doctors` - Manage doctors
- `/admin/appointments` - View appointments

Doctor Routes:
- `/doctor/login` - Doctor login
- `/doctor/dashboard` - Doctor dashboard
- `/doctor/appointments` - Doctor appointments
- `/doctor/profile` - Doctor profile
- `/doctor/report/:appointmentId` - Add medical report

## 🎯 Features

### Admin Capabilities
✅ Add/remove doctors
✅ View all appointments
✅ Monitor system statistics
✅ Manage doctor availability
✅ View patient information

### Doctor Capabilities
✅ View assigned appointments
✅ Add vital signs
✅ Write prescriptions
✅ Complete appointments
✅ Update profile
✅ View earnings

## 📦 Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.4",
  "axios": "^1.12.2",
  "tailwindcss": "^4.1.16",
  "@tailwindcss/vite": "^4.1.16"
}
```

## 🔌 API Integration

Configured in [`config/API.js`](config/API.js):

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default API;
```

## 🔒 Protected Routes

Both admin and doctor routes are protected:

```javascript
{admin ? (
  <Route path="/admin/dashboard" element={<AdminHome />} />
) : (
  <Route path="/admin/dashboard" element={<Navigate to="/admin/login" />} />
)}
```

## 🎨 Styling

- **TailwindCSS** for styling
- Responsive design patterns
- Custom color schemes
- Consistent spacing

## 🐛 Troubleshooting

### Login Issues
- Verify API URL
- Check credentials
- Clear browser cache
- Review network tab

### Image Upload Problems
- Check file size (max 5MB)
- Verify file format (JPG, PNG)
- Ensure Cloudinary configuration

## 📄 License

MIT License
