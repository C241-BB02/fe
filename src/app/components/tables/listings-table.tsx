'use client';

import React, { useState, Key } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from "@nextui-org/react";
import { EllipsisVertical, PencilIcon, Plus, Trash, TriangleAlert } from "lucide-react";
import { Product, ProductStatus } from "@/types/product";
import { useRouter } from 'next/navigation';

const MyListingsTable = ({ products: initialProducts }: { products: Product[]}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

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

  const renderCell = (product: Product, columnKey: Key) => {
    const cellValue = product[columnKey as keyof Product];
    switch (columnKey) {
      case "photos":
        return (
          <div className="flex flex-col">
            <img className="object-cover w-[60px] h-[60px] rounded" src={product.photos[0].image} alt={product.name}></img>
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
        return product.status === ProductStatus.BANNED ? (
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Chip className="capitalize cursor-pointer" color="danger" size="md" variant="flat">
                {cellValue}
              </Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-2 py-2">
                <div className="text-tiny">This product is banned because it has fewer than three non-blurry images.</div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
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
            {product.price}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown className="!min-w-0 !w-fit">
              <DropdownTrigger>
                <EllipsisVertical size={18} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions">
                <DropdownItem
                  key="edit"
                  startContent={<PencilIcon className="size-4" />}
                  onClick={() => {
                    router.push(`/edit-product/${product.code}`)
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash className="size-4" />}
                  onClick={() => { handleDeleteClick(product) }}
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
  };

  return (
    <>
      <div className="min-h-screen bg-slate-100 md:px-24 px-8">
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
                <Button color="danger" onPress={() => { handleDeleteConfirm(onClose) }}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyListingsTable;
