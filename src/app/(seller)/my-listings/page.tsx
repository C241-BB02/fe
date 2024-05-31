'use client'
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/app/components/products/product-card";
import { Key, useEffect, useState } from "react";
import { Chip, Link, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon, Plus } from "lucide-react";
import React from "react";
import { Product, ProductStatus } from "@/types/product";

export default function Page() {
    // const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "CATEGORY", uid: "category" },
        { name: "STATUS", uid: "status" },
        { name: "STOCK", uid: "stock" },
        { name: "REVENUE", uid: "revenue" },
        { name: "ACTIONS", uid: "actions" },
    ];


    type ChipColor = "success" | "danger" | "warning" | "default" | "primary" | "secondary";
    const statusColorMap: Record<ProductStatus, ChipColor> = {
        [ProductStatus.Active]: "success",
        [ProductStatus.Banned]: "danger",
        [ProductStatus.InReview]: "warning",
    };

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await fetch("https://dummyjson.com/products");
    //             const productsData = await res.json();
    //             setProducts(productsData.products);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    const renderCell = React.useCallback((product: Product, columnKey: Key) => {
        const cellValue = product[columnKey as keyof Product];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p>{product.name}</p>
                    </div>
                );
            case "category":
                return (
                    <div className="flex flex-col">
                        <p className="text-sm capitalize">{product.category}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "stock":
                return (
                    <div className="text-sm">
                        {product.stock}
                    </div>
                );
            case "revenue":
                return (
                    <div className="text-sm">
                        ${product.revenue.toFixed(2)}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit product">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete product">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="min-h-screen bg-slate-100 md:px-24 px-8">
                {isLoading ? (
                    <div className="h-screen flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center gap-4 pb-4">
                            <div className="text-lg font-medium text-custom-900 py-8">Your Listings</div>
                            <Link
                                href="/add-product"
                                className="bg-custom-600 text-white px-3 py-2 rounded rounded-xl hover:bg-custom-900  focus:ring focus:ring-custom-100 active:bg-custom-900 active:border-custom-900 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                            >
                                <Plus className="inline-block size-4 leading-none mr-2" />
                                <span className="align-middle pr-1">Add Product</span>
                            </Link>
                        </div>
                        <Table aria-label="Example table with custom cells">
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={dummyProducts} emptyContent={"No rows to display."}>
                                {(item) => (
                                    <TableRow key={item.code}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    )
}

export const dummyProducts = [
    {
        "code": "4f4e55e3-425d-4ecf-b677-e9d222e4a114",
        "name": "1989 (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.Active,
        "stock": 100,
        "revenue": 1500.0,
        "user_id": "333a4567-e89b-12d3-a456-426614174000"
    },
    {
        "code": "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1",
        "name": "The Last of Us Part I",
        "category": "Gaming",
        "status": ProductStatus.Banned,
        "stock": 200,
        "revenue": 2000.0,
        "user_id": "333a4567-e89b-12d3-a456-426614174000"
    },
    {
        "code": "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2",
        "name": "Fearless (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.Banned,
        "stock": 150,
        "revenue": 2500.0,
        "user_id": "333a4567-e89b-12d3-a456-426614174000"
    },
    {
        "code": "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3",
        "name": "The Witcher 3: Wild Hunt",
        "category": "Gaming",
        "status": ProductStatus.InReview,
        "stock": 250,
        "revenue": 3000.0,
        "user_id": "333a4567-e89b-12d3-a456-426614174000"
    },
    {
        "code": "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4",
        "name": "Speak Now (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.Active,
        "stock": 300,
        "revenue": 3500.0,
        "user_id": "333a4567-e89b-12d3-a456-426614174000"
    }
]