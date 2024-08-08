import HospitalsViews from "@/components/hospitals-view";
import InformationDialog from "@/components/information-dialog";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-between items-start">
        <div>
          <h1>Current Wait Times</h1>
          <p>Select a hospital to view detailed information</p>
        </div>
        <InformationDialog />
      </div>
      <HospitalsViews />
    </>
  );
}
