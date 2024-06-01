'use client'
import { Key, useEffect, useState } from "react";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { EllipsisVertical, PencilIcon, Plus, Trash, TriangleAlert } from "lucide-react";
import React from "react";
import { Product, ProductData, ProductStatus, toProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const handleDeleteConfirm = async (onClose: any) => {
        if (selectedProduct) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/delete/${selectedProduct.code}/`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log("Product deleted successfully:", selectedProduct);
                    setProducts(products.filter(product => product.code !== selectedProduct.code));
                } else {
                    console.error("Error deleting product:", response.statusText);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
        onClose();
    };

    const columns = [
        { name: "", uid: "photos" },
        { name: "NAME", uid: "name" },
        { name: "CATEGORY", uid: "category" },
        { name: "STATUS", uid: "status" },
        { name: "STOCK", uid: "stock" },
        { name: "PRICE", uid: "revenue" },
        { name: "", uid: "actions" },
    ];


    type ChipColor = "success" | "danger" | "warning" | "default" | "primary" | "secondary";
    const statusColorMap: Record<ProductStatus, ChipColor> = {
        [ProductStatus.ACCEPTED]: "success",
        [ProductStatus.BANNED]: "danger",
        [ProductStatus.INREVIEW]: "warning",
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/seller/${user.id}/`);
                const productsData = await res.json();
                const products: Product[] = productsData.map((productData: ProductData) => (toProduct(productData)));
                setProducts(products);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };

        if (user.id !== -1) {
            fetchProducts();
        }
    }, [user.id]);

    const renderCell = React.useCallback((product: Product, columnKey: Key) => {
        const cellValue = product[columnKey as keyof Product];

        switch (columnKey) {
            case "photos":
                return (
                    <div className="flex flex-col">
                        <img className="object-cover w-[60px] h-[60px] rounded" src={product.photos[0].image}></img>
                    </div>
                );
            case "name":
                return (
                    <div className="flex flex-col">
                        <Link href={`/${product.user.username}/${product.code}`}>
                            <p className="text-custom-900 text-base">{product.name}</p>
                        </Link>
                    </div>
                );
            case "category":
                return (
                    <div className="flex flex-col">
                        <p className="text-base capitalize">{product.category}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[product.status]} size="md" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "stock":
                return (
                    <div className="text-base">
                        {product.stock}
                    </div>
                );
            case "revenue":
                return (
                    <div className="text-base">
                        {product.revenue}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Dropdown className="!min-w-0 !w-fit">
                            <DropdownTrigger>
                                <EllipsisVertical size={18} />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="edit"
                                    startContent={<PencilIcon className="size-4" />}
                                    onClick={() => {
                                        // route ke edit
                                    }}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<Trash className="size-4" />}
                                    onClick={() => {handleDeleteClick(product)}}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
                        <Table selectionMode="single" aria-label="Listings table">
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.uid} align={column.uid === "photos" ? "center" : "start"}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={products} emptyContent={"No rows to display."}>
                                {(item) => (
                                    <TableRow key={item.code}>
                                        {(columnKey) =>
                                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                                        }
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">
                                <TriangleAlert className="text-red-600" size={40} />
                                Are you sure you want to delete?
                            </ModalHeader>
                            <ModalBody>
                                <p className="flex justify-center">
                                    This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={() => {handleDeleteConfirm(onClose)}}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export const dummyProducts = [
    {
        "code": "4f4e55e3-425d-4ecf-b677-e9d222e4a114",
        "name": "1989 (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.ACCEPTED,
        "stock": 100,
        "revenue": 1500.0,
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://upload.wikimedia.org/wikipedia/id/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
    },
    {
        "code": "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1",
        "name": "The Last of Us Part I",
        "category": "Gaming",
        "status": ProductStatus.BANNED,
        "stock": 200,
        "revenue": 2000.0,
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
    },
    {
        "code": "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2",
        "name": "Fearless (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.BANNED,
        "stock": 150,
        "revenue": 2500.0,
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://upload.wikimedia.org/wikipedia/id/6/60/Taylor_Swift_-_Fearless_%28Taylor%27s_Version%29.png",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
    },
    {
        "code": "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3",
        "name": "The Witcher 3: Wild Hunt",
        "category": "Gaming",
        "status": ProductStatus.INREVIEW,
        "stock": 250,
        "revenue": 3000.0,
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
    },
    {
        "code": "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4",
        "name": "Speak Now (Taylor's Version) Taylor Swift",
        "category": "Music",
        "status": ProductStatus.ACCEPTED,
        "stock": 300,
        "revenue": 3500.0,
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f4f02ab3-f211-4f94-a56a-bedff443c1f5/dfzab29-c99a3416-8b4e-4b54-bfcf-41c8e71163d7.png/v1/fill/w_1280,h_1280,q_80,strp/speak_now_taylors_version_album_cover_red_by_justintheswift_dfzab29-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2Y0ZjAyYWIzLWYyMTEtNGY5NC1hNTZhLWJlZGZmNDQzYzFmNVwvZGZ6YWIyOS1jOTlhMzQxNi04YjRlLTRiNTQtYmZjZi00MWM4ZTcxMTYzZDcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.g6dACuYcHmlBfrkMOqw4TMJfOEEZ4C_TaH6AyyA_gUM",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
    },
    {
        "code": "47911a63-9be1-416c-8586-6f30c2da26cc",
        "photos": [
            {
                "id": "083f8925-5187-4387-bc6c-d26406a22db2",
                "product": "47911a63-9be1-416c-8586-6f30c2da26cc",
                "image": "https://images.unsplash.com/photo-1562113530-57ba467cea38?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "status": "Bokeh"
            }
        ],
        "user": {
            "id": 1,
            "username": "gib"
        },
        "name": "Wooden chair",
        "category": "Furniture",
        "status": ProductStatus.ACCEPTED,
        "stock": 100,
        "revenue": 500000.0
    }
]