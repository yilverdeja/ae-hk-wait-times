"use client"

import HospitalWaitTimeView from "@/components/HospitalWaitTimeView"
// import InformationDrawer from "@/components/InformationDrawer"

export default function HomeClient() {
    return (
        <div className="flex flex-col gap-4 min-h-screen font-sans">
            {/* <InformationDrawer /> */}
            <HospitalWaitTimeView />
        </div>
    )
}
