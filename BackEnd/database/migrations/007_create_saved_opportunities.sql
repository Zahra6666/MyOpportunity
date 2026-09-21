CREATE TABLE IF NOT EXISTS saved_opportunities (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id INT REFERENCES opportunities(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_opportunity UNIQUE (user_id, opportunity_id)
);