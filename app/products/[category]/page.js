import { notFound } from 'next/navigation';

async function getCategoryData(slug) {
  try {
    const response = await fetch(`/api/admin/tags`);
    const data = await response.json();
    
    const category = data.tags.find(tag => tag.slug === slug);
    
    if (category) {
      return {
        title: `${category.name} - Premium Luxury Furniture | Augusta Luxury`,
        description: category.description || `Explore our exquisite collection of ${category.name.toLowerCase()}. Each piece is a masterpiece of luxury furniture, perfect for elevating your living space.`
      };
    }
    
    return {
      title: 'Premium Luxury Furniture | Augusta Luxury',
      description: 'Explore our exquisite collection of luxury furniture. Each piece is a masterpiece of craftsmanship, perfect for elevating your living space.'
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      title: 'Premium Luxury Furniture | Augusta Luxury',
      description: 'Explore our exquisite collection of luxury furniture. Each piece is a masterpiece of craftsmanship, perfect for elevating your living space.'
    };
  }
}

export async function generateMetadata({ params }) {
  const { category } = params;

  const categoryData = await getCategoryData(category);

  return {
    title: categoryData.title,
    description: categoryData.description,
    openGraph: {
      title: categoryData.title,
      description: categoryData.description,
      url: `https://augustaluxury.in/products/${category}`,
      siteName: 'Augusta Luxury',
      images: [
        {
          url: `https://augustaluxury.in/images/${category}.jpg`,
          width: 1200,
          height: 630,
          alt: `${category} - Augusta Luxury`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryData.title,
      description: categoryData.description,
      images: [`https://augustaluxury.in/images/${category}.jpg`],
    },
  };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  
  const validCategories = [
    'carved-sofas',
    'chesterfield-lounger-sofa',
    'dining-lighting',
    'ottoman-bench-sofa'
  ];

  if (!validCategories.includes(category)) {
    notFound();
  }

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {category.replace(/-/g, ' ')}
        </h1>
      </div>
    </main>
  );
} 