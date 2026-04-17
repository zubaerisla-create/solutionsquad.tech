import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET || 'secret_key_change_me_1234567890123456', 'utf-8');

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'zubaerislam703@gmail.com' && password === 'Zubaer@1234') {
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(SECRET_KEY);

    const secure = process.env.NODE_ENV === 'production';
    const cookieStore = await cookies();

    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
