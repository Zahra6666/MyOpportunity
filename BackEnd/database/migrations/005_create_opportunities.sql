CREATE TABLE IF NOT EXISTS opportunities (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    opportunity_type VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE opportunities
DROP COLUMN opportunity_type;

ALTER TABLE opportunities
ADD COLUMN type_id INT REFERENCES types(id) ON DELETE SET NULL;