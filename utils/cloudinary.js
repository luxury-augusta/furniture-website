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

export function transformToProducts(images, categoryName) {
  return images.map((image, index) => ({
    id: index + 1,
    name: `${categoryName} ${index + 1}`,
    image: image.secure_url,
    category: categoryName,
    publicId: image.public_id
  }));
} 