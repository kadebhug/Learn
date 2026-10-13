import { sampleTopics } from "@/lib/catalog";
import { TopicScreen } from "@/components/path/TopicScreen";

export function generateStaticParams() {
  return sampleTopics.map((topic) => ({ slug: topic.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TopicScreen slug={slug} />;
}
