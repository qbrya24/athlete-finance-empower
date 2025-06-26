
-- Create education tables if they don't exist
CREATE TABLE IF NOT EXISTS education_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  duration VARCHAR(50),
  lessons_count INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  learning_objectives TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education_lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES education_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  duration VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(module_id, order_index)
);

CREATE TABLE IF NOT EXISTS education_quizzes (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES education_lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_option INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_education_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES education_modules(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES education_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_education_modules_order ON education_modules(order_index);
CREATE INDEX IF NOT EXISTS idx_education_lessons_module ON education_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_education_lessons_order ON education_lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_education_progress_user ON user_education_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user ON user_lesson_progress(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE education_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_education_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Education modules and lessons are publicly readable
CREATE POLICY IF NOT EXISTS "Education modules are publicly readable" ON education_modules FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Education lessons are publicly readable" ON education_lessons FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Education quizzes are publicly readable" ON education_quizzes FOR SELECT USING (true);

-- User progress is only accessible by the user themselves
CREATE POLICY IF NOT EXISTS "Users can view their own education progress" ON user_education_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert their own education progress" ON user_education_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can update their own education progress" ON user_education_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can view their own lesson progress" ON user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can insert their own lesson progress" ON user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Users can update their own lesson progress" ON user_lesson_progress FOR UPDATE USING (auth.uid() = user_id);
