import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ChatSupport from './pages/ChatSupport';
import About from './pages/About';
import Contact from './pages/Contact';
import GrowYourTree from './pages/GrowYourTree';
import MindFlights from './pages/MindFlights';
import CommunityBlog from './pages/CommunityBlog';
import FloatingMenu from './components/FloatingMenu';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/grow-your-tree" element={<GrowYourTree />} />
          <Route path="/mind-flights" element={<MindFlights />} />
          <Route path="/community" element={<CommunityBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <FloatingMenu />
      </Layout>
    </Router>
  );
}

export default App;
