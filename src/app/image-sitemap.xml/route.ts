export const revalidate = 86400; // cache 1 day

export async function GET() {
  const baseUrl = "https://rohanthapa.com.np";

  const pageUrl = `${baseUrl}/`;
  const imageUrl = "https://cdn.rohanthapa.com.np/portfolio-og.jpg";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>Rohan Thapa</image:title>
      <image:caption>Rohan Thapa, software engineer based in Kathmandu, Nepal</image:caption>
    </image:image>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
