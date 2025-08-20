import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const [deleteTourType] = useDeleteTourTypeMutation();

  console.log(data);
  const handleRemoveTourType = async (tourTypeId: string) => {
    const toastId = toast.loading("Loading .....");

    try {
      const res = await deleteTourType(tourTypeId).unwrap();

      console.log(res);
      if (res.success) {
        toast.success("Tour Type Remove", { id: toastId });
      }
    } catch (error) {
      console.log("Tour type delete", error);
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AddTourType;
