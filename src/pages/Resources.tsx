import React from 'react';

interface ResourceCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  items: string[];
}

const Resources: React.FC = () => {
  const resourceCategories: ResourceCard[] = [
    {
      title: 'Stress Management',
      description: 'Learn effective techniques to manage and reduce stress in your daily life.',
      icon: '🧘‍♀️',
      color: 'bg-calm-blue-50 hover:bg-calm-blue-100 border-calm-blue-200',
      items: [
        'Deep breathing exercises',
        'Progressive muscle relaxation',
        'Time management strategies',
        'Mindfulness meditation guides',
        'Stress tracking journals'
      ]
    },
    {
      title: 'Exam Anxiety',
      description: 'Tools and strategies to overcome test anxiety and improve academic performance.',
      icon: '📚',
      color: 'bg-soft-green-50 hover:bg-soft-green-100 border-soft-green-200',
      items: [
        'Pre-exam preparation techniques',
        'Anxiety reduction exercises',
        'Study schedule templates',
        'Test-taking strategies',
        'Confidence-building activities'
      ]
    },
    {
      title: 'Time Management',
      description: 'Master the art of effective time management and productivity.',
      icon: '⏰',
      color: 'bg-lavender-50 hover:bg-lavender-100 border-lavender-200',
      items: [
        'Priority setting frameworks',
        'Daily planning templates',
        'Procrastination solutions',
        'Goal setting worksheets',
        'Productivity apps recommendations'
      ]
    },
    {
      title: 'Self-Care',
      description: 'Discover essential self-care practices for mental and physical wellbeing.',
      icon: '💚',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      items: [
        'Daily self-care routines',
        'Healthy sleep habits',
        'Nutrition for mental health',
        'Physical exercise guides',
        'Emotional wellness practices'
      ]
    },
    {
      title: 'Professional Help',
      description: 'Find resources for connecting with mental health professionals.',
      icon: '👥',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      items: [
        'Campus counseling services',
        'Online therapy platforms',
        'Mental health hotlines',
        'Support groups directory',
        'Insurance coverage guides'
      ]
    },
    {
      title: 'Crisis Support',
      description: 'Immediate help resources for mental health emergencies.',
      icon: '🚨',
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      items: [
        'Crisis helpline numbers',
        'Emergency safety planning',
        '24/7 support resources',
        'Campus safety services',
        'Immediate coping strategies'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-soft-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Mental Health Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of resources designed to support your mental health journey. 
            Each category contains practical tools, guides, and information to help you thrive.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resourceCategories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} border-2 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Available Resources:
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg 
                        className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  Access Resources
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Support Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Additional Support?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you're experiencing a mental health crisis or need immediate support, 
            don't hesitate to reach out to our crisis support resources or contact emergency services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
              Crisis Hotline: 1-800-233-3330
            </button>
            <button className="bg-calm-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-calm-blue-700 transition-colors duration-200">
              Campus Counseling
            </button>
            <button className="bg-soft-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-soft-green-700 transition-colors duration-200">
              Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
