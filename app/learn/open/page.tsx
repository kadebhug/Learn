"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export default function OpenLessonPage() {
  return (
    <Suspense fallback={<p className="px-5 py-10 text-muted">Opening your grove...</p>}>
      <OpenLesson />
    </Suspense>
  );
}

function OpenLesson() {
  const params = useSearchParams();
  return <LessonScreen slug={params.get("slug") ?? ""} lessonId={params.get("lesson") ?? ""} />;
}
