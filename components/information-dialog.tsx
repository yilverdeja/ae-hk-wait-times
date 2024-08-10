import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

const information = [
  {
    title: "Priority of Care",
    description:
      "Patients in critical conditions are seen first. Priority is given based on the severity of the condition, ensuring those in urgent need receive immediate care.",
  },
  {
    title: "About Waiting Times",
    description:
      "The waiting times shown are historical data from the last few hours and are for reference only. They may not accurately reflect the current wait times due to the dynamic nature of emergency departments.",
  },
  {
    title: "Sudden Emergencies",
    description:
      "Emergency departments prioritize sudden cases like severe accidents or illnesses. This can affect waiting times. We appreciate your patience as these situations can delay consultations.",
  },
];

export default function InformationDialog() {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer" asChild>
        <div className="flex gap-2 justify-center items-center sm:justify-start">
          <InfoIcon className="order-1 " size={20} />
          <span className="order-2 text-sm underline underline-offset-2 ">
            Understanding the Wait
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Understanding the Wait</DialogTitle>
          <DialogDescription>
            The data shows an estimated reference of the latest waiting times at
            different emergency departments in Hong Kong
          </DialogDescription>
        </DialogHeader>

        <Accordion className="grid gap-4 grid-cols-1" type="single" collapsible>
          {information.map((info, index) => {
            return (
              <AccordionItem key={info.title} value={"item-" + index}>
                <AccordionTrigger className="text-left">
                  {info.title}
                </AccordionTrigger>
                <AccordionContent>{info.description}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <DialogFooter>
          <DialogDescription>
            For patients with minor conditions, considering alternative
            healthcare options is advisable. Private clinics can be a quicker
            alternative. Useful resources include the{" "}
            <Link
              className="underline underline-offset-2"
              href="https://apps.pcdirectory.gov.hk/public/en"
              target="_blank"
            >
              Primary Care Directory
            </Link>{" "}
            or the{" "}
            <Link
              className="underline underline-offset-2"
              href="https://www.thkma.org/our_works/hong_kong_doctors/"
              target="_blank"
            >
              Hong Kong Doctors Homepage
            </Link>
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
