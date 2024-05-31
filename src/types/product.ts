export interface Product {
    code: string;
    name: string;
    category: string;
    status: ProductStatus;
    stock: number;
    revenue: number;
    user_id: string;
}

export enum ProductStatus {
    Active = "Active",
    Banned = "Banned",
    InReview = "In Review",
}