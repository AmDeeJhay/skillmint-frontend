import { Button } from "@/components/ui/button";
import usePaginationStore from "@/store/usePaginationStore";

interface PaginationProps {
  totalItems: number;
  onPageChange?: (page: number) => void;
  className?: string;
}
export default function Pagination({ 
    totalItems, 
    onPageChange,
    className = "" 
  }: PaginationProps) {
    const { currentPage, itemsPerPage, setCurrentPage } = usePaginationStore();
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        onPageChange?.(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  
    const renderPaginationButtons = () => {
      const buttons = [];
      const maxVisibleButtons = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
      
      if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }
  
      buttons.push(
        <Button
          key="prev"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
      );
  
      if (startPage > 1) {
        buttons.push(
          <Button key={1} variant="outline" onClick={() => handlePageChange(1)}>
            1
          </Button>
        );
        if (startPage > 2) {
          buttons.push(
            <span key="ellipsis1" className="px-2 text-gray-500">...</span>
          );
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <Button
            key={i}
            variant="outline"
            className={
              currentPage === i
                ? "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400"
                : ""
            }
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(
            <span key="ellipsis2" className="px-2 text-gray-500">...</span>
          );
        }
        buttons.push(
          <Button
            key={totalPages}
            variant="outline"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
  
      buttons.push(
        <Button
          key="next"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      );
  
      return buttons;
    };
  
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="flex items-center gap-2">
          {renderPaginationButtons()}
        </div>
      </div>
    );
  }
