'use client'
import React, { Key, useState } from "react";
import { Chip, Link, Popover, PopoverContent, PopoverTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import { Product, ProductData, ProductStatus, toPriceNumber, toProduct } from "@/types/product";
import {useAsyncList} from "@react-stately/data";

export default function AdminTableView() {
    const [isLoading, setIsLoading] = useState(true);
    const profileUrlBase = "https://avatar.iran.liara.run/username?username=";
    const columns = [
        { name: "USER", uid: "user" },
        { name: "NAME", uid: "name" },
        { name: "CATEGORY", uid: "category" },
        { name: "STATUS", uid: "status" },
        { name: "STOCK", uid: "stock" },
        { name: "PRICE", uid: "price" },
        { name: "", uid: "photos" },
    ];

    type ChipColor = "success" | "danger" | "warning" ;
    const statusColorMap: Record<ProductStatus, ChipColor> = {
        [ProductStatus.ACCEPTED]: "success",
        [ProductStatus.BANNED]: "danger",
        [ProductStatus.INREVIEW]: "warning",
    };

    let list = useAsyncList({
        async load({signal}) {
          let res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`, {
            signal,
          });
          let json = await res.json();
          let products: Product[] = json.map((productData: ProductData) => (toProduct(productData)));
          setIsLoading(false);
          return {
            items: products,
          };
        },
        async sort({items, sortDescriptor}) {
          return {
            items: items.sort((a: any, b: any) => {
              let first;
              let second;
              switch (sortDescriptor.column) {
                case "price": {
                    first = `${toPriceNumber(a[sortDescriptor.column])}`;
                    second = `${toPriceNumber(b[sortDescriptor.column])}`;
                    break;
                } case "user": {
                    first = a.user.username;
                    second = b.user.username;
                    break;
                } default: {
                    first = a[sortDescriptor.column as keyof Product];
                    second = b[sortDescriptor.column as keyof Product];
                }
              }
              
              let cmp = (parseInt(first) || first.toUpperCase()) < (parseInt(second) || second.toUpperCase()) ? -1 : 1;
    
              if (sortDescriptor.direction === "descending") {
                cmp *= -1;
              }
    
              return cmp;
            }),
          };
        },
      });
   
    const renderCell = React.useCallback((product: Product, columnKey: Key) => {
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
                            <p className="text-custom-900 text-base">{cellValue}</p>
                        </Link>
                    </div>
                );
            case "category":
                return (
                    <div className="flex flex-col">
                        <p className="text-base capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                return product.status === ProductStatus.BANNED ? (
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <Chip className="capitalize cursor-pointer" color={statusColorMap[product.status]} size="md" variant="flat">
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
                        {cellValue}
                    </div>
                );
            case "price":
                return (
                    <div className="text-base">
                        {cellValue}
                    </div>
                );
            case "user":
                return (
                    <User
                        avatarProps={{src: profileUrlBase + cellValue.username}}
                        name={(<div className="text-tiny">{cellValue.username}</div>)}
                    />
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="min-h-screen bg-slate-100 md:px-24 px-8 pb-10">
                
                    <div>
                        <div className="flex justify-between items-center gap-4 pb-4">
                            <div className="text-lg font-medium text-custom-900 py-8">Product List</div>
                        </div>
                        <Table 
                            selectionMode="single" 
                            aria-label="Listings table" 
                            sortDescriptor={list.sortDescriptor} 
                            onSortChange={list.sort} 
                            classNames={{
                                table: "min-h-[400px]",
                            }}>
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.uid} align={column.uid === "photos" ? "center" : "start"} allowsSorting={!["photos", "stock"].includes(column.uid)}>
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={list.items}  isLoading={isLoading} loadingContent={<Spinner/>} emptyContent={"No rows to display."}>
                                {(item: any) => (
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
        </>
    )
}