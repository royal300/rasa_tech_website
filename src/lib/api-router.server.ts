import {
  getAllClients,
  addClient,
  deleteClient,
  getAiVideosGroupedByClient,
  getAllAiVideosList,
  addAiVideo,
  deleteAiVideo,
  verifyAdminCredentials,
  validateAdminToken,
  adminLogout,
  initDbTables,
} from "./db.server";

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function errorResponse(message: string, status = 400) {
  return jsonResponse({ success: false, error: message }, status);
}

export async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method.toUpperCase();

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Ensure DB tables exist on first request
    await initDbTables().catch((err) => console.error("Init DB tables error:", err));

    // GET /api/ai-projects - List videos grouped by client (with optional search)
    if (method === "GET" && pathname === "/api/ai-projects") {
      const search = url.searchParams.get("search") || undefined;
      const data = await getAiVideosGroupedByClient(search);
      return jsonResponse({ success: true, data });
    }

    // GET /api/clients - Get all clients
    if (method === "GET" && pathname === "/api/clients") {
      const clients = await getAllClients();
      return jsonResponse({ success: true, clients });
    }

    // POST /api/admin/login
    if (method === "POST" && pathname === "/api/admin/login") {
      const body = await request.json().catch(() => ({}));
      const { username, password } = body;
      const token = await verifyAdminCredentials(username, password);
      if (token) {
        return jsonResponse({ success: true, token, username });
      }
      return errorResponse("Invalid username or password", 401);
    }

    // GET /api/admin/verify - Verify session token
    if (method === "GET" && pathname === "/api/admin/verify") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.replace(/^Bearer\s+/i, "");
      const username = await validateAdminToken(token);
      if (username) {
        return jsonResponse({ success: true, valid: true, username });
      }
      return errorResponse("Session expired or invalid", 401);
    }

    // POST /api/admin/logout
    if (method === "POST" && pathname === "/api/admin/logout") {
      const authHeader = request.headers.get("Authorization") || "";
      const token = authHeader.replace(/^Bearer\s+/i, "");
      await adminLogout(token);
      return jsonResponse({ success: true });
    }

    // Protected routes below - require valid admin token
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const adminUser = await validateAdminToken(token);

    if (!adminUser) {
      return errorResponse("Unauthorized. Please log in as admin.", 401);
    }

    // GET /api/admin/videos - Get flat list of all videos
    if (method === "GET" && pathname === "/api/admin/videos") {
      const videos = await getAllAiVideosList();
      return jsonResponse({ success: true, videos });
    }

    // POST /api/clients - Add new client
    if (method === "POST" && pathname === "/api/clients") {
      const body = await request.json().catch(() => ({}));
      const { name } = body;
      if (!name || !name.trim()) {
        return errorResponse("Client name is required");
      }
      const newClient = await addClient(name.trim());
      return jsonResponse({ success: true, client: newClient }, 201);
    }

    // DELETE /api/clients/:id - Delete client
    const clientDeleteMatch = pathname.match(/^\/api\/clients\/(\d+)$/);
    if (method === "DELETE" && clientDeleteMatch) {
      const clientId = Number(clientDeleteMatch[1]);
      const deleted = await deleteClient(clientId);
      return jsonResponse({ success: deleted });
    }

    // POST /api/ai-videos - Add video for a client
    if (method === "POST" && pathname === "/api/ai-videos") {
      const body = await request.json().catch(() => ({}));
      const { clientId, videoUrl, remarks } = body;
      if (!clientId) {
        return errorResponse("Client selection is required");
      }
      if (!videoUrl || !videoUrl.trim()) {
        return errorResponse("Video URL is required");
      }
      const newVideo = await addAiVideo(Number(clientId), videoUrl.trim(), remarks || "");
      return jsonResponse({ success: true, video: newVideo }, 201);
    }

    // DELETE /api/ai-videos/:id - Delete video
    const videoDeleteMatch = pathname.match(/^\/api\/ai-videos\/(\d+)$/);
    if (method === "DELETE" && videoDeleteMatch) {
      const videoId = Number(videoDeleteMatch[1]);
      const deleted = await deleteAiVideo(videoId);
      return jsonResponse({ success: deleted });
    }

    return errorResponse(`Endpoint not found: ${method} ${pathname}`, 404);
  } catch (err: any) {
    console.error("API error:", err);
    return errorResponse(err.message || "Internal server error", 500);
  }
}
