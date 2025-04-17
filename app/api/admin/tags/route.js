import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    try {
      console.log('Executing query...');
      const result = await client.query('SELECT * FROM tags ORDER BY name');
      console.log('Query result:', result.rows);
      return NextResponse.json({ tags: result.rows });
    } catch (queryError) {
      console.error('Query error:', queryError);
      return NextResponse.json(
        { error: 'Database query failed' },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, starting_price } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid tag name' },
        { status: 400 }
      );
    }

    if (!starting_price || typeof starting_price !== 'number' || starting_price <= 0) {
      return NextResponse.json(
        { error: 'Invalid starting price' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO tags (name, slug, starting_price) VALUES ($1, $2, $3) RETURNING *',
        [name, slug, starting_price]
      );
      return NextResponse.json({ tag: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid tag ID' },
        { status: 400 }
      );
    }
    
    const client = await pool.connect();
    try {
      const tagResult = await client.query('SELECT * FROM tags WHERE id = $1', [id]);
      if (tagResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Tag not found' },
          { status: 404 }
        );
      }
      
      const tag = tagResult.rows[0];
      
      try {
        const resources = await cloudinary.api.resources_by_tag(tag.slug, {
          max_results: 100,
          resource_type: 'image'
        });

        for (const resource of resources.resources) {
          await cloudinary.uploader.destroy(resource.public_id);
        }
      } catch (cloudinaryError) {
        console.error('Error deleting images from Cloudinary:', cloudinaryError);
      }
      
      await client.query('DELETE FROM tags WHERE id = $1', [id]);
      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, starting_price } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid tag ID' },
        { status: 400 }
      );
    }

    if (!starting_price || typeof starting_price !== 'number' || starting_price <= 0) {
      return NextResponse.json(
        { error: 'Invalid starting price' },
        { status: 400 }
      );
    }
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE tags SET starting_price = $1 WHERE id = $2 RETURNING *',
        [starting_price, id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Tag not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ tag: result.rows[0] });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
} 