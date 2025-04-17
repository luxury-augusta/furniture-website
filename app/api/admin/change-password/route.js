import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    
    const client = await pool.connect();
    try {
      const verifyResult = await client.query(
        'SELECT * FROM admin_users WHERE password = $1',
        [currentPassword]
      );

      if (verifyResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        );
      }

      await client.query(
        'UPDATE admin_users SET password = $1 WHERE password = $2',
        [newPassword, currentPassword]
      );

      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
} 