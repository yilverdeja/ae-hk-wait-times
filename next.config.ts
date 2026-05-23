import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    async redirects() {
        return [
            {
                source: "/alternatives",
                has: [{ type: "query", key: "category", value: "24hour" }],
                destination: "/alternatives/category/24hour",
                permanent: false,
            },
            {
                source: "/alternatives",
                has: [{ type: "query", key: "category", value: "non24hour" }],
                destination: "/alternatives/category/non24hour",
                permanent: false,
            },
            {
                source: "/alternatives",
                has: [{ type: "query", key: "category", value: "telehealth" }],
                destination: "/alternatives/category/telehealth",
                permanent: false,
            },
        ]
    },
}

export default nextConfig
