import { createServerFn } from "@tanstack/react-start";
import type { ClientWithVideos, ClientRecord, AiVideoRecord } from "./db.server";

export const getAiProjectsFn = createServerFn({ method: "GET" })
  .validator((data?: { search?: string }) => data)
  .handler(async ({ data }): Promise<ClientWithVideos[]> => {
    const db = await import("./db.server");
    await db.initDbTables().catch(console.error);
    return await db.getAiVideosGroupedByClient(data?.search);
  });

export const getClientsFn = createServerFn({ method: "GET" })
  .handler(async (): Promise<ClientRecord[]> => {
    const db = await import("./db.server");
    await db.initDbTables().catch(console.error);
    return await db.getAllClients();
  });

export const getAdminVideosFn = createServerFn({ method: "GET" })
  .validator((token: string) => token)
  .handler(async ({ data: token }): Promise<AiVideoRecord[]> => {
    const db = await import("./db.server");
    const user = await db.validateAdminToken(token);
    if (!user) throw new Error("Unauthorized");
    return await db.getAllAiVideosList();
  });

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean; token?: string; username?: string; error?: string }> => {
    const db = await import("./db.server");
    await db.initDbTables().catch(console.error);
    const token = await db.verifyAdminCredentials(data.username, data.password);
    if (!token) {
      return { success: false, error: "Invalid username or password" };
    }
    return { success: true, token, username: data.username };
  });

export const verifyAdminTokenFn = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data: token }): Promise<{ valid: boolean; username?: string }> => {
    const db = await import("./db.server");
    const username = await db.validateAdminToken(token);
    if (!username) return { valid: false };
    return { valid: true, username };
  });

export const addClientFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; token: string }) => data)
  .handler(async ({ data }): Promise<ClientRecord> => {
    const db = await import("./db.server");
    const user = await db.validateAdminToken(data.token);
    if (!user) throw new Error("Unauthorized");
    return await db.addClient(data.name);
  });

export const deleteClientFn = createServerFn({ method: "POST" })
  .validator((data: { id: number; token: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const db = await import("./db.server");
    const user = await db.validateAdminToken(data.token);
    if (!user) throw new Error("Unauthorized");
    const success = await db.deleteClient(data.id);
    return { success };
  });

export const addAiVideoFn = createServerFn({ method: "POST" })
  .validator((data: { clientId: number; videoUrl: string; remarks: string; token: string }) => data)
  .handler(async ({ data }): Promise<AiVideoRecord> => {
    const db = await import("./db.server");
    const user = await db.validateAdminToken(data.token);
    if (!user) throw new Error("Unauthorized");
    return await db.addAiVideo(data.clientId, data.videoUrl, data.remarks);
  });

export const deleteAiVideoFn = createServerFn({ method: "POST" })
  .validator((data: { id: number; token: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const db = await import("./db.server");
    const user = await db.validateAdminToken(data.token);
    if (!user) throw new Error("Unauthorized");
    const success = await db.deleteAiVideo(data.id);
    return { success };
  });
