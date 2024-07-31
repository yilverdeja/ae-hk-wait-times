"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <Separator className="my-4" />
      <ul className="flex justify-center gap-4 underline underline-offset-2 text-sm md:justify-end">
        <li>
          <Link
            href="https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=235504&Lang=ENG"
            target="_blank"
          >
            Original Site
          </Link>
        </li>
        <li>
          <Link
            href="https://data.gov.hk/en-data/dataset/hospital-hadata-ae-waiting-time"
            target="_blank"
          >
            Open Data
          </Link>
        </li>
      </ul>
    </footer>
  );
}
