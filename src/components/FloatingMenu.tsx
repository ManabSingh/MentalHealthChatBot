import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TreePine, Send, MessageCircle, Plus, X } from 'lucide-react';
import FloatingButton from './FloatingButton';

const FloatingMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-expand on desktop, collapsed on mobile by default
  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const menuItems = [
    {
      icon: TreePine,
      label: 'Tree Growth Game',
      color: 'green' as const,
      path: '/grow-your-tree',
      delay: 0.1
    },
    {
      icon: Send,
      label: 'Mind Flights',
      color: 'blue' as const,
      path: '/mind-flights',
      delay: 0.2
    },
    {
      icon: MessageCircle,
      label: 'Community Blog',
      color: 'purple' as const,
      path: '/community',
      delay: 0.3
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end space-y-reverse space-y-4">
      <AnimatePresence>
        {(isExpanded || !isMobile) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col-reverse space-y-reverse space-y-4"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: item.delay,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  y: 20,
                  transition: {
                    delay: (menuItems.length - index - 1) * 0.1
                  }
                }}
              >
                <FloatingButton
                  icon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  color={item.color}
                  label={item.label}
                  isVisible={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB for mobile */}
      {isMobile && (
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 
            text-white shadow-lg transition-all duration-300 ease-out
            flex items-center justify-center mt-4
            ${isExpanded ? 'shadow-2xl' : 'hover:shadow-xl'}
          `}
          aria-label={isExpanded ? 'Close menu' : 'Open quick access menu'}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? <X size={28} /> : <Plus size={28} />}
          </motion.div>
        </motion.button>
      )}

      {/* Background overlay for mobile when expanded */}
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          />
        )}
      </AnimatePresence>

      {/* Floating hint for first-time users */}
      <AnimatePresence>
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.8, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 2 }}
            className="absolute -left-48 top-1/2 transform -translate-y-1/2 
                       bg-gray-800 text-white text-sm px-3 py-2 rounded-lg
                       pointer-events-none hidden lg:block"
          >
            Quick access to mental health tools
            <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 
                           w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 
                           border-l-gray-800 border-t-transparent border-b-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;
