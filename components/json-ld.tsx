export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://hackthic.iihn.fun/#website",
        "url": "https://hackthic.iihn.fun",
        "name": "Hackthic",
        "description": "Security Toolkits for Bug Hunters",
        "publisher": {
          "@id": "https://hackthic.iihn.fun/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://hackthic.iihn.fun/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://hackthic.iihn.fun/#organization",
        "name": "Hackthic",
        "url": "https://hackthic.iihn.fun",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hackthic.iihn.fun/favicon.ico",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/hackthic",
          "https://github.com/hackthic"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
