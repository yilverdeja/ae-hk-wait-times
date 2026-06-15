import { getWaitTimes } from "@/app/actions/waits"
import HomeClient from "@/components/Home/HomeClient"
import HomeIntro from "@/components/Home/HomeIntro"

export default async function Home() {
    let lastUpdated: string | null = null

    try {
        const data = await getWaitTimes()
        lastUpdated = data.lastUpdated
    } catch {
        // Intro renders without timestamp if API unavailable
    }

    return (
        <div className="container mx-auto xl:max-w-none my-4">
            <HomeIntro lastUpdated={lastUpdated} />
            <HomeClient />
        </div>
    )
}
