"use client";
import type { Metadata } from "next";
import { css } from "@emotion/react";

const metadata: Metadata = {
  title: "bpmn-js page",
  description: "bpmn-js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main id="bpmn-js">
      <section className="__section">{children}</section>
    </main>
  );
}
