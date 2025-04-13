import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM admin_users WHERE username = $1 AND password = $2',
        [username, password]
      );

      if (result.rows.length > 0) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 