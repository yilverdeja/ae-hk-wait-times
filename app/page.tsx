import { getWaitTimes } from "@/app/actions/waits"
import HomeClient from "@/components/Home/HomeClient"
import HomeIntro from "@/components/Home/HomeIntro"
import { getServerLang } from "@/lib/get-server-lang"

export default async function Home() {
    const lang = await getServerLang()
    let lastUpdated: string | null = null

    try {
        const data = await getWaitTimes()
        lastUpdated = data.lastUpdated
    } catch {
        // Intro renders without timestamp if API unavailable
    }

    return (
        <div className="container mx-auto xl:max-w-none my-4">
            <HomeIntro lang={lang} lastUpdated={lastUpdated} />
            <HomeClient />
        </div>
    )
}
