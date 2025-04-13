import { notFound } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';

export async function generateMetadata({ params }) {
  const { category } = params;
  
  const categoryTitles = {
    'carved-sofas': 'Carved Sofas - Luxury Handcrafted Furniture | Augusta Luxury',
    'chesterfield-lounger-sofa': 'Chesterfield Lounger Sofa - Classic Luxury Furniture | Augusta Luxury',
    'dining-lighting': 'Dining Lighting - Premium Home Lighting Solutions | Augusta Luxury',
    'ottoman-bench-sofa': 'Ottoman Bench Sofa - Versatile Luxury Seating | Augusta Luxury'
  };

  const categoryDescriptions = {
    'carved-sofas': 'Explore our exquisite collection of handcrafted carved sofas. Each piece is a masterpiece of luxury furniture, perfect for elevating your living space.',
    'chesterfield-lounger-sofa': 'Discover our premium Chesterfield Lounger Sofas, combining classic design with modern comfort. Perfect for luxury living rooms and lounges.',
    'dining-lighting': 'Illuminate your dining space with our premium lighting collection. From chandeliers to pendant lights, find the perfect lighting solution for your home.',
    'ottoman-bench-sofa': 'Browse our versatile Ottoman Bench Sofa collection. Perfect for adding luxury and functionality to any room in your home.'
  };

  if (!categoryTitles[category]) {
    return {
      title: 'Page Not Found | Augusta Luxury',
      description: 'The page you are looking for does not exist.'
    };
  }

  return {
    title: categoryTitles[category],
    description: categoryDescriptions[category],
    openGraph: {
      title: categoryTitles[category],
      description: categoryDescriptions[category],
      url: `https://augustaluxury.in/products/${category}`,
      images: [
        {
          url: `https://augustaluxury.in/images/${category}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${category.replace(/-/g, ' ')} collection`
        }
      ]
    }
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
        <ProductGrid category={category} />
      </div>
    </main>
  );
} 