-- Add all Muhammad Younas Khan's projects to the database
-- Run this script in your Supabase SQL Editor after the initial setup

-- First, clear existing projects to avoid duplicates
DELETE FROM projects;

-- Insert all 12 projects with complete details
INSERT INTO projects (title, description, full_description, technologies, status, type, github_url, gradient, challenges, learned, timeline, is_featured, order_index) VALUES

-- 1. MYK Portfolio Website
(
  'MYK Portfolio Website',
  'Modern, responsive portfolio website built with Next.js, React, and Tailwind CSS featuring dynamic content management and admin panel.',
  'A full-stack portfolio website with admin panel, contact form, review system, and database integration. Features include responsive design, dark mode, email notifications, and content management system. Built with production-ready architecture using Supabase as backend.',
  ARRAY['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Shadcn/UI', 'Framer Motion', 'Supabase', 'Vercel'],
  'completed',
  'personal',
  'https://github.com/YUET-944/MYK-WEBPAGE',
  'from-indigo-400 to-emerald-600',
  ARRAY['Real-time database updates', 'Creating intuitive admin CMS system', 'Performance optimization for mobile devices'],
  ARRAY['Building production-ready full-stack apps', 'Supabase backend integration', 'Advanced UI/UX with modular components'],
  '2 months',
  true,
  1
),

-- 2. Job Portal - SQL Backend
(
  'Job Portal - SQL Backend',
  'Comprehensive job portal backend with advanced SQL queries, user management, and job application system.',
  'A complete job portal backend built with MySQL featuring advanced filtering, user-to-application relationships, and normalized database design. Includes complex multi-criteria job filtering and data integrity management.',
  ARRAY['MySQL', 'SQL Queries', 'XAMPP', 'PHP', 'HTML/CSS'],
  'completed',
  'personal',
  'https://github.com/YUET-944/job-portal',
  'from-blue-400 to-blue-600',
  ARRAY['Complex multi-criteria job filtering', 'Data integrity and referential integrity', 'Advanced SQL query optimization'],
  ARRAY['Advanced SQL queries for filtering', 'Data relationships (one-to-many)', 'Normalized databases and joins'],
  '3 months',
  true,
  2
),

-- 3. Sliding Window & Linked List Toolkit
(
  'DSA Toolkit - Sliding Window & Linked Lists',
  'Comprehensive C++ toolkit implementing sliding window techniques and linked list operations with modular design.',
  'A complete data structures and algorithms toolkit focusing on sliding window problems and linked list operations. Features modular programming design with memory management and reusable components for various DSA problems.',
  ARRAY['C++', 'OOP', 'DSA', 'Linked Lists', 'Sliding Window', 'CodeBlocks'],
  'completed',
  'personal',
  'https://github.com/YUET-944/DSA-tollkit',
  'from-purple-400 to-purple-600',
  ARRAY['Debugging pointer-based issues', 'Making program modular and reusable', 'Memory management optimization'],
  ARRAY['Sliding window technique implementation', 'Full control over linked lists', 'Modular programming and memory management'],
  '2 months',
  true,
  3
),

-- 4. Hostel Management System
(
  'Hostel Management System',
  'Object-oriented hostel management system built in C++ with file handling for student and room allocation management.',
  'A comprehensive hostel management system using OOP principles to model students, rooms, and allocations. Features menu-driven programming design with file I/O for data persistence without requiring a database.',
  ARRAY['C++', 'OOP', 'File Handling', 'DSA', 'Menu-driven Programming'],
  'completed',
  'personal',
  null,
  'from-orange-400 to-orange-600',
  ARRAY['Managing data without database', 'Keeping logic organized in large code files', 'File I/O synchronization'],
  ARRAY['File I/O for data persistence', 'OOP principles application', 'Menu-driven programming design'],
  '1.5 months',
  false,
  4
),

-- 5. Pharmacy Management System
(
  'Pharmacy Management System',
  'Full-featured pharmacy management system with Python backend, MySQL database, and tkinter GUI for inventory and sales management.',
  'A comprehensive pharmacy management system integrating Python backend with MySQL database. Features modules for Inventory, Sales, Billing, and Reports with dynamic report generation and real-time stock management.',
  ARRAY['Python', 'MySQL', 'tkinter', 'MySQL Connector', 'SQL Procedures', 'GUI Development'],
  'completed',
  'personal',
  'https://github.com/YUET-944/pharmacy-ui-ux-design',
  'from-emerald-400 to-emerald-600',
  ARRAY['Managing database transactions in billing', 'Foreign key constraints handling', 'Real-time stock updates'],
  ARRAY['Python-MySQL integration', 'Modular system design', 'Dynamic report generation'],
  '4 months',
  true,
  5
),

-- 6. ATM System
(
  'ATM Banking System',
  'Object-oriented ATM simulation system built in C++ with file handling and security features.',
  'A complete ATM banking system simulation using class-based design. Features real-world banking logic including deposit, withdrawal, balance check, and basic PIN protection with file-based data persistence.',
  ARRAY['C++', 'OOP', 'File Handling', 'Banking Logic', 'Security'],
  'completed',
  'personal',
  'https://github.com/YUET-944/ATM-System',
  'from-green-400 to-green-600',
  ARRAY['File corruption prevention', 'Simultaneous read/write operations', 'Data security implementation'],
  ARRAY['Class-based banking system design', 'Real-world banking logic simulation', 'File-based security measures'],
  '1 month',
  false,
  6
),

-- 7. Student Admission & Academic Record System
(
  'Student Admission & Academic Record System',
  'C-based student record management system using structs and procedural programming with file persistence.',
  'A comprehensive student admission and academic record management system built in C. Uses structs and functions for record management with persistent file storage for handling student data efficiently.',
  ARRAY['C', 'File Handling', 'Structs', 'Procedural Programming', 'Data Management'],
  'completed',
  'personal',
  'https://github.com/YUET-944/STUDENT-ADMISSION-SYSTEM',
  'from-yellow-400 to-yellow-600',
  ARRAY['Limited terminal-based UI', 'Managing large datasets without DBMS', 'File-based data integrity'],
  ARRAY['C programming for record management', 'Struct-based data organization', 'Persistent data storage'],
  '1 month',
  false,
  7
),

-- 8. KFT Organization Website
(
  'KFT Social Welfare Organization Website',
  'Responsive website for KFT Social Welfare Organization built with HTML, CSS, and JavaScript featuring modern design.',
  'A professional website for KFT Social Welfare Organization focusing on clean design, mobile responsiveness, and intuitive navigation. Features custom animations, Bootstrap integration, and optimized user experience.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design'],
  'completed',
  'personal',
  'https://github.com/YUET-944/KFT-WEBPAGE',
  'from-teal-400 to-teal-600',
  ARRAY['Mobile responsiveness tuning', 'Custom animations without frameworks', 'Cross-browser compatibility'],
  ARRAY['Responsive website design', 'Bootstrap grids and modals', 'Custom CSS animations'],
  '3 weeks',
  false,
  8
),

-- 9. Social Media App MVP (Team Project)
(
  'Social Media App MVP',
  'Leading a 7-member team to develop a comprehensive social media application with chat, short videos, and snap-like stories.',
  'A full-scale social media platform MVP with real-time messaging, short video processing, and Snap-like stories functionality. Leading a diverse team of frontend, backend, and UI/UX developers using Flutter and Firebase.',
  ARRAY['Flutter', 'Dart', 'Firebase', 'Node.js', 'Figma', 'Team Leadership', 'Project Management'],
  'ongoing',
  'team',
  null,
  'from-purple-400 to-pink-600',
  ARRAY['Scalable architecture for real-time messaging', 'Media compression and uploading', 'Team coordination and management'],
  ARRAY['Full-stack Flutter development', 'Real-time chat implementation', 'Team leadership skills'],
  '6 months',
  true,
  9
),

-- 10. UI/UX Design Projects
(
  'UI/UX Design Portfolio',
  'Collection of UI/UX design projects including mobile apps, web interfaces, and user experience studies.',
  'A comprehensive portfolio of UI/UX design work featuring mobile app interfaces, web design mockups, and user experience studies. Includes work on various design tools and user-centered design principles.',
  ARRAY['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
  'completed',
  'personal',
  'https://github.com/YUET-944/UI-UX-DESIGN',
  'from-pink-400 to-rose-600',
  ARRAY['User experience optimization', 'Design consistency across platforms', 'Accessibility considerations'],
  ARRAY['UI/UX design principles', 'Prototyping and wireframing', 'User-centered design approach'],
  '2 months',
  false,
  10
),

-- 11. Chatbot Development
(
  'AI Chatbot System',
  'Intelligent chatbot system with natural language processing and automated response capabilities.',
  'An AI-powered chatbot system featuring natural language processing, automated responses, and learning capabilities. Built with modern AI frameworks and designed for scalable conversation management.',
  ARRAY['Python', 'NLP', 'Machine Learning', 'AI', 'Chatbot Framework'],
  'in_progress',
  'personal',
  'https://github.com/YUET-944/BOT',
  'from-cyan-400 to-blue-600',
  ARRAY['Natural language understanding', 'Context management', 'Response accuracy'],
  ARRAY['NLP implementation', 'AI conversation flow', 'Machine learning integration'],
  '3 months',
  false,
  11
),

-- 12. Eid Greeting Application
(
  'Eid Greeting Application',
  'Interactive Eid greeting application with customizable messages and festive animations.',
  'A festive Eid greeting application featuring customizable greeting messages, beautiful animations, and sharing capabilities. Built with modern web technologies for an engaging user experience.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Animations', 'Web Development'],
  'completed',
  'personal',
  'https://github.com/YUET-944/EID-GREEDING',
  'from-amber-400 to-orange-600',
  ARRAY['Animation synchronization', 'Cross-platform compatibility', 'Performance optimization'],
  ARRAY['Interactive web animations', 'Event-driven programming', 'User engagement design'],
  '2 weeks',
  false,
  12
);

-- Verify the projects were inserted
SELECT 
  title,
  status,
  type,
  CASE WHEN github_url IS NOT NULL THEN 'Has GitHub Link' ELSE 'No GitHub Link' END as github_status,
  is_featured
FROM projects 
ORDER BY order_index;

-- Show count of projects by status
SELECT 
  status,
  COUNT(*) as count
FROM projects 
GROUP BY status;
