/**
 * Renders a JSON-LD structured-data script. Server-rendered so crawlers see it
 * in the initial HTML. Accepts one schema object or an array of them.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data]
  return (
    <>
      {json.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is trusted, app-authored content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
