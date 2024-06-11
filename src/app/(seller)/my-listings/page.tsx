import React from 'react';
import { getSession } from '@/context/actions';
import MyListingsTable from '@/app/components/tables/listings-table';
import { redirect } from 'next/navigation';
import { ProductData, toProduct } from '@/types/product';

const fetchSellerProducts = async (sellerId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/seller/${sellerId}/`);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      let json = await res.json();
      return json.map((productData: ProductData) => (toProduct(productData)));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

export default async function Page() {
  const session = await getSession();
  const products = await fetchSellerProducts(session.id!);
  if (!session.isLoggedIn) {
    redirect('/');
  }
  return <MyListingsTable products={products} />;
}
