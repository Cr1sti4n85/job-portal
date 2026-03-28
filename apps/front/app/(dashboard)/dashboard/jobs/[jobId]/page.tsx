import { getApplicants } from "@/actions/applications";
import ApplicantsTable from "@/components/jobApplications/ApplicantsTable";
import { toast } from "sonner";

type Props = {
  params: Promise<{ jobId: string }>;
};
const ApplicantsJobPage = async ({ params }: Props) => {
  const { jobId } = await params;

  const res = await getApplicants(jobId);
  if (!res.success) {
    toast.error(res.error);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-semibold text-xl text-white">Postulantes</h1>
      <ApplicantsTable applications={res.job?.applications} />
    </div>
  );
};

export default ApplicantsJobPage;
