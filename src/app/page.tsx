import { getSession } from '@/context/actions';
import { UserRole } from '@/context/AuthContext';
import Hero from './components/landing/hero';
import ProductCard from './components/products/product-card';
import { Card, Skeleton } from '@nextui-org/react';
import { ProductData } from '@/types/product';
import AdminTableView from './components/tables/admin-table';

const fetchProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/status/accepted/`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default async function Page() {
  const session = await getSession();
  const products = await fetchProducts();

  if (session.role === UserRole.Admin) {
    return <AdminTableView />;
  }

  return (
    <>
      {!session.isLoggedIn && <Hero />}
      <div className="bg-slate-100 md:px-24 px-8 min-h-screen">
        <div className="text-lg font-medium text-custom-900 py-8">Products for You</div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 pb-6">
          {products.length === 0 ? (
            [...Array(10)].map((_, index) => (
              <Card className="w-full space-y-5 p-4" radius="lg" key={index}>
                <Skeleton className="rounded-lg">
                  <div className="h-44 rounded-lg bg-secondary"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                  </Skeleton>
                </div>
              </Card>
            ))
          ) : (
            products.map((product: ProductData) => (
              <ProductCard key={product.code} productData={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
