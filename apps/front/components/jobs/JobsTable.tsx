"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { getUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, X } from "lucide-react";
import { getJobsByUserId } from "@/actions/jobs";
import { Job } from "@/types/jobs";
import CreateUpdateJob from "./CreateUpdateJob";
import DeleteJob from "./DeleteJob";

const JobsTable = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const verifyRoleAndGetJobs = async () => {
      const validUser = await getUser();
      if (validUser?.role !== "recruiter") {
        router.push("/");
      } else {
        const result = await getJobsByUserId();
        if (result.success) {
          setJobs(result.jobs);
        } else {
          toast.error(result.error);
        }
      }
    };

    verifyRoleAndGetJobs();
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit bg-white" placeholder="Filtrar por nombre" />
        <CreateUpdateJob setJobs={setJobs} jobs={jobs}>
          <Button variant="outline" className="bg-yellow-500 text-white">
            Nuevo Empleo
          </Button>
        </CreateUpdateJob>
      </div>
      <Table className="bg-white">
        <TableCaption>Lista de tus empleos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Experiencia</TableHead>
            <TableHead>Sueldo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Vacantes</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.length
            ? jobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job.company.name}
                  </TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.experienceLevel}</TableCell>
                  <TableCell>${job.salary}</TableCell>
                  <TableCell>
                    {job.createdAt.toString().split("T")?.[0]}
                  </TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell className="float-right cursor-pointer flex items-center gap-2">
                    <CreateUpdateJob setJobs={setJobs} jobs={jobs} job={job}>
                      <Edit2 className="bg-yellow-500 text-white p-1 rounded-md h-7 w-7" />
                    </CreateUpdateJob>
                    <DeleteJob job={job} setJobs={setJobs} jobs={jobs}>
                      <X className="bg-red-700 text-white p-1 rounded-md h-7 w-7 cursor-pointer" />
                    </DeleteJob>
                  </TableCell>
                  <TableCell className="float-right cursor-pointer"></TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default JobsTable;
