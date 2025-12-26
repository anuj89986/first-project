import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../config/API'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await API.post('/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      navigate('/login')
      alert('Sign up successful! Please login.')
    } catch (error) {
      alert('Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 bg-gray-50 py-8 md:py-0'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-lg shadow-lg p-6 md:p-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center'>
            Create Account
          </h1>

          <form onSubmit={handleSignUp} className='space-y-4 md:space-y-6'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm md:text-base'>
                Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm md:text-base'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm md:text-base'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2 text-sm md:text-base'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-3 md:py-4 px-4 rounded-lg transition-colors duration-300 text-base md:text-lg'
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className='text-center text-gray-600 text-sm md:text-base mt-4 md:mt-6'>
            Already have an account?{' '}
            <a href='/login' className='text-blue-500 hover:text-blue-600 font-semibold'>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp