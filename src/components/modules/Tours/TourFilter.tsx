import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useState } from "react";

const TourFilter = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );
  const [selectedTourType, setSelectedTourType] = useState<string | undefined>(
    undefined
  );

  // for division filtering
  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionQuery(undefined);

  const divisionOption = divisionData?.data?.map((division) => ({
    label: division.name,
    value: division._id,
  }));

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
  };

  // for tour type filtering
  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery(undefined);

  const tourTypeOption = tourTypeData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const handleTourTypeChange = (value) => {
    setSelectedTourType(value);
  };

  const handleClearFilter = () => {
    setSelectedDivision(undefined);
    setSelectedTourType(undefined);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TourFilter;
