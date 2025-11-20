// components/Pagination.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '_/components/ui/pagination';


const generatePages = (currentPage: number, totalPages: number) => {
    const pages = [];
    const maxVisiblePages = 5; // Adjust for UI
    const sideWidth = Math.floor(maxVisiblePages / 2);

    let start = Math.max(currentPage - sideWidth, 1);
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
    }

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('ellipsis-start');
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push('ellipsis-end');
        pages.push(totalPages);
    }

    return pages;
};

export default function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const pages = generatePages(currentPage, totalPages);

    return (
        <ShadcnPagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>

                {pages.map((page, index) =>
                    page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={createPageURL(page as number)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? -1 : undefined}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}