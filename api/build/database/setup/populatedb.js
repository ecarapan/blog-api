import "dotenv/config";
import { Pool } from "pg";
export const pool = new Pool({
    host: process.env["DATABASE_HOST"],
    user: process.env["DATABASE_USER"],
    database: process.env["DATABASE_NAME"],
    password: process.env["DATABASE_PASSWORD"],
    port: Number(process.env["DATABASE_PORT"]),
    // ssl: true,
});
async function populate() {
    try {
        await pool.query(`DROP TABLE IF EXISTS comments`);
        await pool.query(`DROP TABLE IF EXISTS posts`);
        await pool.query(`DROP TABLE IF EXISTS users`);
        await pool.query(`
      CREATE TABLE users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
        await pool.query(`
      CREATE TABLE posts (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_posted BOOLEAN DEFAULT false
      )
    `);
        await pool.query(`
      CREATE TABLE comments (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log("Database schema created successfully!");
    }
    catch (err) {
        console.error("Error creating database schema:", err);
    }
    finally {
        await pool.end();
    }
}
populate();
//# sourceMappingURL=populatedb.js.map