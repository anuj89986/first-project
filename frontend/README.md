# CARE+ Hospital - Patient Portal

Modern, responsive patient portal built with React, TailwindCSS, and Vite.

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
STRIPE_KEY=pk_test_your_stripe_publishable_key
```

### Development

```bash
npm run dev
```

Application will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   ├── doctorPic/      # Doctor images
│   └── icons/          # App icons
├── src/
│   ├── assets/         # JavaScript assets
│   │   ├── Doctors.js  # Doctor data
│   │   └── SpecDetalis/
│   ├── components/     # Reusable components
│   │   ├── AnotherBanner.jsx
│   │   ├── Banner.jsx
│   │   ├── FindBanner.jsx
│   │   ├── Footer.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   ├── RelatedDoctor.jsx
│   │   └── Speciality.jsx
│   ├── context/        # React Context
│   │   ├── AppContext.js
│   │   └── AuthContext.js
│   ├── pages/          # Page components
│   │   ├── About.jsx
│   │   ├── Appointment.jsx
│   │   ├── CheckoutForm.jsx
│   │   ├── Contact.jsx
│   │   ├── Doctor.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyAppointment.jsx
│   │   ├── MyProfile.jsx
│   │   ├── Payment.jsx
│   │   ├── Report.jsx
│   │   └── SignUp.jsx
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── config/
│   └── API.js          # Axios configuration
└── index.html
```

## 🎨 Features

### Home Page
- Hero banner with call-to-action
- Specialty browsing
- Featured doctors
- Appointment booking CTA

### Doctor Browsing ([`src/pages/Doctor.jsx`](src/pages/Doctor.jsx))
- Filter by specialty
- View doctor profiles
- Check availability
- Responsive sidebar navigation

### Appointment Booking ([`src/pages/Appointment.jsx`](src/pages/Appointment.jsx))
- Select appointment date
- Choose time slot
- View doctor details
- Book appointments

### User Authentication
- Sign up ([`src/pages/SignUp.jsx`](src/pages/SignUp.jsx))
- Login ([`src/pages/Login.jsx`](src/pages/Login.jsx))
- Password validation
- Error handling

### User Profile ([`src/pages/MyProfile.jsx`](src/pages/MyProfile.jsx))
- View/edit personal information
- Update contact details
- Change profile picture
- Update date of birth

### My Appointments ([`src/pages/MyAppointment.jsx`](src/pages/MyAppointment.jsx))
- View upcoming appointments
- View past appointments
- Cancel appointments
- Payment status

### Payment Integration ([`src/pages/Payment.jsx`](src/pages/Payment.jsx))
- Stripe checkout
- Secure payment processing
- Payment confirmation

### Medical Reports ([`src/pages/Report.jsx`](src/pages/Report.jsx))
- View patient information
- Vital signs
- Doctor's remarks
- Prescriptions

## 🎨 Styling

### TailwindCSS
- Utility-first CSS framework
- Custom configuration
- Responsive design
- Dark mode support

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🔌 API Integration

API client configured in [`config/API.js`](config/API.js):

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});
```

## 🔐 Authentication Context

Managed in [`src/context/AuthContext.js`](src/context/AuthContext.js):

```javascript
export const AuthContext = createContext(null);

// Usage
const { user, setUser } = useContext(AuthContext);
```

## 📱 Components

### Navbar ([`src/components/Navbar.jsx`](src/components/Navbar.jsx))
- Responsive navigation
- User dropdown menu
- Mobile menu
- Logo component

### Banner ([`src/components/Banner.jsx`](src/components/Banner.jsx))
- Hero section
- CTA buttons
- Scroll to specialty

### Speciality ([`src/components/Speciality.jsx`](src/components/Speciality.jsx))
- Specialty cards
- Click to filter doctors
- Hover effects

### Footer ([`src/components/Footer.jsx`](src/components/Footer.jsx))
- Company links
- Contact information
- Social media links

## 🛣️ Routing

Routes defined in [`src/App.jsx`](src/App.jsx):

- `/` - Home
- `/about` - About page
- `/contact` - Contact page
- `/doctor` - All doctors
- `/doctor/:specialist` - Doctors by specialty
- `/appointment/:docId` - Book appointment
- `/login` - Login
- `/sign-up` - Sign up
- `/my-profile` - User profile (protected)
- `/my-appointments` - User appointments (protected)
- `/report/:appointmentId` - Medical report (protected)
- `/payment` - Payment page (protected)

## 🔒 Protected Routes

Routes requiring authentication redirect to `/login`:

```javascript
{user ? (
  <Route path="/my-profile" element={<MyProfile />} />
) : (
  <Route path="/my-profile" element={<Navigate to="/login" />} />
)}
```

## 🎯 State Management

### Global State
- **AppContext**: Doctors list
- **AuthContext**: User authentication

### Local State
- Form inputs
- Loading states
- Error messages
- UI toggles

## 📦 Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.4",
  "axios": "^1.12.2",
  "tailwindcss": "^4.1.16",
  "@tailwindcss/vite": "^4.1.16",
  "react-hook-form": "^7.65.0",
  "@stripe/react-stripe-js": "^2.0.0",
  "@stripe/stripe-js": "^2.0.0"
}
```

## 🐛 Troubleshooting

### API Connection Issues
- Verify `VITE_API_URL` in `.env`
- Check backend server is running
- Review CORS configuration

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Stripe Integration
- Verify publishable key
- Test with Stripe test cards
- Check console for errors

## 📄 License

MIT License
