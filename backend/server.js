const http = require('http');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 8787);
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const COOKIE_NAME = 'nowic_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const missingEnv = ['ADMIN_USER', 'ADMIN_PASS', 'ADMIN_SESSION_SECRET'].filter((name) => !process.env[name]);
if (missingEnv.length > 0) {
  console.error(`Fatal configuration error: missing required environment variable(s): ${missingEnv.join(', ')}`);
  process.exit(1);
}

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

function timingSafeStringEqual(a, b) {
  const aBuffer = Buffer.from(String(a), 'utf8');
  const bBuffer = Buffer.from(String(b), 'utf8');

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/admin/login' && req.method === 'POST') {
    try {
      const { username = '', password = '' } = await readJson(req);
      const validUsername = timingSafeStringEqual(username, ADMIN_USER);
      const validPassword = timingSafeStringEqual(password, ADMIN_PASS);

      if (!validUsername || !validPassword) {
        sendJson(res, 401, { message: 'Invalid credentials' });
        return;
      }

      const token = createToken(username);
      setSessionCookie(res, token, Math.floor(SESSION_TTL_MS / 1000));
      sendJson(res, 200, { admin: { username } });
    } catch (error) {
      console.error('Admin login request failed:', error);
      sendJson(res, 400, { message: 'Invalid request' });
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