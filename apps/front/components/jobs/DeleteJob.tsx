"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { deleteJobRequest } from "@/lib/apiRequests";
import { Job } from "@/types/jobs";
import { toast } from "sonner";

type Props = PropsWithChildren<{
  job?: Job;
  setJobs: (jobs: Job[]) => void;
  jobs: Job[];
}>;

const DeleteJob = ({ children, job, setJobs, jobs }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const deleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!job?.id) {
      return;
    }
    try {
      const data = await deleteJobRequest(job?.id);
      if (data?.success) {
        toast.success(data.message);
        setJobs(jobs?.filter((c) => c.id !== job?.id));
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Ocurrió un error");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminar</DialogTitle>
          <DialogDescription className="my-10 text-center font-bold text-yellow-400 text-xl">
            ¿Desea eliminar este empleo?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteHandler}>
          <div className="flex justify-end mt-2">
            <Button type="submit" className="p-2 bg-red-700">
              Eliminar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJob;
