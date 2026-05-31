export function JsonLd({ data }: { data: Record<string, unknown> | unknown[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema.org JSON is trusted developer-authored data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
