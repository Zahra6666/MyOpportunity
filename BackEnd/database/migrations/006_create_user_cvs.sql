CREATE TABLE IF NOT EXISTS user_cvs (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    raw_file_url VARCHAR(500),
    parsed_text TEXT,
    skills JSONB,
    experience_years INT DEFAULT 0,
    education TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);