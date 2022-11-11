import { ReactNode } from "react";
import Button from "../Button/Button";
import { NextSeo } from "next-seo";

export type ErrorProps = {
  error: number;
  background?: string;
  title: string;
  description: string;
  defaultActionLabel?: string;
  defaultActionHref?: string;
  action?: ReactNode;
};

export default function ErrorPage({
  error,
  background = "https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75",
  title,
  description,
  defaultActionLabel = "Go back home",
  defaultActionHref = "/",
  action = (
    <Button
      variant="text"
      href={defaultActionHref}
      className="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
    >
      {defaultActionLabel}
    </Button>
  ),
}: ErrorProps) {
  return (
    <main
      className="min-h-full bg-slate-400 bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      <NextSeo title={error.toString()} />
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-base font-semibold text-black text-opacity-50">
          {error}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-lg font-medium text-black text-opacity-50">
          {description}
        </p>
        <div className="mt-6">{action}</div>
      </div>
    </main>
  );
}
