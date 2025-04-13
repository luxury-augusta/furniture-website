// Utility functions for Cloudinary images

/**
 * Fetches images from Cloudinary by tag
 * @param {string} tag - The tag to filter images by
 * @returns {Promise<Array>} - Array of image objects with urls
 */
export async function getImagesByTag(tag) {
  try {
    const response = await fetch(`/api/cloudinary?tag=${tag}`);
    if (!response.ok) throw new Error('Failed to fetch images');
    
    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
}

/**
 * Transform an image array from Cloudinary into a format suitable for the product grid
 * @param {Array} images - Array of Cloudinary image objects
 * @param {string} categoryName - The category name for the products
 * @returns {Array} - Transformed product array
 */
export function transformToProducts(images, categoryName) {
  return images.map((image, index) => ({
    id: index + 1,
    name: `${categoryName} ${index + 1}`,
    image: image.secure_url,
    category: categoryName,
    publicId: image.public_id
  }));
} 