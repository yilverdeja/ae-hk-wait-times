"use-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Information() {
  return (
    <>
      <h2 className="text-lg font-bold md:text-xl">Understanding the Wait</h2>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Priority of Care</AccordionTrigger>
          <AccordionContent>
            Patients in critical conditions are seen first. Priority is given
            based on the severity of the condition, ensuring those in urgent
            need receive immediate care.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>About Waiting Times</AccordionTrigger>
          <AccordionContent>
            The waiting times shown are historical data from the last few hours
            and are for reference only. They may not accurately reflect the
            current wait times due to the dynamic nature of emergency
            departments.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Sudden Emergencies</AccordionTrigger>
          <AccordionContent>
            Emergency departments prioritize sudden cases like severe accidents
            or illnesses. This can affect waiting times. We appreciate your
            patience as these situations can delay consultations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Alternatives for Non-Urgent Cases</AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
