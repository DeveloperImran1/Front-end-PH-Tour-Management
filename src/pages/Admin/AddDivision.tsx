import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";

const AddDivision = () => {
  const handleRemoveTourType = async () => {
    // const toastId = toast.loading("Loading .....");
    // try {
    //   const res = await deleteTourType(tourTypeId).unwrap();
    //   console.log(res);
    //   if (res.success) {
    //     toast.success("Tour Type Remove", { id: toastId });
    //   }
    // } catch (error) {
    //   console.log("Tour type delete", error);
    // }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">All Division</h1>
        <AddDivisionModal />
      </div>
      {/* <div className="border border-muted rounded-md">
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
      </div> */}
    </div>
  );
};

export default AddDivision;
