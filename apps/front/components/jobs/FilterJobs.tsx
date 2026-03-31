"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterData } from "@/lib/filterJobData";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FilterJobs = ({ keyword }: { keyword: string | undefined }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [selectedSalary, setSelectedSalary] = useState<string>("");
  const router = useRouter();

  const handleFilterChange = async (filterParam: string, option: string) => {
    if (filterParam === "location") setSelectedLocation(option);
    else if (filterParam === "jobType") setSelectedJobType(option);
    else setSelectedSalary(option);
  };

  useEffect(() => {
    router.push(
      `/job?keyword=${keyword}&location=${selectedLocation}&jobType=${selectedJobType}&salary=${selectedSalary}`,
    );
  }, [keyword, selectedJobType, selectedSalary, selectedLocation, router]);

  return (
    <div>
      {filterData?.map((item, idx) => (
        <Accordion key={idx} type="single" collapsible className="max-w-lg">
          <AccordionItem value={`item-${idx}`}>
            <AccordionTrigger>{item.filterLabel}</AccordionTrigger>
            <AccordionContent>
              {item.opts.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center my-5 cursor-pointer"
                  onClick={() => handleFilterChange(item.filterParam, option)}
                >
                  <Label htmlFor={idx.toString()} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FilterJobs;
