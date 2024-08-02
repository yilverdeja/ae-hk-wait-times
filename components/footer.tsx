"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/configs/site";

export default function Footer() {
  return (
    <footer>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between md:mx-8">
        <span className="text-sm">
          © {new Date().getFullYear()}{" "}
          <a href={siteConfig.url} className="hover:underline">
            A&E Wait Times
          </a>
        </span>
        <ul className="flex flex-row gap-4">
          <li className="text-sm underline underline-offset-2">
            <Link href={siteConfig.resourceLinks.originalEng} target="_blank">
              Original Site
            </Link>
          </li>
          <li className="text-sm underline underline-offset-2">
            <Link href={siteConfig.resourceLinks.openData} target="_blank">
              Open Data
            </Link>
          </li>
          <li className="text-sm underline underline-offset-2">
            <Link href={siteConfig.links.github} target="_blank">
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
