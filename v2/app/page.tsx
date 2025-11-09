"use client";
// import HospitalList from "@/components/HospitalList";
import HospitalWaitTimeView from "@/components/HospitalWaitTimeView";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      {/* <HospitalList /> */}
      <HospitalWaitTimeView />
    </div>
  );
}
