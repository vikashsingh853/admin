import  { useEffect, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type TableProps<T extends Record<string, unknown>> = {
    data?: T[];
    apiEndpoint?: string;
    actions?: (row: T) => { label: string; onClick: () => void }[];
    shownKeys?: string[];
    mandatoryKeys: string[];
    filterKeys?:string[]
};

export function DataTable<T extends Record<string, any>>({
    data: initialData,
    apiEndpoint,
    actions,
    shownKeys = [],
    mandatoryKeys,
    filterKeys
}: TableProps<T>) {
    const [data, setData] = useState<T[]>(initialData || []);
    const [loading, setLoading] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [visibleColumnsMenu, setVisibleColumnsMenu] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<{ id: string; desc: boolean } | null>(null);
    const [filter, setFilter] = useState<{ [key: string]: string }>({});
    const [debouncedFilter, setDebouncedFilter] = useState(filter);

    // Debounce search input for efficiency
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 500);
        return () => clearTimeout(handler);
    }, [filter]);

    // Fetch data if using API
    // Chnage to hook
    useEffect(() => {
        if (!apiEndpoint) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    pageSize: String(pageSize),
                    ...(sorting ? { sortBy: sorting.id, sortOrder: sorting.desc ? "desc" : "asc" } : {}),
                    ...Object.fromEntries(Object.entries(debouncedFilter).map(([k, v]) => [k, v])),
                });

                const response = await fetch(`${apiEndpoint}?${params.toString()}`);
                const result = await response.json();

                setData(result.results);
            //  TODO: chnage to data key
                
                if (visibleColumns.length === 0) {
                    const keys = Object.keys(result.results[0] || {}).filter((key) => (shownKeys.includes(key)|| mandatoryKeys.includes(key)));
                    setVisibleColumns(keys);
                    setVisibleColumnsMenu(keys)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        if (data?.length === 0) {
            fetchData();
        }

    }, [apiEndpoint, page,data, pageSize, sorting, debouncedFilter, mandatoryKeys, shownKeys, visibleColumns]);

    // Use local data if available
    useEffect(() => {
        if (!apiEndpoint && initialData) {
            let filteredData = initialData;
            Object.entries(filter).forEach(([key, value]) => {
                filteredData = filteredData.filter((item) =>
                    item[key]?.toString().toLowerCase().includes(value.toLowerCase())
                );
            });

            if (sorting) {
                filteredData.sort((a, b) => {
                    const aValue = a[sorting.id];
                    const bValue = b[sorting.id];

                    if (aValue < bValue) return sorting.desc ? 1 : -1;
                    if (aValue > bValue) return sorting.desc ? -1 : 1;
                    return 0;
                });
            }

            setData(filteredData.slice((page - 1) * pageSize, page * pageSize));
            if (visibleColumns.length === 0) {

                const keys = Object.keys(filteredData[0] || {}).filter((key) => (mandatoryKeys.includes(key) || shownKeys.includes(key)) );
                setVisibleColumns(keys);
                setVisibleColumnsMenu(keys)
            }
        }
    }, [initialData, page, pageSize, sorting, filter, apiEndpoint, mandatoryKeys,shownKeys, visibleColumns]);

    const handleToggleColumn = (key: string) => {
        if (mandatoryKeys.includes(key)) return;
        setVisibleColumns((prev) =>
            prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
        );
    };

    

    const columns: ColumnDef<T, any>[] = [
        {
            accessorKey: "index",
            header: () => (
                <div className="flex justify-between items-center ">
                    <span>Index</span>
                </div>
            ),
            cell: ({ row }) => (page - 1) * pageSize + row.index + 1,
        },
        ...visibleColumns.map((key) => ({
            accessorKey: key,
            header: () => (
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                        setSorting((prev) =>
                            prev?.id === key ? { id: key, desc: !prev.desc } : { id: key, desc: false }
                        )
                    }
                >
                    {key} {sorting?.id === key ? (sorting.desc ? "🔽" : "🔼") : ""}
                 { !mandatoryKeys.includes(key)&&   <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleColumn(key);
                        }}
                    >
                        ✖
                    </Button>}
                </div>
            ),
            cell: ({ row }) => row.original[key] ?? "-",
        })),
        {
            accessorKey: "actions",
            header: () => (
                <div className="flex justify-between items-center ">
                    <span>Actions</span>
                </div>
            ),
            cell: ({ row }) =>
                actions ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">⋮</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {actions(row.original).map((action, idx) => (
                                <DropdownMenuItem key={idx} onClick={action.onClick}>
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className=" ">
            {/* Search & Column Management */}
            <div className="flex justify-between mb-4">
                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-2">
                    {visibleColumns.map((col) => (
                        <>
                        {filterKeys?.includes(col)  &&<Input
                            key={col}
                            placeholder={`Search ${col}`}
                            value={filter[col] || ""}
                            onChange={(e) =>
                                setFilter((prev) => ({ ...prev, [col]: e.target.value }))
                            }
                            className="w-40"
                            />}
                            </>
                    ))}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Manage Columns</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {visibleColumnsMenu.map((key) => (
                            <DropdownMenuItem className={cn('cursor-pointer ',{ 'cursor-not-allowed opacity-50': mandatoryKeys.includes(key) })} key={key} onClick={() => handleToggleColumn(key)}>
                                {visibleColumns.includes(key) ? "✔" : ""} {key}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (<div className="max-w-screen-2xl overflow-x-auto">
                    <table className="w-full  border border-gray-300 rounded-md">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="p-2 border-r">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-2 border-r">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    </table></div>
            )}
        </div>
    );
}
