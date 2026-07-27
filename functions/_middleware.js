const COOKIE_NAME = "ametista_session";
const SESSION_SECONDS = 8 * 60 * 60;
const encoder = new TextEncoder();

function securityHeaders(extra = {}) {
  return {
    "Cache-Control": "no-store, private",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    ...extra,
  };
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function importSessionKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function createSession(secret) {
  const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS });
  const payloadEncoded = base64UrlEncode(encoder.encode(payload));
  const key = await importSessionKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadEncoded));
  return `${payloadEncoded}.${base64UrlEncode(new Uint8Array(signature))}`;
}

async function verifySession(token, secret) {
  try {
    const [payloadEncoded, signatureEncoded, extra] = token.split(".");
    if (!payloadEncoded || !signatureEncoded || extra) return false;

    const key = await importSessionKey(secret);
    const validSignature = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signatureEncoded),
      encoder.encode(payloadEncoded),
    );
    if (!validSignature) return false;

    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadEncoded)));
    return Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

async function safeCompare(provided, expected) {
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}

function readCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  for (const item of cookieHeader.split(";")) {
    const [key, ...value] = item.trim().split("=");
    if (key === name) return value.join("=");
  }
  return "";
}

function redirect(location, cookie) {
  const headers = securityHeaders({ Location: location });
  if (cookie) headers["Set-Cookie"] = cookie;
  return new Response(null, { status: 303, headers });
}

function loginPage({ error = "", unavailable = false } = {}) {
  const message = unavailable
    ? "O acesso protegido está sendo configurado. Tente novamente mais tarde."
    : error;
  const disabled = unavailable ? "disabled" : "";

  return new Response(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acesso reservado | Ametista Participações S.A.</title>
  <style>
    :root{--navy:#04121d;--navy2:#0a2235;--gold:#d3ab59;--gold2:#f1d08b;--white:#fff;--muted:#aebbc4}
    *{box-sizing:border-box}
    html,body{min-height:100%;margin:0}
    body{display:grid;place-items:center;padding:24px;background:var(--navy);color:var(--white);font-family:Arial,sans-serif;overflow:hidden}
    .background{position:fixed;inset:-35px;background:
      linear-gradient(90deg,rgba(4,18,29,.92),rgba(4,18,29,.45)),
      radial-gradient(circle at 75% 35%,#446c65 0 12%,transparent 38%),
      linear-gradient(135deg,#102d43,#061827 55%,#3d3020);
      filter:blur(18px);transform:scale(1.08)}
    .background:before,.background:after{content:"";position:absolute;border:1px solid rgba(211,171,89,.25);background:rgba(255,255,255,.035)}
    .background:before{inset:18% 8% 54% 38%}.background:after{inset:52% 42% 12% 8%}
    main{position:relative;width:min(460px,100%);padding:42px;border:1px solid rgba(211,171,89,.5);background:rgba(4,18,29,.9);box-shadow:0 30px 80px rgba(0,0,0,.45);backdrop-filter:blur(18px)}
    .brand{color:var(--gold2);font-family:Georgia,serif;font-size:clamp(1.25rem,5vw,1.7rem);font-weight:700;letter-spacing:.08em}
    .eyebrow{margin-top:34px;color:var(--gold2);font-size:.7rem;font-weight:700;letter-spacing:.17em;text-transform:uppercase}
    h1{margin:10px 0 12px;font-family:Georgia,serif;font-size:clamp(2rem,8vw,3rem);line-height:1.05}
    p{margin:0;color:var(--muted);line-height:1.55}
    form{display:grid;gap:17px;margin-top:30px}
    label{display:grid;gap:7px;color:#dce3e7;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    input{width:100%;height:50px;padding:0 15px;border:1px solid rgba(211,171,89,.38);border-radius:0;background:rgba(255,255,255,.055);color:#fff;font-size:1rem;outline:none}
    input:focus{border-color:var(--gold);box-shadow:0 0 0 2px rgba(211,171,89,.12)}
    button{height:52px;border:1px solid var(--gold);background:var(--gold);color:#2e220d;font-weight:800;letter-spacing:.09em;text-transform:uppercase;cursor:pointer}
    button:disabled{cursor:not-allowed;opacity:.45}
    .message{margin-top:18px;padding:12px 14px;border-left:3px solid var(--gold);background:rgba(211,171,89,.09);color:#f0dcae;font-size:.86rem}
    .privacy{margin-top:22px;color:#7f909b;font-size:.72rem}
    @media(max-width:520px){main{padding:32px 24px}.brand{letter-spacing:.045em}}
  </style>
</head>
<body>
  <div class="background" aria-hidden="true"></div>
  <main>
    <div class="brand">AMETISTA PARTICIPAÇÕES S.A.</div>
    <div class="eyebrow">Apresentação confidencial</div>
    <h1>Acesso reservado</h1>
    <p>Entre com as credenciais fornecidas para visualizar o memorando de investimento e seus documentos.</p>
    ${message ? `<div class="message" role="alert">${message}</div>` : ""}
    <form method="post" action="/auth/login">
      <label>Usuário<input name="username" type="text" autocomplete="username" required ${disabled}></label>
      <label>Senha<input name="password" type="password" autocomplete="current-password" required ${disabled}></label>
      <button type="submit" ${disabled}>Acessar apresentação</button>
    </form>
    <div class="privacy">A sessão é protegida e expira automaticamente após 8 horas.</div>
  </main>
</body>
</html>`, {
    status: unavailable ? 503 : 200,
    headers: securityHeaders({ "Content-Type": "text/html; charset=UTF-8" }),
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const configured = Boolean(env.SITE_USERNAME && env.SITE_PASSWORD && env.SESSION_SECRET);

  if (url.pathname === "/logout") {
    return redirect("/", `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  }

  if (url.pathname === "/auth/login" && request.method === "POST") {
    if (!configured) return loginPage({ unavailable: true });

    const contentLength = Number(request.headers.get("Content-Length") || "0");
    const contentType = request.headers.get("Content-Type") || "";
    if (contentLength > 10_000 || !contentType.includes("application/x-www-form-urlencoded")) {
      return new Response("Solicitação inválida.", {
        status: 400,
        headers: securityHeaders({ "Content-Type": "text/plain; charset=UTF-8" }),
      });
    }

    const formData = await request.formData();
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");
    const [usernameValid, passwordValid] = await Promise.all([
      safeCompare(username, env.SITE_USERNAME),
      safeCompare(password, env.SITE_PASSWORD),
    ]);

    if (!usernameValid || !passwordValid) {
      return loginPage({ error: "Usuário ou senha inválidos." });
    }

    const session = await createSession(env.SESSION_SECRET);
    return redirect(
      "/",
      `${COOKIE_NAME}=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_SECONDS}`,
    );
  }

  if (!configured) return loginPage({ unavailable: true });

  const token = readCookie(request, COOKIE_NAME);
  if (token && await verifySession(token, env.SESSION_SECRET)) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store, private");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "same-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  const acceptsHtml = (request.headers.get("Accept") || "").includes("text/html");
  if (request.method === "GET" && acceptsHtml) return loginPage();

  return new Response("Autenticação necessária.", {
    status: 401,
    headers: securityHeaders({ "Content-Type": "text/plain; charset=UTF-8" }),
  });
}
