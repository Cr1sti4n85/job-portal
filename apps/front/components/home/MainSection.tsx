"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();
  const handleSearch = async (formData: FormData) => {
    const name = formData.get("name") as string;
    router.push(`/job?keyword=${name}`);
    console.log(name);
  };
  return (
    <main className="text-center text-white">
      <div className="flex flex-col gap-5 my-10">
        <div className="text-center mx-auto">
          <div
            className="text-yellow-400 px-4 py-2 rounded-full bg-black/50
            font-semibold"
          >
            El sitio perfecto para encontrar empleo
          </div>
        </div>
        <h1 className="text-5xl font-bold">
          <span className="text-yellow-400">Descubre</span>, postula y <br />
          <span className="text-yello-400">consigue tu mejor empleo</span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus{" "}
          <br />
          voluptatem ipsam voluptas, quisquam provident mollitia tempora.
        </p>
        <form action={handleSearch}>
          <div className="flex w-2/5 shadow-lg border pl-4 bg-white rounded-full items-center mx-auto gap-4 text-slate-600">
            <input
              className="outline-none border-none bg-white w-full rounded-full text-black py-2"
              type="text"
              name="name"
              placeholder="Encuentra tu empleo"
            />
            <Button type="submit" className="rounded-r-full bg-white">
              <Search className="h-5 w-5 bg-transparent text-slate-600" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MainSection;
