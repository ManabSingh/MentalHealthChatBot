import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 via-white to-soft-green-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Your Mental Health
              <span className="text-calm-blue-600 block">Matters</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed">
              A safe, supportive space for students to find resources, connect with others, 
              and prioritize their mental wellbeing. You're not alone in this journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/resources"
                className="bg-calm-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-calm-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Find Resources
              </Link>
              <Link
                to="/chat-support"
                className="bg-soft-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-soft-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How We Can Help
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers comprehensive support for students facing mental health challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-calm-blue-50 hover:bg-calm-blue-100 transition-colors duration-300">
              <div className="w-16 h-16 bg-calm-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resources Library</h3>
              <p className="text-gray-600">
                Access curated articles, guides, and tools for managing stress, anxiety, and academic pressure.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-soft-green-50 hover:bg-soft-green-100 transition-colors duration-300">
              <div className="w-16 h-16 bg-soft-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Anonymous Chat</h3>
              <p className="text-gray-600">
                Connect with trained peer supporters in a safe, anonymous chat environment.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-lavender-50 hover:bg-lavender-100 transition-colors duration-300">
              <div className="w-16 h-16 bg-lavender-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Self-Care Tools</h3>
              <p className="text-gray-600">
                Discover mindfulness exercises, breathing techniques, and daily wellness practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-calm-blue-600 to-soft-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Prioritize Your Mental Health?
          </h2>
          <p className="text-xl text-calm-blue-100 mb-8">
            Take the first step towards better mental wellbeing. Our resources and support are here for you.
          </p>
          <Link
            to="/about"
            className="bg-white text-calm-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
