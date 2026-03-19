"use client";
import { Job } from "@/types/jobs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { LoggedUser } from "@/types/user";
import Image from "next/image";

const JobDetails = ({ job, jobId }: { job: Job; jobId: string }) => {
  const [user] = useLocalStorage<LoggedUser | null>({
    key: "userData",
    defaultValue: null,
  });

  const isApplied =
    job?.applications.some((app) => app.applicantId === user?.id) ?? false;

  return (
    <div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-white">
        <div>
          <h1 className="font-bold text-yellow-400 text-xl">{job.title}</h1>
          <div className="flex items-center gap-2 my-2">
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              {job.position} vacantes
            </Badge>
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              {job.jobType}
            </Badge>
            <Badge className="text-purple-800 font-bold" variant={"ghost"}>
              ${job.salary}
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg py-4 ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"}`}
        >
          {isApplied ? "Ya postulaste" : "Postular ahora"}
        </Button>
      </div>
      <h2 className="my-4 border-b-2 pb-1 text-yellow-400 border-b-gray-300 font-semibold pl-2">
        Descripción del empleo
      </h2>
      <div className="mb-10 bg-white text-black flex items-center p-3 rounded-lg justify-around m-auto hover:bg-white/95 duration-500">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Rol: <span>{job.title}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Ubicación: <span>{job.location}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Descripción: <span>{job.description}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Experiencia: <span>{job.experienceLevel}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Sueldo: <span>{job.salary}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Postulaciones: <span>{job.applications.length}</span>
          </h3>
          <h3 className="font-bold my-1 grid grid-cols-2 gap-20">
            Publicado: <span>{job.createdAt.toString().split("T")?.[0]}</span>
          </h3>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Image src={"/developer.png"} alt="" width={150} height={150} />
          <Button className="rounded-lg bg-yellow-400 hover:bg-yellow-400/95 ">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
