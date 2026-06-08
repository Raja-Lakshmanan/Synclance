import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const title = "Luminotrix | Creative Tech Studio & Design Solutions";
  const description = "Luminotrix is a creative-tech studio offering engineering project development and modern design services. We deliver responsive websites, UI/UX design, IoT solutions, home automation, logo/poster design, and video editing.";
  const url = "https://luminotrix.vercel.app";
  const imageUrl = "https://luminotrix.vercel.app/src/components/navcomp/l1.png"; // Fallback to logo image

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Luminotrix",
    "url": url,
    "logo": imageUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-76390-77992",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "ta"]
    },
    "sameAs": [
      "https://wa.me/917639077992"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Luminotrix",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Luminotrix",
    "image": imageUrl,
    "@id": `${url}/#organization`,
    "url": url,
    "telephone": "+917639077992",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
