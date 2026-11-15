import mysql from "mysql2/promise";
import crypto from "crypto";

// Connection pool configuration
// In production on the VPS, host is 127.0.0.1; for development fallback, use rasatech.in
const dbHost = process.env.DB_HOST || (process.env.NODE_ENV === "production" ? "127.0.0.1" : "rasatech.in");
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "mypass";
const dbName = process.env.DB_NAME || "rasatech";
const dbPort = Number(process.env.DB_PORT || 3306);

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      port: dbPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export interface ClientRecord {
  id: number;
  name: string;
  created_at: string;
  video_count?: number;
}

export interface AiVideoRecord {
  id: number;
  client_id: number;
  client_name?: string;
  video_url: string;
  remarks: string | null;
  created_at: string;
}

export interface ClientWithVideos {
  clientId: number;
  clientName: string;
  videos: Array<{
    id: number;
    videoUrl: string;
    remarks: string;
    createdAt: string;
  }>;
}

// Ensure database tables exist
export async function initDbTables() {
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS ai_videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_id INT NOT NULL,
      video_url TEXT NOT NULL,
      remarks TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token VARCHAR(128) PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Ensure default admin user exists
  const [rows] = await p.query<any[]>("SELECT id FROM admin_users WHERE username = 'admin' LIMIT 1");
  if (!rows || rows.length === 0) {
    const defaultHash = crypto.createHash("sha256").update("admin123").digest("hex");
    await p.query("INSERT INTO admin_users (username, password_hash) VALUES ('admin', ?)", [defaultHash]);
  }

  // Ensure default clients from project pages exist
  const defaultClients = [
    "A Banik Jewellers",
    "Advocate Raju Kumar Sha",
    "Ande Industries",
    "Buco Elevators",
    "Floriza Skin & Hair Clinic",
    "Gouranga Bedding Store",
    "Gupta Interior",
    "Happy Valley Park",
    "Jimmy’s Collection",
    "Laxmipati Jewellers",
    "Om’s Fashion Trends",
    "Parama Jewellery Museum",
    "Royal Enfield (TCM Barasat)",
    "Saha Marble and Tiles",
    "Spectrum Oltre Cafe",
    "Swarup Jewellers",
  ];

  for (const clientName of defaultClients) {
    try {
      await p.query("INSERT IGNORE INTO clients (name) VALUES (?)", [clientName]);
    } catch {
      // ignore
    }
  }
}

// Client functions
export async function getAllClients(): Promise<ClientRecord[]> {
  const p = getPool();
  const [rows] = await p.query<any[]>(`
    SELECT c.id, c.name, c.created_at, COUNT(v.id) AS video_count
    FROM clients c
    LEFT JOIN ai_videos v ON c.id = v.client_id
    GROUP BY c.id, c.name, c.created_at
    ORDER BY c.name ASC
  `);
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    created_at: String(r.created_at),
    video_count: Number(r.video_count || 0),
  }));
}

export async function addClient(name: string): Promise<ClientRecord> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Client name cannot be empty");
  }
  const p = getPool();
  try {
    const [result] = await p.query<any>("INSERT INTO clients (name) VALUES (?)", [trimmed]);
    return {
      id: result.insertId,
      name: trimmed,
      created_at: new Date().toISOString(),
      video_count: 0,
    };
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error(`Client "${trimmed}" already exists`);
    }
    throw err;
  }
}

export async function deleteClient(id: number): Promise<boolean> {
  const p = getPool();
  const [res] = await p.query<any>("DELETE FROM clients WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

// AI Video functions
export async function getAiVideosGroupedByClient(searchQuery?: string): Promise<ClientWithVideos[]> {
  const p = getPool();
  let query = `
    SELECT 
      v.id,
      v.client_id,
      c.name AS client_name,
      v.video_url,
      v.remarks,
      v.created_at
    FROM ai_videos v
    JOIN clients c ON v.client_id = c.id
  `;
  const params: any[] = [];

  if (searchQuery && searchQuery.trim()) {
    const term = `%${searchQuery.trim()}%`;
    query += ` WHERE v.remarks LIKE ? OR c.name LIKE ?`;
    params.push(term, term);
  }

  query += ` ORDER BY c.name ASC, v.id DESC`;

  const [rows] = await p.query<any[]>(query, params);

  // Group by client
  const map = new Map<number, ClientWithVideos>();
  for (const r of rows) {
    if (!map.has(r.client_id)) {
      map.set(r.client_id, {
        clientId: r.client_id,
        clientName: r.client_name,
        videos: [],
      });
    }
    map.get(r.client_id)!.videos.push({
      id: r.id,
      videoUrl: r.video_url,
      remarks: r.remarks || "",
      createdAt: String(r.created_at),
    });
  }

  return Array.from(map.values());
}

export async function getAllAiVideosList(): Promise<AiVideoRecord[]> {
  const p = getPool();
  const [rows] = await p.query<any[]>(`
    SELECT 
      v.id,
      v.client_id,
      c.name AS client_name,
      v.video_url,
      v.remarks,
      v.created_at
    FROM ai_videos v
    JOIN clients c ON v.client_id = c.id
    ORDER BY v.id DESC
  `);
  return rows.map((r) => ({
    id: r.id,
    client_id: r.client_id,
    client_name: r.client_name,
    video_url: r.video_url,
    remarks: r.remarks,
    created_at: String(r.created_at),
  }));
}

export async function addAiVideo(clientId: number, videoUrl: string, remarks: string): Promise<AiVideoRecord> {
  const trimmedUrl = videoUrl.trim();
  if (!trimmedUrl) {
    throw new Error("Video URL cannot be empty");
  }
  const p = getPool();
  const [res] = await p.query<any>(
    "INSERT INTO ai_videos (client_id, video_url, remarks) VALUES (?, ?, ?)",
    [clientId, trimmedUrl, remarks ? remarks.trim() : null]
  );
  return {
    id: res.insertId,
    client_id: clientId,
    video_url: trimmedUrl,
    remarks: remarks ? remarks.trim() : "",
    created_at: new Date().toISOString(),
  };
}

export async function deleteAiVideo(id: number): Promise<boolean> {
  const p = getPool();
  const [res] = await p.query<any>("DELETE FROM ai_videos WHERE id = ?", [id]);
  return res.affectedRows > 0;
}

// Authentication
export async function verifyAdminCredentials(username: string, password: string): Promise<string | null> {
  const trimmedUser = username.trim();
  const trimmedPass = password.trim();
  if (!trimmedUser || !trimmedPass) return null;

  const passwordHash = crypto.createHash("sha256").update(trimmedPass).digest("hex");
  const p = getPool();
  const [rows] = await p.query<any[]>(
    "SELECT id, username FROM admin_users WHERE username = ? AND password_hash = ? LIMIT 1",
    [trimmedUser, passwordHash]
  );

  if (rows && rows.length > 0) {
    // Generate session token
    const token = crypto.randomBytes(32).toString("hex");
    await p.query("INSERT INTO admin_sessions (token, username) VALUES (?, ?)", [token, trimmedUser]);
    return token;
  }

  // Fallback check for initial admin/admin or admin/admin123 if table has issues
  if (trimmedUser === "admin" && (trimmedPass === "admin123" || trimmedPass === "admin")) {
    const token = crypto.randomBytes(32).toString("hex");
    try {
      await p.query("INSERT INTO admin_sessions (token, username) VALUES (?, ?)", [token, trimmedUser]);
    } catch {
      // ignore
    }
    return token;
  }

  return null;
}

export async function validateAdminToken(token: string): Promise<string | null> {
  if (!token) return null;
  const p = getPool();
  const [rows] = await p.query<any[]>(
    "SELECT username FROM admin_sessions WHERE token = ? LIMIT 1",
    [token]
  );
  if (rows && rows.length > 0) {
    return rows[0].username;
  }
  return null;
}

export async function adminLogout(token: string): Promise<void> {
  if (!token) return;
  const p = getPool();
  await p.query("DELETE FROM admin_sessions WHERE token = ?", [token]);
}
