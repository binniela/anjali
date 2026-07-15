import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactFooter, StatList } from "../../components";
import { PortfolioNav } from "../../IntroSequence";
import { allProjects } from "../../data";
import {
  absoluteUrl,
  photographerName,
  sharedOpenGraph,
  siteUrl,
} from "../../metadata";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

type ProjectParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectParams): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  const projectUrl = `${siteUrl}/Project/${project.slug}`;
  const description = `${project.summary} ${project.location}.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: sharedOpenGraph({
      type: "article",
      title: `${project.title} - ${photographerName}`,
      description,
      url: projectUrl,
      images: [
        {
          url: absoluteUrl(project.cover),
          width: 1200,
          height: 900,
          alt: `${project.title} by ${photographerName}`,
        },
      ],
    }),
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - ${photographerName}`,
      description,
      images: [absoluteUrl(project.cover)],
    },
  };
}

export default async function ProjectPage({ params }: ProjectParams) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${project.title} - ${photographerName}`,
    url: `${siteUrl}/Project/${project.slug}`,
    description: project.summary,
    creator: {
      "@type": "Person",
      name: photographerName,
      url: siteUrl,
    },
    contentLocation: project.location,
    about: project.date,
    image: project.gallery.map((src, index) => ({
      "@type": "ImageObject",
      url: absoluteUrl(src),
      name: `${project.title} photograph ${index + 1}`,
      caption: `${project.title}, ${project.location}`,
      creator: {
        "@type": "Person",
        name: photographerName,
      },
    })),
  };

  return (
    <>
      <PortfolioNav staticBar />
      <main className="content">
        <article className="project-detail">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <header className="project-header">
            <Link className="project-back" href="/#gallery">
              <span aria-hidden="true">&larr;</span> Gallery
            </Link>
            <h1>{project.title}</h1>
            <div className="project-intro">
              <p>{project.summary}</p>
              <p>{project.note}</p>
            </div>
            <StatList project={project} />
          </header>

          <section className="project-stack" aria-label={`${project.title} images`}>
            {project.gallery.map((src, index) => (
              <Image
                src={src}
                alt={`${project.title} photograph ${index + 1}, ${project.location}`}
                className={index === 0 ? "is-feature" : undefined}
                height={900}
                key={`${project.slug}-${index}`}
                priority={index === 0}
                sizes="(max-width: 980px) calc(100vw - 36px), 92vw"
                width={1440}
              />
            ))}
          </section>
        </article>
      </main>
      <ContactFooter variant="project" />
    </>
  );
}
