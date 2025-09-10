import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-soft-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About MindCare
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dedicated to supporting student mental health through accessible resources, 
            peer support, and a compassionate community that understands your journey.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that every student deserves access to mental health support. Our platform 
                was created by students, for students, to provide a safe space where you can find 
                resources, connect with peers, and prioritize your wellbeing without judgment.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mental health challenges don't define you - and you don't have to face them alone. 
                We're here to help you thrive during your academic journey and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-br from-calm-blue-100 to-soft-green-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growing Together</h3>
                <p className="text-gray-600">
                  Like a plant needs the right environment to flourish, your mental health deserves 
                  proper care, attention, and support to help you grow stronger every day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-calm-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compassion</h3>
              <p className="text-gray-600">
                We approach every interaction with empathy, understanding that everyone's mental health journey is unique and valid.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-soft-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy</h3>
              <p className="text-gray-600">
                Your privacy and confidentiality are paramount. We provide anonymous support options and secure, judgment-free spaces.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Mental health support should be available to everyone. Our resources are free, accessible, and designed for all students.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Empowerment</h3>
              <p className="text-gray-600">
                We provide tools and knowledge to help you take control of your mental health and build resilience for the future.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Student-Centered</h3>
              <p className="text-gray-600">
                Created by students who understand the unique challenges of academic life, social pressures, and transitional stress.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤲</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                Building a supportive community where students can connect, share experiences, and support each other's growth.
              </p>
            </div>
          </div>
        </div>

        {/* How We Help Section */}
        <div className="bg-gradient-to-r from-calm-blue-600 to-soft-green-600 rounded-2xl text-white p-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">How We Help Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-4">📚</div>
                <h4 className="font-semibold mb-2">Educational Resources</h4>
                <p className="text-sm text-calm-blue-100">
                  Evidence-based information about mental health, coping strategies, and wellness practices
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">💬</div>
                <h4 className="font-semibold mb-2">Peer Support</h4>
                <p className="text-sm text-calm-blue-100">
                  Connect with trained peer supporters who understand student life and its challenges
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🛠️</div>
                <h4 className="font-semibold mb-2">Practical Tools</h4>
                <p className="text-sm text-calm-blue-100">
                  Worksheets, apps, and exercises to help manage stress, anxiety, and daily challenges
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🔗</div>
                <h4 className="font-semibold mb-2">Professional Connections</h4>
                <p className="text-sm text-calm-blue-100">
                  Guidance on finding professional help and connecting with campus mental health services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Message From Our Team</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              "As students ourselves, we've experienced the unique pressures of academic life - from exam stress and 
              financial worries to relationship challenges and uncertainty about the future. We created MindCare 
              because we believe that seeking help is a sign of strength, not weakness."
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              "Your mental health matters, and you deserve support that's accessible, understanding, and free from 
              judgment. We're honored to be part of your journey toward better mental wellbeing."
            </p>
            <div className="text-center">
              <p className="text-lg font-semibold text-calm-blue-600">— The MindCare Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
