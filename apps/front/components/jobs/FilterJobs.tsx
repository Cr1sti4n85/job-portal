import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterData } from "@/lib/filterJobData";
import Link from "next/link";
import { Label } from "../ui/label";

const FilterJobs = () => {
  return (
    <div>
      {filterData?.map((item, idx) => (
        <Accordion key={idx} type="single" collapsible className="max-w-lg">
          <AccordionItem value={`item-${idx}`}>
            <AccordionTrigger>{item.filterType}</AccordionTrigger>
            <AccordionContent>
              {item.opts.map((option, idx) => (
                <Link
                  key={idx}
                  href={`/job?${item.filterType}`}
                  className="flex items-center my-5 cursor-pointer"
                >
                  <Label htmlFor={idx.toString()} className="cursor-pointer">
                    {option}
                  </Label>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FilterJobs;
