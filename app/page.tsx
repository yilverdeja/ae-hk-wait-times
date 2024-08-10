import HospitalsViews from "@/components/hospitals-view";
import InformationDialog from "@/components/information-dialog";

export default function Home() {
  return (
    <>
      <header className="w-full flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-center">
        <div className="my-2">
          <h1 className="text-lg text-center font-bold mb-2 md:text-xl sm:text-left">
            Current A&E Waiting Times
          </h1>
          <InformationDialog />
        </div>
      </header>
      <HospitalsViews />
    </>
  );
}
