// Contact Page - Professional hotel contact page with modern best practices

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: 'booking' | 'general' | 'corporate' | 'feedback';
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  urgency: 'low' | 'medium' | 'high';
}

interface ContactMethod {
  id: string;
  type: 'phone' | 'email' | 'whatsapp' | 'social' | 'emergency';
  label: string;
  value: string;
  icon: string;
  available: boolean;
  priority: number;
}

interface LocationInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  emergency: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
    preferredContact: 'email',
    urgency: 'medium'
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Contact methods
  const contactMethods: ContactMethod[] = [
    {
      id: 'main-phone',
      type: 'phone',
      label: 'Main Phone',
      value: '+1 (555) 123-4567',
      icon: '📞',
      available: true,
      priority: 1
    },
    {
      id: 'reservations',
      type: 'phone',
      label: 'Reservations',
      value: '+1 (555) 123-4568',
      icon: '🏨',
      available: true,
      priority: 2
    },
    {
      id: 'concierge',
      type: 'email',
      label: 'Concierge',
      value: 'concierge@luxurystay.com',
      icon: '📧',
      available: true,
      priority: 3
    },
    {
      id: 'general',
      type: 'email',
      label: 'General Info',
      value: 'info@luxurystay.com',
      icon: '💬',
      available: true,
      priority: 4
    },
    {
      id: 'whatsapp',
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+1 (555) 123-4569',
      icon: '💬',
      available: true,
      priority: 5
    },
    {
      id: 'emergency',
      type: 'phone',
      label: 'Emergency (24/7)',
      value: '+1 (555) 123-4570',
      icon: '🚨',
      available: true,
      priority: 0
    }
  ];

  // Location information
  const locationInfo: LocationInfo = {
    address: '123 Luxury Avenue, Downtown District, City 10001, Country',
    phone: '+1 (555) 123-4567',
    email: 'info@luxurystay.com',
    hours: {
      monday: { open: '07:00', close: '23:00' },
      tuesday: { open: '07:00', close: '23:00' },
      wednesday: { open: '07:00', close: '23:00' },
      thursday: { open: '07:00', close: '23:00' },
      friday: { open: '07:00', close: '23:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    emergency: '+1 (555) 123-4570'
  };

  const inquiryTypes = [
    { value: 'booking', label: 'Room Booking', description: 'Reservation inquiries and availability' },
    { value: 'general', label: 'General Information', description: 'Questions about services and amenities' },
    { value: 'corporate', label: 'Corporate Events', description: 'Business meetings, conferences, and events' },
    { value: 'feedback', label: 'Feedback & Suggestions', description: 'Tell us about your experience' }
  ];

  const preferredContactTypes = [
    { value: 'email', label: 'Email', time: 'Within 24 hours' },
    { value: 'phone', label: 'Phone Call', time: 'Within 4 hours' },
    { value: 'whatsapp', label: 'WhatsApp', time: 'Within 2 hours' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'green', description: 'General inquiry within 48 hours' },
    { value: 'medium', label: 'Medium Priority', color: 'yellow', description: 'Important inquiry within 24 hours' },
    { value: 'high', label: 'High Priority', color: 'red', description: 'Urgent inquiry within 4 hours' }
  ];

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if hotel is currently open
  const isHotelOpen = () => {
    const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const dayHours = locationInfo.hours[currentDay as keyof typeof locationInfo.hours];
    if (!dayHours) return false;

    const [openHour, openMinute] = dayHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = dayHours.close.split(':').map(Number);
    
    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;

    return currentTimeInMinutes >= openMinutes && currentTimeInMinutes <= closeMinutes;
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        message: '',
        preferredContact: 'email',
        urgency: 'medium'
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Design System and Background Image */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="object-cover w-full h-full opacity-30"
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
            alt="Luxury hotel interior with elegant furnishings"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-50 mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              We're here to help with any questions about your stay or our services
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-yellow-300">
                Available 24/7
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm border ${isHotelOpen() ? 'bg-green-500 text-white border-green-400' : 'bg-gray-600 text-white border-gray-500'}`}>
                {isHotelOpen() ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-gray-600">
              Choose your preferred method of contact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">{method.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {method.label}
                        </h3>
                        {method.type === 'emergency' && (
                          <span className="text-xs text-red-600 font-medium">24/7</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-800 font-medium">
                        {method.value}
                      </p>
                      {method.type === 'whatsapp' && (
                        <p className="text-xs text-green-600">
                          WhatsApp available for quick messages
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {method.type === 'phone' ? 'Call us anytime' : 'Send us a message'}
                      </p>
                    </div>

                    <div className="pt-4">
                      {method.type === 'phone' ? (
                        <a
                          href={`tel:${method.value}`}
                          className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            method.label.includes('Emergency')
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}
                        >
                          {method.label.includes('Emergency') ? 'Emergency Call' : 'Call Now'}
                        </a>
                      ) : method.type === 'email' ? (
                        <a
                          href={`mailto:${method.value}`}
                          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                        >
                          Send Email
                        </a>
                      ) : method.type === 'whatsapp' ? (
                        <a
                          href={`https://wa.me/${method.value.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          WhatsApp
                        </a>
                      ) : (
                        <Button variant="outline" size="sm">
                          {method.type === 'social' ? 'Follow' : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Location & Hours
            </h2>
            <p className="text-lg text-gray-600">
              Find us and our operating hours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">📍</span>
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600">{locationInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">📞</span>
                        <div>
                          <p className="font-medium text-gray-900">Main Phone</p>
                          <p className="text-gray-600">{locationInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">📧</span>
                        <div>
                          <p className="font-medium text-gray-900">General Email</p>
                          <p className="text-gray-600">{locationInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">🚨</span>
                        <div>
                          <p className="font-medium text-gray-900 text-red-600">Emergency Contact</p>
                          <p className="text-red-600">{locationInfo.emergency}</p>
                          <p className="text-xs text-gray-500">Available 24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                    <div className="space-y-3">
                      {Object.entries(locationInfo.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-900 capitalize">{day}</span>
                          <span className="text-gray-600">{hours.open} - {hours.close}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Current Time:</strong> {currentTime.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                        • {isHotelOpen() ? '✅ Hotel is Open' : '❌ Hotel is Closed'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Us a Message</h3>
                
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        error={errors.name}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        error={errors.email}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      error={errors.phone}
                    />
                  </div>

                  {/* Inquiry Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        {preferredContactTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label} - {type.time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {urgencyLevels.map(level => (
                        <label key={level.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="urgency"
                            value={level.value}
                            checked={formData.urgency === level.value}
                            onChange={(e) => handleInputChange('urgency', e.target.value)}
                            className="text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className={`text-sm ${level.color === 'red' ? 'text-red-600' : level.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
                            {level.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gray-900 hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>

                {/* Additional Contact Info */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Need immediate assistance?</strong> Call our 24/7 guest services at{' '}
                    <a href={`tel:${locationInfo.emergency}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {locationInfo.emergency}
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Us On The Map
            </h2>
            <p className="text-lg text-gray-600">
              Easy to find, hard to forget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl text-white">📍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Interactive Map</h3>
                  <p className="text-gray-600">
                    Google Maps integration would be displayed here
                  </p>
                  <p className="text-sm text-gray-500">
                    {locationInfo.address}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(!showMap)}
                    className="border-gray-400 text-gray-700 hover:bg-gray-100"
                  >
                    {showMap ? 'Hide Map' : 'View Map'}
                  </Button>
                </div>
              </div>

              {/* Directions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Getting Here</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>By Car:</strong> Easy access from major highways with valet parking available
                  </p>
                  <p className="text-gray-600">
                    <strong>By Public Transport:</strong> 5-minute walk from Central Station
                  </p>
                  <p className="text-gray-600">
                    <strong>By Air:</strong> 30-minute drive from International Airport
                  </p>
                  <p className="text-gray-600">
                    <strong>Taxi:</strong> Ask for "LuxuryStay Hotel Downtown"
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(locationInfo.address)}`, '_blank')}
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Get Directions on Google Maps
                </Button>
              </div>
            </motion.div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Airport Transfers</h4>
                      <p className="text-gray-600 text-sm">
                        Luxury vehicle service available for airport pick-up and drop-off
                      </p>
                      <p className="text-xs text-gray-500">Advance booking recommended</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Concierge Services</h4>
                      <p className="text-gray-600 text-sm">
                        Restaurant reservations, tour bookings, and local recommendations
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Loyalty Program</h4>
                      <p className="text-gray-600 text-sm">
                        Exclusive benefits and rewards for frequent guests
                      </p>
                      <Link to="/login" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Join now →
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQs */}
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer">
                        <span className="font-medium text-gray-900">What's the check-in/check-out time?</span>
                        <span className="text-gray-400 group-open:hidden">+</span>
                        <span className="text-gray-400 group-open:block hidden">−</span>
                      </summary>
                      <div className="mt-2 text-gray-600 text-sm">
                        <p>Check-in: 3:00 PM | Check-out: 11:00 AM</p>
                        <p>Early check-in and late check-out available upon request (subject to availability)</p>
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer">
                        <span className="font-medium text-gray-900">Is parking available?</span>
                        <span className="text-gray-400 group-open:hidden">+</span>
                        <span className="text-gray-400 group-open:block hidden">−</span>
                      </summary>
                      <div className="mt-2 text-gray-600 text-sm">
                        <p>Yes, secure underground parking is available for $25 per night</p>
                        <p>Valet parking service also available for $35 per night</p>
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer">
                        <span className="font-medium text-gray-900">Do you have pet-friendly rooms?</span>
                        <span className="text-gray-400 group-open:hidden">+</span>
                        <span className="text-gray-400 group-open:block hidden">−</span>
                      </summary>
                      <div className="mt-2 text-gray-600 text-sm">
                        <p>Yes, we have designated pet-friendly rooms for a $50 cleaning fee</p>
                        <p>Maximum 2 pets, weight limit 50 lbs per pet</p>
                      </div>
                    </details>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Contact Us?
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Get in touch today and let us help you plan your perfect stay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rooms">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Browse Rooms
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
