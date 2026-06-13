"use client"

import HospitalWaitTimeView from "@/components/HospitalWaitTimeView"

export default function HomeClient() {
    return (
        <div className="flex flex-col gap-4 min-h-screen font-sans">
            <HospitalWaitTimeView />
        </div>
    )
}
