import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM admin_users LIMIT 1');
      return NextResponse.json({ 
        success: true, 
        hasAdmin: result.rows.length > 0 
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    );
  }
} 