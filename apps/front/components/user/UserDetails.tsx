"use client";
import { Contact, Mail, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoggedUser } from "@/types/user";

const UserDetails = ({ user }: { user: LoggedUser | null }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-medium text-xl">{user?.fullName}</h1>
            <p>{user?.profileBio || "Añade tu perfil profesional"}</p>
          </div>

          <Image
            src={user?.profilePhoto || "/no-image.png"}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      </section>
      <section className="my-5 grid gap-5">
        <div className="flex items-center gap-3 my-2">
          <Mail size={24} />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact size={24} />
          <span>{user?.phoneNumber}</span>
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div>
          <h2 className="my-2 font-bold">Habilidades</h2>
          <div className="space-x-2">
            {user?.profileSkills?.length &&
              user?.profileSkills?.map((skill, idx) => (
                <Badge
                  className="bg-yellow-400 hover:bg-yellow-400/70"
                  key={idx}
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
        <div
          onClick={() => setOpen(true)}
          className="border border-black/25 hover:bg-yellow-400/50 rounded-xl cursor-pointer hover:text-white duration-300"
        >
          <Pencil className="p-2 text-gray-500 hover:text-white" size={48} />
        </div>
      </section>
      <UpdateProfile open={open} setOpen={setOpen} user={user} />
    </div>
  );
};

export default UserDetails;
