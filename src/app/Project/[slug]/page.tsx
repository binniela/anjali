import Image from "next/image";
import { notFound } from "next/navigation";
import { Shell, StatList } from "../../components";
import { allProjects } from "../../data";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

type ProjectParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectParams) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);

  return {
    title: project ? project.title : "Project",
  };
}

export default async function ProjectPage({ params }: ProjectParams) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Shell back>
      <article className="project-detail">
        <header className="project-header">
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
              alt={`${project.title} photograph ${index + 1}`}
              className={index === 0 ? "is-feature" : undefined}
              height={900}
              key={`${project.slug}-${index}`}
              sizes="(max-width: 980px) calc(100vw - 48px), 78vw"
              width={1440}
            />
          ))}
        </section>
      </article>
    </Shell>
  );
}
