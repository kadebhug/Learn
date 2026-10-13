"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopicScreen } from "@/components/path/TopicScreen";

export default function OpenPathPage() {
  return (
    <Suspense fallback={<p className="px-5 py-10 text-muted">Opening your grove...</p>}>
      <OpenPath />
    </Suspense>
  );
}

function OpenPath() {
  const slug = useSearchParams().get("slug") ?? "";
  return <TopicScreen slug={slug} />;
}
