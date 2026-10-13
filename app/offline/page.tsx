import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="mx-auto grid max-w-xl gap-3 px-5 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">You are offline</h1>
      <p className="leading-relaxed text-muted">
        Lessons you already opened still work. Building a new AI path needs a connection.
      </p>
      <Link href="/paths" className="font-semibold text-grove">
        Try your paths
      </Link>
    </div>
  );
}
