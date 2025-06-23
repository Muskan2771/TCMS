import React from 'react';
import { motion } from 'framer-motion';
import MostUsedURLs from './MostUsedURLs';
import ClientURLs from './ClientUrl';
import Notification from './Notification';
import { Container } from '@/components';
import UserStorage from './UserStorage';
import QuickNotes from './QuickNotes';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    const token = Cookies.get('token');
    let firstName = 'User';
    if (token) {
      try {
        const parsedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        firstName = parsedToken.firstName || 'User'; // Extract firstName or fallback to 'User'
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    if (currentHour < 12) {
      return `Good Morning, ${firstName}!`;
    } else if (currentHour < 18) {
      return `Good Afternoon, ${firstName}!`;
    } else {
      return `Good Evening, ${firstName}!`;
    }
  };

  return (
    <Container title={getGreeting()}>
      <motion.div
        className="flex gap-5 flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.div
          className="basis-2/3"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}>
          <QuickNotes />
          <ClientURLs />
        </motion.div>
        <motion.div
          className="basis-1/3 m-5"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}>
          <Notification />
          <MostUsedURLs />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
