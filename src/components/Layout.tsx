import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-soft-green-50">
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              © 2024 MindCare - Help for Mental Health for Students. All rights reserved.
            </p>
            <p className="text-xs mt-2 text-gray-400">
              Providing support and resources for student mental health and wellbeing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
