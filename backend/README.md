# CARE+ Hospital - Backend API

RESTful API for the CARE+ Hospital Management System built with Node.js, Express, and MongoDB.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account
- Stripe account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/careplus

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Run the Server

```bash
# Development
npm start

# Production
npm run production
```

The API will be available at `http://localhost:3000`

## 📁 Project Structure

```
backend/
├── configs/              # Configuration files
│   ├── cloudinary.js    # Cloudinary setup
│   ├── mongoDb.js       # MongoDB connection
│   └── stripe.js        # Stripe configuration
├── controllers/         # Route controllers
│   ├── admin.controller.js
│   ├── appointment.controller.js
│   ├── doctor.controller.js
│   └── user.controller.js
├── middlewares/         # Custom middlewares
│   ├── adminAuth.middleware.js
│   ├── doctorAuth.middleware.js
│   ├── multer.middleware.js
│   └── userAuth.middleware.js
├── models/              # Mongoose models
│   ├── admin.model.js
│   ├── appointment.model.js
│   ├── doctor.model.js
│   └── user.model.js
├── routes/              # API routes
│   ├── admin.route.js
│   ├── appointment.route.js
│   ├── doctor.route.js
│   └── user.route.js
├── utils/               # Utility functions
│   ├── ApiError.js
│   └── ApiResponse.js
├── public/              # Static files
│   └── uploads/         # Uploaded images
└── server.js            # Entry point
```

## 🛣️ API Endpoints

### User Routes (`/api/user`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /check-auth` - Check authentication
- `POST /logout` - User logout
- `POST /my-profile` - Update profile

### Doctor Routes (`/api/doctor`)
- `POST /register` - Register doctor (Admin only)
- `POST /login` - Doctor login
- `GET /all-doctors` - Get all doctors
- `GET /profile/:docId` - Get doctor profile
- `PUT /update-profile` - Update doctor profile
- `GET /appointments` - Get doctor appointments
- `POST /complete-appointment` - Mark appointment complete

### Appointment Routes (`/api/appointment`)
- `POST /book` - Book new appointment
- `GET /my-appointments` - Get user appointments
- `DELETE /cancel/:appointmentId` - Cancel appointment
- `GET /all-appointments` - Get all appointments
- `POST /create-payment-intent` - Create Stripe payment
- `POST /payment-success` - Confirm payment

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor
- `GET /all-doctors` - Get all doctors
- `DELETE /remove-doctor/:docId` - Remove doctor
- `GET /dashboard` - Get dashboard stats

## 🔐 Authentication

### User Authentication
- JWT token stored in HTTP-only cookie
- Token expiration: 7 days
- Middleware: `userAuth`

### Doctor Authentication
- Separate JWT token
- Middleware: `doctorAuth`

### Admin Authentication
- Admin-specific JWT token
- Middleware: `adminAuth`

## 📊 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  gender: String,
  birthday: Date,
  image: String (Cloudinary URL)
}
```

### Doctor
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  speciality: String,
  qualification: String,
  experience: Number,
  about: String,
  available: Boolean,
  fees: Number,
  address: String,
  phone: String,
  hospital: String,
  image: String (Cloudinary URL),
  date: Date
}
```

### Appointment
```javascript
{
  user: ObjectId (ref: User),
  doctor: ObjectId (ref: Doctor),
  slotDate: String,
  slotTime: String,
  fees: Number,
  date: Date,
  cancelled: Boolean,
  payment: Boolean,
  isCompleted: Boolean,
  temperature: String,
  bloodPressure: String,
  weight: String,
  remark: String,
  medicine: [{
    name: String,
    dose: String
  }]
}
```

### Admin
```javascript
{
  email: String (unique),
  password: String (hashed)
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- HTTP-only cookies
- CORS configuration
- Input validation
- Error handling middleware

## 📤 File Upload

- **Multer** for handling multipart/form-data
- **Cloudinary** for cloud storage
- Supported formats: JPG, PNG, JPEG
- Max file size: 5MB

## 💳 Payment Processing

- **Stripe** integration
- Create payment intents
- Confirm payments
- Update appointment payment status

## ⚠️ Error Handling

Custom error handling with `ApiError` class:
- Status codes
- Error messages
- Stack traces (development only)

## 🧪 Testing

```bash
# Add your test command
npm test
```

## 📝 API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success message",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string
- Verify network access

### Cloudinary Upload Failures
- Verify API credentials
- Check file size limits
- Ensure correct file format

### Stripe Payment Issues
- Verify secret key
- Check webhook configuration
- Test with Stripe test cards

## 📄 License

MIT License - see LICENSE file for details