/** @jsxImportSource @emotion/react */
"use client";
import type { Metadata } from "next";
import { css } from "@emotion/react";

const metadata: Metadata = {
  title: "bpmn-js page",
  description: "bpmn-js",
};

const style = css`
  .djs-palette {
    display: none;
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main id="bpmn-js">
      <section className="__section" css={style}>{children}</section>
    </main>
  );
}
