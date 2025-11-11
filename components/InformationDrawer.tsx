"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { sendGAEvent } from "@next/third-parties/google"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { informationContent } from "@/components/InformationContent"
import { InfoIcon, X } from "lucide-react"
import Link from "next/link"

export default function InformationDrawer() {
    const { lang } = useLanguage()

    return (
        <Drawer>
            <DrawerTrigger
                asChild
                onClick={() =>
                    sendGAEvent("event", "information_drawer_opened")
                }
            >
                <div className="flex cursor-pointer items-center justify-center gap-2 sm:justify-start">
                    <InfoIcon className="order-1 " size={20} />
                    <span className="order-2 text-sm underline underline-offset-2">
                        {informationContent.triggerText[lang]}
                    </span>
                </div>
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-h-screen max-w-full sm:max-w-3xl">
                <DrawerClose
                    asChild
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none sm:hidden"
                    onClick={() =>
                        sendGAEvent("event", "information_drawer_closed")
                    }
                >
                    <button>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </DrawerClose>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl">
                        {informationContent.title[lang]}
                    </DrawerTitle>
                    <DrawerDescription>
                        {informationContent.description[lang]}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="overflow-y-auto px-4">
                    <Accordion
                        className="grid grid-cols-1 gap-2"
                        type="single"
                        collapsible
                        onValueChange={(value) => {
                            if (value) {
                                sendGAEvent(
                                    "event",
                                    "information_accordion_expanded",
                                    {
                                        accordionItemId: value,
                                    }
                                )
                            }
                        }}
                    >
                        {informationContent.accordionItems.map((item) => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger className="text-left text-base">
                                    {item.title[lang]}
                                </AccordionTrigger>
                                {/* The content is now rendered directly as it's JSX */}
                                <AccordionContent className="text-base">
                                    {item.content[lang]}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <DrawerFooter className="pt-8 text-left">
                    <div className="text-sm text-muted-foreground">
                        {informationContent.footer.text[lang]}{" "}
                        <Link
                            className="underline underline-offset-2"
                            href="https://www.ha.org.hk/visitor/ha_serviceguide_details.asp?Content_ID=10051"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                sendGAEvent("event", "external_link_clicked", {
                                    linkType: "ha_service_guide",
                                })
                            }
                        >
                            {informationContent.footer.haServiceGuide[lang]}
                        </Link>
                        .
                    </div>
                    <DrawerClose
                        asChild
                        className="hidden sm:block"
                        onClick={() =>
                            sendGAEvent("event", "information_drawer_closed")
                        }
                    >
                        <Button variant="outline">
                            {informationContent.footer.closeButton[lang]}
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
