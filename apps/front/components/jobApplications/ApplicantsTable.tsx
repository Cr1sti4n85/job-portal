"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/application";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { updateStatusRequest } from "@/lib/apiRequests";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { GrDocumentCloud } from "react-icons/gr";

type Props = {
  applications: Application[];
};

const ApplicantsTable = ({ applications }: Props) => {
  const statusList = ["accepted", "rejected"];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const statusHandler = async (applicationId: string, status: string) => {
    const data = await updateStatusRequest(applicationId, status);
    if (!data.success) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      router.refresh();
      setOpen(false);
    }
  };
  return (
    <Table className="bg-white">
      <TableCaption>Lista de tus empleos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>CV</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications?.length
          ? applications?.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.applicant.fullName}
                </TableCell>
                <TableCell>{application.applicant.email}</TableCell>

                <TableCell>
                  {application.createdAt.toString().split("T")[0]}
                </TableCell>
                <TableCell>
                  <Link
                    href={application.applicant.profileResume || "#"}
                    target="_blank"
                  >
                    <GrDocumentCloud size={24} className="text-red-500" />
                  </Link>
                </TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell className="cursor-pointer float-end">
                  <div className="flex gap-6">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-24 text-center">
                        {statusList.map((s, idx) => (
                          <div
                            key={idx}
                            className="w-full items-center gap-2 cursor-pointer hover:bg-gray-500 hover:text-white"
                            onClick={() => statusHandler(application.id, s)}
                          >
                            <span>{s}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
