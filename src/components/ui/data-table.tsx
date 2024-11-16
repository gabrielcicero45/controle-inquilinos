"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import React from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        }
    })

    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por nome"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm mx-4"
                />
                <Input
                    placeholder="Filtrar por CPF"
                    value={(table.getColumn("cpf")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("cpf")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm mx-4"
                />
                <Select 
                    onValueChange={(value) =>
                        table.getColumn("kitnetSize")?.setFilterValue(value === " " ? null : value)
                    }
                >
                    <SelectTrigger className="w-[180px] mx-4">
                        <SelectValue placeholder="Tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=" ">---</SelectItem>
                        <SelectItem value="grande">Grande</SelectItem>
                        <SelectItem value="médio">Médio</SelectItem>
                        <SelectItem value="pequeno">Pequeno</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value) =>
                        table.getColumn("isDelinquent")?.setFilterValue(value === " " ? null : value)
                    }
                >
                    <SelectTrigger className="mx-4">
                        <SelectValue placeholder="Status de Inadimplencia" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=" ">---</SelectItem>
                        <SelectItem value={true}>Sim</SelectItem>
                        <SelectItem value={false}>Nao</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
