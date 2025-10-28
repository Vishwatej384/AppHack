// app/utils/api.ts
const API_BASE_URL = "http://10.231.26.111:5000/api"; // <-- change if your backend IP/port changes

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed ${response.status}`);
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed ${response.status}`);
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`PUT ${endpoint} failed ${response.status}`);
    return response.json();
  },

  del: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed ${response.status}`);
    return response.json();
  },
};

// convenience helpers
export async function testConnection() {
  try {
    const res = await fetch(`${API_BASE_URL.replace("/api","")}/api/test`);
    const json = await res.json();
    return json;
  } catch (e) {
    console.error("Backend test error", e);
    return null;
  }
}

export async function getAnnouncements() {
  return api.get("/announcements");
}
export async function addAnnouncement(payload: { title: string; details: string }) {
  return api.post("/announcements", payload);
}
export async function deleteAnnouncement(id: number) {
  return api.del(`/announcements/${id}`);
}
