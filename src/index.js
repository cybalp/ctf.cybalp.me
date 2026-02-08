export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);

    // LOGIN
    if (url.pathname === "/login" && request.method === "POST") {
      const { username, password } = await request.json();

      // 🔒 GERÇEK KONTROL
      if (username === "admin" && password === "admin123") {
        return new Response(JSON.stringify({
          success: true,
          token: "ADMIN_VALID_TOKEN"
        }), { headers: cors });
      }

      // ❌ YANLIŞ LOGIN
      return new Response(JSON.stringify({
        success: false
      }), { status: 401, headers: cors });
    }

    // VERIFY
    if (url.pathname === "/verify") {
      const auth = request.headers.get("Authorization");

      if (auth === "Bearer ADMIN_VALID_TOKEN") {
        return new Response(JSON.stringify({ ok: true }), { headers: cors });
      }

      return new Response(JSON.stringify({ ok: false }), {
        status: 401,
        headers: cors
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
