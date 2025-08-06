-- Create the database tables for the portfolio CMS

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  technologies TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active',
  type VARCHAR(100) DEFAULT 'personal',
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  gradient VARCHAR(100) DEFAULT 'from-blue-400 to-blue-600',
  challenges TEXT[] DEFAULT '{}',
  learned TEXT[] DEFAULT '{}',
  timeline VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile table (single row for the portfolio owner)
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  resume_url VARCHAR(500),
  avatar_url VARCHAR(500),
  skills TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  roles TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_order ON projects(order_index);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_contact_status ON contact_messages(status);

-- Insert default profile data
INSERT INTO profile (name, title, bio, email, phone, location, github_url, linkedin_url, skills, languages, roles) VALUES (
  'Muhammad Younas Khan',
  'Aspiring Full Stack Developer',
  'Passionate Computer Science student at UET Mardan with strong foundation in programming, problem-solving, and database management. Proficient in C++, SQL, and Python with a growing skill set in web technologies.',
  'mykjcs2023@gmail.com',
  '+923155705944',
  'Swat, Pakistan',
  'https://github.com/YUET-944',
  'https://linkedin.com/in/muhammad-younas-khan-72b102264',
  ARRAY['C++', 'Python', 'SQL', 'JavaScript', 'React', 'MySQL', 'Next.js', 'Tailwind CSS'],
  ARRAY['Pashto (Native)', 'Urdu (Fluent)', 'English (Good)'],
  ARRAY['Aspiring Full Stack Developer', 'Web Developer', 'Database Designer']
);

-- Insert default admin user (password: portfolio2024)
INSERT INTO admin_users (username, password_hash, email) VALUES (
  'admin',
  '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', -- This should be properly hashed
  'admin@portfolio.com'
);

-- Insert some default projects
INSERT INTO projects (title, description, full_description, technologies, status, type, github_url, gradient, challenges, learned, timeline, is_featured, order_index) VALUES 
(
  'Social Media MVP',
  'Leading a team to develop a comprehensive social media application with chat, short videos, and snap-like stories functionality.',
  'This project involves building a full-featured social media platform from scratch. Key challenges include real-time messaging, video processing, and scalable architecture. Leading a team of developers while managing project timelines and feature requirements.',
  ARRAY['Team Leadership', 'Project Management', 'Mobile Development', 'Real-time Systems'],
  'ongoing',
  'team',
  null,
  'from-purple-400 to-purple-600',
  ARRAY['Real-time messaging', 'Video processing', 'Team coordination'],
  ARRAY['Leadership skills', 'Project management', 'System architecture'],
  '6 months',
  true,
  1
),
(
  'Pharmacy Management System',
  'A comprehensive system for managing pharmacy operations with inventory tracking, sales management, and customer records.',
  'Built using Python and MySQL, this system handles complete pharmacy operations including inventory management, prescription tracking, sales analytics, and customer relationship management. Features automated alerts for low stock and expiry dates.',
  ARRAY['Python', 'MySQL', 'Database Design', 'GUI Development'],
  'in_progress',
  'personal',
  null,
  'from-emerald-400 to-emerald-600',
  ARRAY['Complex database relationships', 'User interface design', 'Data validation'],
  ARRAY['Advanced SQL', 'Python GUI frameworks', 'Database optimization'],
  '4 months',
  true,
  2
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public can read approved reviews" ON reviews FOR SELECT USING (status = 'approved');

-- Create policies for public insert (for contact and reviews)
CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
