import { ReactNode } from "react";

export interface Product {
    code: string;
    name: string;
    category: string;
    status: ProductStatus;
    stock: number;
    price: string;
    user: any;
    photos: any[];
    description: string;
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
    price: number;
    description: string;
  }

export enum ProductStatus {
    ACCEPTED = "Accepted",
    BANNED = "Banned",
    INREVIEW = "In Review",
}

export const toPriceString = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
};

export const toPriceNumber = (price: string) => {
    return parseFloat(price.replace(/[^\d,-]/g, '').replace(',', '.'))
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
        price: toPriceString(productData.price),
        description: productData.description
      };
};