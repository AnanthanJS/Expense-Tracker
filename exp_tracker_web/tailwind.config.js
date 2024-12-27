/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/assets/css/**/*.{css}",
  ],
  safelist: [
    'bg-primary', 'text-white', 'hover:bg-primary-dark',
    'dark:bg-primary-dark', 'dark:text-primary-light',
    'dark:hover:bg-primary-light',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Main color
          light: '#6366F1',   // Lighter shade
          dark: '#3730A3',    // Darker shade
        },
        secondary: {
          DEFAULT: '#D97706',
          light: '#FBBF24',
          dark: '#92400E',
        },
        background: {
          DEFAULT: '#F9FAFB',
          dark: '#1F2937',
        },
        text: {
          DEFAULT: '#111827',
          light: '#6B7280',
          dark: '#F9FAFB',
        },
      },
      boxShadow: {
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
        md: '0 6px 10px rgba(0, 0, 0, 0.15)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        pill: '9999px', // Maximum border radius for a pill shape
      },
      caretColor: {
        primary: '#6366F1', // Light mode caret color
        'primary-dark': '#F9FAFB', // Dark mode caret color
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.pill-navbar': {
          '@apply bg-background dark:bg-background-dark shadow-md p-4 rounded-pill flex justify-between items-center': {},
        },
        '.navbar-link': {
          '@apply no-underline text-primary dark:text-text-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors ease-in-out duration-300': {},
        },
      });
    },
  ],
};