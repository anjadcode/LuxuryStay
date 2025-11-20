// About Page - Professional hotel about page with modern best practices

import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  social?: { linkedin?: string; twitter?: string };
}

interface Award {
  id: number;
  title: string;
  year: string;
  organization: string;
  image: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  verified: boolean;
}

// Removed unused Facility interface and related code

const AboutPage: React.FC = () => {
  // Team data
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "General Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200&h=200&fit=crop&crop=face",
      bio: "With 15+ years in luxury hospitality, Sarah leads our team with passion for exceptional guest experiences.",
      social: { linkedin: "https://linkedin.com/in/sarah-johnson" }
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Executive Chef",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Michelin-starred chef bringing world-class culinary experiences to every guest.",
      social: { twitter: "https://twitter.com/michael-chen" }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Guest Relations Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Dedicated to creating memorable experiences and ensuring every guest feels valued.",
      social: { linkedin: "https://linkedin.com/in/emily-rodriguez" }
    },
    {
      id: 4,
      name: "David Kim",
      position: "Facilities Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Ensuring our facilities meet the highest standards of comfort and luxury.",
      social: { linkedin: "https://linkedin.com/in/david-kim" }
    }
  ];

  // Awards and recognition
  const awards: Award[] = [
    {
      id: 1,
      title: "Best Luxury Hotel Award",
      year: "2024",
      organization: "Hospitality Excellence Awards",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&h=200&fit=crop",
      description: "Recognized for outstanding service and luxury amenities"
    },
    {
      id: 2,
      title: "5-Star Rating Certification",
      year: "2024",
      organization: "Forbes Travel Guide",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      description: "Consistent 5-star rating for exceptional guest experiences"
    },
    {
      id: 3,
      title: "Green Hotel Certification",
      year: "2023",
      organization: "Sustainable Tourism Association",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
      description: "Eco-friendly practices and sustainability excellence"
    },
    {
      id: 4,
      title: "Culinary Excellence Award",
      year: "2023",
      organization: "Gourmet Magazine",
      image: "https://images.unsplash.com/photo-1559339356-6e1b5fc35b9a?w=300&h=200&fit=crop",
      description: "Outstanding culinary experiences and innovative dining"
    }
  ];

  // Guest testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Williams",
      rating: 5,
      comment: "Absolutely stunning property with exceptional service. Every detail was perfect from check-in to check-out. The staff went above and beyond to make our anniversary special.",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "The attention to detail at LuxuryStay is unmatched. From the elegant rooms to the world-class spa, every moment was exceptional. We'll definitely be returning.",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Perfect location with incredible amenities. The rooftop pool and spa were amazing, and the restaurant exceeded all expectations. Highly recommend!",
      date: "3 weeks ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      rating: 5,
      comment: "LuxuryStay redefines hospitality. The personalized service, beautiful design, and attention to every detail made our stay unforgettable. Best hotel experience ever.",
      date: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      verified: true
    }
  ];

  // Removed unused facilities array

  // Stats data
  const stats = [
    { label: "Years of Excellence", value: 25, suffix: "+" },
    { label: "Guest Rooms", value: 150, suffix: "+" },
    { label: "Team Members", value: 200, suffix: "+" },
    { label: "Guest Satisfaction", value: 98, suffix: "%" }
  ];

  // Mission and values
  const mission = {
    title: "Our Mission",
    description: "To create extraordinary experiences that exceed our guests' expectations through impeccable service, attention to detail, and genuine hospitality. We strive to be the premier destination for luxury travel.",
    values: [
      { title: "Excellence", description: "We pursue perfection in every detail" },
      { title: "Hospitality", description: "We treat every guest as family" },
      { title: "Innovation", description: "We constantly evolve and improve" },
      { title: "Sustainability", description: "We care for our planet and community" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section - Matching ContactPage Design */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-800">
        {/* Background Image with Overlay - Matching ContactPage Style */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
            alt="LuxuryStay Hotel Interior"
            className="object-cover w-full h-full opacity-30"
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
              About LuxuryStay
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              Discover our story, values, and commitment to exceptional hospitality
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-yellow-300">
                25+ Years Legacy
              </span>
              <span className="bg-blue-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-300">
                Award-Winning Service
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Design System */}
      <section className="py-16 bg-neutral-900 text-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-400">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-neutral-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Values with Design System */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                {mission.description}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Hotel Interior"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-neutral-900">{mission.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mission.values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-neutral-100 p-6 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition with Design System */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence has been recognized by the industry's leading organizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                        {award.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {award.title}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">
                      {award.organization}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {award.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Our dedicated team of hospitality professionals committed to your satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
                {member.social && (
                  <div className="flex justify-center space-x-3 mt-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-300">
              Real experiences from our valued guests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {testimonial.verified && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {testimonial.comment}
                    </p>
                    <div className="text-xs text-gray-400">
                      {testimonial.date}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Experience Luxury Like Never Before
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Book your stay today and discover why we're the preferred choice for luxury travelers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rooms">
                <Button variant="primary" size="lg" className="bg-gray-900 hover:bg-black text-white">
                  View Rooms
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Environmental Responsibility
              </h3>
              <p className="text-gray-600">
                Committed to sustainability with eco-friendly practices, renewable energy, and community partnerships.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Engagement
              </h3>
              <p className="text-gray-600">
                Supporting local businesses, hiring local talent, and contributing to community development initiatives.
              </p>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Continuous Innovation
              </h3>
              <p className="text-gray-600">
                Constantly evolving with new technologies, services, and experiences to exceed guest expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
