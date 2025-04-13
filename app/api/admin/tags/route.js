import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all tags
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

// Create a new tag
export async function POST(request) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid tag name' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING *',
        [name, slug]
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

// Delete a tag
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
      // First get the tag details to get the slug
      const tagResult = await client.query('SELECT * FROM tags WHERE id = $1', [id]);
      if (tagResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Tag not found' },
          { status: 404 }
        );
      }
      
      const tag = tagResult.rows[0];
      
      // Delete all images with this tag from Cloudinary
      try {
        // First get all resources with this tag
        const resources = await cloudinary.api.resources_by_tag(tag.slug, {
          max_results: 100,
          resource_type: 'image'
        });

        // Delete each image
        for (const resource of resources.resources) {
          await cloudinary.uploader.destroy(resource.public_id);
        }
      } catch (cloudinaryError) {
        console.error('Error deleting images from Cloudinary:', cloudinaryError);
        // Continue with tag deletion even if image deletion fails
      }
      
      // Delete the tag from database
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