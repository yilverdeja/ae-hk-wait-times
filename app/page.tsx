"use client"
import HospitalWaitTimeView from "@/components/HospitalWaitTimeView"
import InformationDrawer from "@/components/InformationDrawer"
export default function Home() {
    return (
        <div className="container mx-auto xl:max-w-none">
            <div className="flex flex-col gap-4 min-h-screen font-sans my-4">
                <InformationDrawer />
                <HospitalWaitTimeView />
            </div>
        </div>
    )
}
