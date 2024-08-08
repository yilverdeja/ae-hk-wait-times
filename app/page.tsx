import HospitalsViews from "@/components/hospitals-view";
import InformationDialog from "@/components/information-dialog";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-between items-start">
        <div className="my-2">
          <h1 className="text-2xl font-bold my-2">Current A&E Waiting Times</h1>
          <p className="text-md">
            Select a hospital to view detailed information
          </p>
        </div>
        <InformationDialog />
      </div>
      <HospitalsViews />
    </>
  );
}
