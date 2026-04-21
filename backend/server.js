const http = require('http');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 8787);
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'NowicAdmin@2026';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'nowic-studio-admin-session-secret';
const COOKIE_NAME = 'nowic_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function base64Url(input) {
  return Buffer.from(input).toString('base64url');
}

function signToken(payload) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

function createToken(username) {
  const payload = base64Url(JSON.stringify({ username, exp: Date.now() + SESSION_TTL_MS }));
  return `${payload}.${signToken(payload)}`;
}

function verifyToken(token) {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  if (signToken(payload) !== signature) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.username || !data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, pair) => {
    const [rawKey, ...rawValue] = pair.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join('='));
    return acc;
  }, {});
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

function setSessionCookie(res, token, maxAgeSeconds) {
  const cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
    process.env.NODE_ENV === 'production' ? 'Secure' : null,
  ]
    .filter(Boolean)
    .join('; ');

  res.setHeader('Set-Cookie', cookie);
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/admin/login' && req.method === 'POST') {
    try {
      const { username = '', password = '' } = await readJson(req);
      if (username !== ADMIN_USER || password !== ADMIN_PASS) {
        sendJson(res, 401, { message: 'Invalid credentials' });
        return;
      }

      const token = createToken(username);
      setSessionCookie(res, token, Math.floor(SESSION_TTL_MS / 1000));
      sendJson(res, 200, { admin: { username } });
    } catch (error) {
      sendJson(res, 400, { message: error.message || 'Invalid request' });
    }
    return;
  }

  if (req.url === '/api/admin/session' && req.method === 'GET') {
    const cookies = parseCookies(req.headers.cookie || '');
    const session = verifyToken(cookies[COOKIE_NAME]);
    if (!session) {
      sendJson(res, 401, { message: 'No active session' });
      return;
    }
    sendJson(res, 200, { admin: { username: session.username } });
    return;
  }

  if (req.url === '/api/admin/logout' && req.method === 'POST') {
    setSessionCookie(res, '', 0);
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Admin auth server running on http://localhost:${PORT}`);
});