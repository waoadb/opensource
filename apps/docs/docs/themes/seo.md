---
title: Search Engine Optimisation
description: 'How we approach SEO in Different Breed ® Open Source'
---

# Search Engine Optimisation

## Overview

Currently, we do not provide any SEO information for non-event pages. This is intentional, as ideally Different Breed® would be used alongside a CMS that could handle this information for us.

We use the popular [Next SEO](https://github.com/garmeeh/next-seo) package to implement SEO within our themes.

### Normal Pages

If a user wishes to use us as a standalone service, we should utilise the [profile details] to fill in the SEO for the page. For example:

```tsx
<NextSeo
  title={`${profile.title} | Venues`}
  description={`Discover the venues where ${profile.title} events take place.`}
  openGraph={{
    title: `${profile.title} | Venues`,
    description: `Discover the venues where ${profile.title} events take place.`,
    images: [
      {
        url: profile.image?.url || '',
        alt: profile.image?.alt_text || '',
      },
    ],
  }}
  canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/venues`}
/>
```

### Event Pages

The user can configure the SEO for each event to be displayed within Different Breed®. This information will be returned in the [retrieve event] response and can be used directly on the theme page.

For example:

```tsx
{
  event.marketing?.seo && (
    <NextSeo
      title={`${profile.title} | ${event.marketing.seo.title}`}
      description={event.marketing.seo.description}
      openGraph={{
        title: `${profile.title} | ${event.marketing.seo.o_title}`,
        description: event.marketing.seo.o_description,
        images: [
          {
            url: event.marketing.seo.picture?.url || '',
            alt: event.marketing.seo.picture?.alt_text || '',
          },
        ],
      }}
      canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.event_id}`}
    />
  );
}
```

In some instances, when the SEO event has not been configured, a default fallback may be necessary. This can be implemented using the following method:

```tsx
{
  !event.marketing?.seo && (
    <NextSeo
      title={`${profile.title} | ${event.details.name}`}
      description={event.details.description}
      openGraph={{
        title: `${profile.title} | ${event.details.name}`,
        description: event.details.description,
        images: [
          {
            url: event.details.picture?.url || '',
            alt: event.details.picture?.alt_text || '',
          },
        ],
      }}
      canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.event_id}`}
    />
  );
}
```

## Site Map

Sitemaps can be generated using the `minimal` endpoints within our [API] for [Events] and [Venues].

An example of a Next.js implementation can be found in our [default theme].
