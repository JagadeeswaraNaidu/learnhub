"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  subtitle?: string;
  searchable?: boolean;
  searchKeys?: string[];
  pageSize?: number;
  filterOptions?: { key: string; label: string; options: string[] }[];
}

export default function DataTable<T extends { [key: string]: any }>({
  columns,
  data,
  title,
  subtitle,
  searchable = true,
  searchKeys = [],
  pageSize = 10,
  filterOptions = [],
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter((row) => {
    const matchesSearch =
      !searchQuery ||
      searchKeys.some((key) => {
        const value = String(row[key] ?? "").toLowerCase();
        return value.includes(searchQuery.toLowerCase());
      });

    const matchesFilters = Object.entries(activeFilters).every(
      ([key, value]) => !value || String(row[key]) === value
    );

    return matchesSearch && matchesFilters;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] as string | number;
    const bVal = b[sortKey] as string | number;
    if (aVal === bVal) return 0;
    const result = aVal < bVal ? -1 : 1;
    return sortDirection === "asc" ? result : -result;
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#262626]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-[#A1A1AA] mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {searchable && (
              <div className="w-64">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  icon={<Search size={16} />}
                />
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        {filterOptions.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Filter size={14} className="text-[#52525B]" />
            {filterOptions.map((filter) => (
              <select
                key={filter.key}
                value={activeFilters[filter.key] || ""}
                onChange={(e) => {
                  setActiveFilters((prev) => ({
                    ...prev,
                    [filter.key]: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="input-modern w-auto text-xs py-1.5 px-2"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((opt, idx) => (
                  <option key={`${filter.key}-${idx}`} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ))}
            {Object.values(activeFilters).some(Boolean) && (
              <button
                onClick={() => setActiveFilters({})}
                className="text-xs text-[#6366F1] hover:text-[#4F46E5] font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={col.sortable ? "cursor-pointer select-none" : ""}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-[#6366F1]">
                        {sortDirection === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <motion.tr
                key={row.id || `row-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </motion.tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-[#52525B]"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#262626]">
          <p className="text-xs text-[#52525B]">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  page === currentPage
                    ? "bg-[#6366F1] text-white"
                    : "text-[#A1A1AA] hover:bg-white/5"
                }`}
              >
                {page}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
