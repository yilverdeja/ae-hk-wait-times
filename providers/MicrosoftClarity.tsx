"use client"
import { useEffect } from "react"
import Clarity from "@microsoft/clarity"

const projectId = "u4dn615if9"

export function MicrosoftClarity() {
    useEffect(() => {
        Clarity.init(projectId)
    }, [])
    return null
}
