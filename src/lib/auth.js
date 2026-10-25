
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const COOKIE = 'shebaghor_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const value = process.env.AUTH_SECRET;

  if (!value || value.length < 32) {
    throw new Error(
      'AUTH_SECRET must be at least 32 characters. Check your .env file.'
    );
  }

  return new TextEncoder().encode(value);
}

/**
 * Create a signed session for an existing user.
 */
export async function createSession(user) {
  if (!user?.id) {
    throw new Error('Cannot create a session without a valid user ID.');
  }

  const token = await new SignJWT({
    role: user.role,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION,
  });
}

/**
 * Verify the session and retrieve the current user from the database.
 */
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret(), {
      algorithms: ['HS256'],
    });

    if (typeof payload.sub !== 'string' || !payload.sub) {
      return null;
    }

    // Read the current role from the database, not from the token.
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
      },
    });

    return user ?? null;
  } catch (error) {
    // Invalid, expired, or unverifiable sessions are rejected.
    if (process.env.NODE_ENV !== 'production') {
      console.error('Session verification failed:', error);
    }

    return null;
  }
}

/**
 * Require an authenticated user with one of the allowed roles.
 *
 * Example:
 * const { user, error } = await requireRole(['ADMIN']);
 */
export async function requireRole(roles) {
  const user = await getSession();

  if (!user) {
    return {
      user: null,
      error: Response.json(
        { error: 'Please sign in.' },
        { status: 401 }
      ),
    };
  }

  if (!Array.isArray(roles) || !roles.includes(user.role)) {
    return {
      user: null,
      error: Response.json(
        { error: 'You do not have permission.' },
        { status: 403 }
      ),
    };
  }

  return { user, error: null };
}

/**
 * Destroy the current session.
 */
export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE);
}
