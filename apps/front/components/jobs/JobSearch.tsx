"use client";
import { Job } from "@/types/jobs";
import { Button } from "../ui/button";
import { BookMarked } from "lucide-react";
import { daysAgo } from "@/lib/calculateTime";
import { addToFavorites } from "@/actions/jobs";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

const JobSearch = ({ job }: { job: Job }) => {
  const router = useRouter();
  const handleFavorites = async () => {
    const res = await addToFavorites(job.id);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
  };
  return (
    <div className="p-5 rounded-md shadow-xl text-purple-800 duration-500 bg-white hover:bg-white/95 border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {daysAgo(job.createdAt) === 0
            ? "Hoy"
            : `${daysAgo(job.createdAt)} días`}
        </p>
        <Button
          onClick={handleFavorites}
          variant={"secondary"}
          size={"icon-lg"}
          className="rounded-full bg-yellow-400 hover:bg-yellow-400/75"
        >
          <BookMarked className="text-white" />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button size={"icon-lg"} variant={"outline"} className="p-6">
          <Avatar>
            <AvatarImage src={job?.company?.logo || "/no-image.png"} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm">Chile</p>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">{job?.title}</h1>
        <p className="text-sm">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge className="font-bold border border-white" variant={"ghost"}>
          {job.position} vacantes
        </Badge>
        <Badge className="font-bold border border-white" variant={"ghost"}>
          {job.jobType}
        </Badge>
        <Badge className="font-bold border border-white" variant={"ghost"}>
          ${job.salary}
        </Badge>
      </div>
      <div className="space-x-4 mt-4">
        <Button
          onClick={() => router.push(`/job/${job.id}`)}
          variant={"secondary"}
          className="rounded-lg border border-black"
        >
          Detalles
        </Button>
        <Button
          onClick={handleFavorites}
          className="rounded-lg bg-yellow-400 hover:bg-yellow-400/75 text-white"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default JobSearch;
