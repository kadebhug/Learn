import { flatLessons, sampleTopics } from "@/lib/catalog";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export function generateStaticParams() {
  return sampleTopics.flatMap((topic) =>
    flatLessons(topic).map(({ lesson }) => ({ slug: topic.slug, lessonId: lesson.id })),
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params;
  return <LessonScreen slug={slug} lessonId={lessonId} />;
}
