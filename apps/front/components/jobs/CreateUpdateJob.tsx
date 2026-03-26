"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { Job } from "@/types/jobs";
import SelectForm from "../SelectForm";
import { experience, jobsList, locations } from "@/lib/filterJobData";
import { toast } from "sonner";
import { createJobRequest, updateJobRequest } from "@/lib/apiRequests";
import { getUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { Company } from "@/types/company";
import { findCompanies } from "@/actions/companies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

type Props = PropsWithChildren<{
  setJobs: (jobs: Job[]) => void;
  jobs: Job[];
  job?: Job;
}>;

const CreateUpdateJob = ({ children, setJobs, jobs, job }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [jobData, setJobData] = useState<Job>(job ? { ...job } : ({} as Job));

  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const verifyRoleAndGetCompanies = async () => {
      const validUser = await getUser();
      if (validUser?.role !== "recruiter") {
        router.push("/");
      } else {
        const result = await findCompanies();
        if (result.success) {
          setCompanies(result.companies);
        } else {
          toast.error(result.error);
        }
      }
    };

    verifyRoleAndGetCompanies();
  }, [router]);

  const jobHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = job?.id
        ? await updateJobRequest(jobData, job.id)
        : await createJobRequest(jobData);
      if (data.success) {
        toast.success(data.message);
        if (job?.id) {
          setJobs(jobs?.map((j) => (j.id == data.job.id ? data.job : j)));
        } else {
          setJobs([...jobs, data.job]);
        }
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Ocurrió un error");
    } finally {
      setJobData({} as Job);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear/Modificar</DialogTitle>
          <DialogDescription className="my-10 text-center font-bold text-yellow-400 text-2xl">
            Nuevo empleo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={jobHandler}>
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="Título"
              type="text"
              name="title"
              placeholder="Ingresa título del aviso"
              defaultValue={job?.title}
              onChange={(e) =>
                setJobData({ ...jobData, title: e.target.value })
              }
            />
            <FormInput
              label="Descripción"
              type="text"
              name="description"
              placeholder="Ingresa una descripción"
              defaultValue={job?.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
            />
            <FormInput
              label="Requisitos"
              type="text"
              name="requirements"
              placeholder="Ingresa los requisitos separados por comas"
              defaultValue={job?.requirements?.join(", ")}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  requirements: e.target.value.split(","),
                })
              }
            />
            <FormInput
              label="Sueldo"
              type="number"
              name="salary"
              placeholder="Ingresa el sueldo"
              defaultValue={job?.salary.toString()}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  salary: parseInt(e.target.value),
                })
              }
            />
            <SelectForm
              label="Ubicación"
              name="location"
              placeholder="Ingresa ubicación"
              list={locations}
              data={job}
              setData={setJobData}
            />
            <SelectForm
              label="Rol"
              name="jobType"
              placeholder="Selecciona rol de empleo"
              list={jobsList}
              data={job}
              setData={setJobData}
            />
            <SelectForm
              label="Experiencia"
              name="experienceLevel"
              placeholder="Ingresa nivel de experiencia"
              list={experience}
              data={job}
              setData={setJobData}
            />

            <div className="my-3">
              <Label htmlFor="companyId" className="mb-2">
                Empresa
              </Label>
              <Select name="companyId" defaultValue={job?.companyId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona la empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecciona el rol</SelectLabel>
                    {companies.map((c, idx) => (
                      <SelectItem key={idx} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <FormInput
              label="Vacantes"
              type="number"
              name="position"
              placeholder="Cantidad de vacantes"
              defaultValue={job?.position.toString()}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  position: parseInt(e.target.value),
                })
              }
            />
            <div className="flex justify-end mt-2 items-end">
              <Button
                type="submit"
                className="p-2 bg-yellow-400 hover:bg-yellow-400/75"
              >
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateJob;
