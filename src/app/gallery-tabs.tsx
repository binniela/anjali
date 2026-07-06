import { galleryCategories } from "./data";
import { GalleryCard } from "./gallery-card";

export function GalleryTabs({
  category = "landscape",
}: {
  category?: keyof typeof galleryCategories;
}) {
  const projects = galleryCategories[category];

  return (
    <section className="gallery-shell" id={category} aria-label={`${category} gallery`}>
      <div className="gallery-list">
        {projects.map((project) => (
          <GalleryCard
            categoryId={`${category}-${project.slug}`}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
