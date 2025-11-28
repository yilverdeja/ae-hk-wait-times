"use client"
import Clarity from "@microsoft/clarity"
import { useEffect } from "react"

const projectId = "u4dn615if9"

export function MicrosoftClarity() {
    useEffect(() => {
        Clarity.init(projectId)
    }, [])
    return null
}
