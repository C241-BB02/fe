import { ReactNode } from "react";

export interface Product {
    code: string;
    name: string;
    category: string;
    status: ProductStatus;
    stock: number;
    revenue: string;
    user: any;
    photos: any[];
}

export interface ProductData {
    code: string;
    photos: {
      id: string;
      image: string;
      status: keyof typeof ProductStatus;
    }[];
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
    };
    name: string;
    category: string;
    status: keyof typeof ProductStatus;
    stock: number;
    revenue: number;
  }

export enum ProductStatus {
    ACCEPTED = "Accepted",
    BANNED = "Banned",
    INREVIEW = "In Review",
}

export const toPrice = (price: number) => {
    return 
};

export const toProduct = (productData: ProductData) => {
    return {
        code: productData.code,
        photos: productData.photos,
        user: productData.user,
        name: productData.name,
        category: productData.category,
        status: ProductStatus[productData.status],
        stock: productData.stock,
        revenue: `Rp${productData.revenue.toLocaleString().replace(",", ".")}`
      };
};