"use client"

import {
    type ColumnDef,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Filter, Plus, Table as TableIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { PaginationModel, PostModel, SortModel } from "@/types/api"

interface DataTableProps<TData, TValue, TFilter = unknown> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowCount: number
    loading?: boolean
    onFilter?: () => void
    onInsert?: () => void
    postModel: PostModel<TFilter>
    onPaginationChange: (pagination: PaginationModel) => void
    onSortingChange: (sorting: SortModel) => void
}

export function DataTable<TData, TValue, TFilter = unknown>({
    columns,
    data,
    rowCount,
    loading,
    onFilter,
    onInsert,
    postModel,
    onPaginationChange,
    onSortingChange,
}: DataTableProps<TData, TValue, TFilter>) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = React.useState<string>("")

    const pagination = React.useMemo(() => ({
        pageIndex: postModel.pageOffset,
        pageSize: postModel.pageSize,
    }), [postModel.pageOffset, postModel.pageSize]);

    const sorting = React.useMemo<SortingState>(() => {
        if (postModel.sortField) {
            return [{ id: postModel.sortField, desc: postModel.sortOrder === 'desc' }];
        }
        return [];
    }, [postModel.sortField, postModel.sortOrder]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            globalFilter,
            pagination,
        },
        onSortingChange: (updater) => {
            const nextSorting = typeof updater === 'function' ? updater(sorting) : updater;
            if (nextSorting.length > 0) {
                onSortingChange(
                    nextSorting.map((sort) => ({
                        field: sort.id,
                        sort: sort.desc ? 'desc' : 'asc',
                    }))
                );
            }
        },
        onPaginationChange: (updater) => {
            const nextPagination = typeof updater === 'function' ? updater(pagination) : updater;
            onPaginationChange({
                pageOffset: nextPagination.pageIndex,
                pageSize: nextPagination.pageSize,
            });
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(rowCount / pagination.pageSize),
        manualSorting: true,
        enableSortingRemoval: false,
        sortDescFirst: true,
        columnResizeMode: 'onChange',
        enableColumnResizing: true,
    })

    // Calculate display range
    const startRow = pagination.pageIndex * pagination.pageSize + 1
    const endRow = Math.min((pagination.pageIndex + 1) * pagination.pageSize, rowCount)

    return (
        <div className="w-full rounded-md border flex flex-col flex-1 min-h-0">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-4 shrink-0 border-b bg-background/50 backdrop-blur-sm">
                {/* Left: Search */}
                <div className="relative max-w-xs w-full">
                    <Input
                        placeholder="Search items..."
                        value={globalFilter}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="pl-4 h-10 rounded-full bg-muted/20 border-muted-foreground/10 focus:bg-background transition-all duration-200"
                    />
                </div>

                {/* Right: Buttons */}
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-10 rounded-full px-5 border-muted-foreground/10 bg-background hover:bg-muted/50 transition-all">
                                <TableIcon className="h-4 w-4 mr-2 opacity-70" />
                                <span className="hidden md:inline font-medium">Columns</span>
                                <ChevronDown className="hidden md:inline ml-2 h-3.5 w-3.5 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-muted-foreground/10">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize rounded-sm"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {onFilter && (
                        <Button
                            variant="outline"
                            onClick={onFilter}
                            size="sm"
                            className="h-10 rounded-full px-5 `border-muted-foreground/10 bg-background hover:bg-muted/50 transition-all font-medium"
                        >
                            <Filter className="h-4 w-4 mr-2 opacity-70" />
                            <span className="hidden md:inline mr-2">Filter</span>
                        </Button>
                    )}

                    {onInsert && (
                        <Button
                            onClick={onInsert}
                            size="sm"
                            className="h-10 rounded-full px-6 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            <span className="hidden md:inline mr-2">Insert</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="border-t border-b flex-1 min-h-0 overflow-y-auto overflow-x-auto">
                <Table style={{ minWidth: table.getCenterTotalSize() }}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={`relative border-r last:border-r-0 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                            style={{ width: header.getSize() }}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-1">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                {header.column.getIsSorted() === 'asc' && (
                                                    <ArrowUp className="h-4 w-4" />
                                                )}
                                                {header.column.getIsSorted() === 'desc' && (
                                                    <ArrowDown className="h-4 w-4" />
                                                )}
                                            </div>
                                            {/* Resize handle */}
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-primary/50 ${header.column.getIsResizing() ? 'bg-primary' : ''}`}
                                            />
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
                                        <TableCell
                                            key={cell.id}
                                            className="border-r last:border-r-0"
                                            style={{ width: cell.column.getSize() }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {loading ? "Loading..." : "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Bar */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0">
                <div className="hidden md:block flex-1 text-sm text-muted-foreground">
                    Total Rows: {rowCount}
                </div>

                <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
                    <div className="flex items-center gap-2">
                        <p className="hidden md:inline text-sm text-muted-foreground">Rows per page:</p>
                        <Select
                            value={`${pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-7 w-[65px] border-0 text-sm gap-1.5 px-2">
                                <SelectValue placeholder={pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {rowCount > 0 ? `${startRow}\u2013${endRow} of ${rowCount}` : "0 of 0"}
                    </span>

                    <div className="flex items-center space-x-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
