import Image from "next/image";
import Link from "next/link";

// Each cell is one photo linking to its parent project. `pos` tunes object-
// position so faces / subjects stay in frame when the slot crops aggressively.
type Cell = { src: string; slug: string; alt: string; pos?: string };

const project = (slug: string) => `/Project/${slug}`;

const landscapes: {
  hero: Cell;
  duo: [Cell, Cell];
  wide: Cell;
  trio: [Cell, Cell, Cell];
  closer: Cell;
} = {
  hero: {
    src: "/portfolio/yosemite-valley/01-dscf1941.jpg",
    slug: "yosemite-valley",
    alt: "Yosemite valley at dusk",
  },
  duo: [
    {
      src: "/portfolio/coastal-california/03-dscf1789.jpg",
      slug: "coastal-california",
      alt: "California coastline",
    },
    {
      src: "/portfolio/iceland-aurora/07-dsf5295-enhanced-nr-2.jpg",
      slug: "iceland-aurora",
      alt: "Icelandic highland road",
    },
  ],
  wide: {
    src: "/portfolio/garden-city-light/01-dscf1634.jpg",
    slug: "garden-city-light",
    alt: "Valley river at golden hour",
  },
  trio: [
    {
      src: "/portfolio/iceland-aurora/06-dsf5321.jpg",
      slug: "iceland-aurora",
      alt: "Iceland waterfall",
    },
    {
      src: "/portfolio/yosemite-valley/04-dscf2013.jpg",
      slug: "yosemite-valley",
      alt: "Granite peak in mist",
      pos: "50% 40%",
    },
    {
      src: "/portfolio/coastal-california/01-dsf6300.jpg",
      slug: "coastal-california",
      alt: "Sea stack on the shore",
    },
  ],
  closer: {
    src: "/portfolio/iceland-aurora/01-dsf5513.jpg",
    slug: "iceland-aurora",
    alt: "Lone tree at sunset",
  },
};

const portraits: Cell[] = [
  {
    src: "/portfolio/riverside-golden-hour/02-dsf9904.jpg",
    slug: "riverside-golden-hour",
    alt: "Riverside golden-hour portrait",
    pos: "50% 25%",
  },
  {
    src: "/portfolio/garden-maternity/02-dsf7958.jpg",
    slug: "garden-maternity",
    alt: "Garden maternity portrait",
    pos: "50% 25%",
  },
  {
    src: "/portfolio/orchard-portraits/01-dsf6181.jpg",
    slug: "orchard-portraits",
    alt: "Orchard blossom portrait",
    pos: "50% 18%",
  },
  {
    src: "/portfolio/floral-editorials/01-img-00162.jpg",
    slug: "floral-editorials",
    alt: "Floral editorial portrait",
    pos: "50% 22%",
  },
  {
    src: "/portfolio/character-studies/01-dsf3480.jpg",
    slug: "character-studies",
    alt: "Styled character study",
    pos: "50% 18%",
  },
];

const graduation: { hero: Cell; row: Cell[] } = {
  hero: {
    src: "/portfolio/white-gold-graduation/01-dsf0857.jpg",
    slug: "white-gold-graduation",
    alt: "Graduate on a tree-lined avenue",
    pos: "50% 34%",
  },
  row: [
    {
      src: "/portfolio/white-gold-graduation/02-dsf0944.jpg",
      slug: "white-gold-graduation",
      alt: "White and gold graduation portrait",
      pos: "50% 22%",
    },
    {
      src: "/portfolio/red-vet-graduation/01-dsf4547.jpg",
      slug: "red-vet-graduation",
      alt: "Red regalia graduation portrait",
      pos: "50% 40%",
    },
    {
      src: "/portfolio/purple-campus-graduation/01-dsf3567.jpg",
      slug: "purple-campus-graduation",
      alt: "Purple campus graduation portrait",
      pos: "50% 14%",
    },
    {
      src: "/portfolio/white-gold-graduation/05-dsf0729-5.jpg",
      slug: "white-gold-graduation",
      alt: "Graduation detail portrait",
      pos: "50% 26%",
    },
    {
      src: "/portfolio/red-vet-graduation/03-dsf4599.jpg",
      slug: "red-vet-graduation",
      alt: "Seated graduation portrait",
      pos: "50% 30%",
    },
  ],
};

function Photo({ cell }: { cell: Cell }) {
  return (
    <Link className="eg-cell" href={project(cell.slug)} aria-label={cell.alt}>
      <Image
        src={cell.src}
        alt={cell.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        style={cell.pos ? { objectPosition: cell.pos } : undefined}
      />
    </Link>
  );
}

function SectionHead({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="eg-head">
      <span className="eyebrow eg-num">{num}</span>
      <h2 className="eg-title">{title}</h2>
      <p className="eg-sub">{subtitle}</p>
    </header>
  );
}

export function EditorialGallery() {
  return (
    <div className="editorial-gallery">
      <section className="eg-section" aria-label="Landscapes">
        <SectionHead num="01" title="Landscapes" subtitle="Vast places. Quiet moments." />
        <div className="eg-stack">
          <div className="eg-row-hero">
            <Photo cell={landscapes.hero} />
          </div>
          <div className="eg-row-duo">
            <Photo cell={landscapes.duo[0]} />
            <Photo cell={landscapes.duo[1]} />
          </div>
          <div className="eg-row-wide">
            <Photo cell={landscapes.wide} />
          </div>
          <div className="eg-row-trio">
            {landscapes.trio.map((cell) => (
              <Photo cell={cell} key={cell.src} />
            ))}
          </div>
          <div className="eg-row-wide">
            <Photo cell={landscapes.closer} />
          </div>
        </div>
      </section>

      <section className="eg-section" aria-label="Portraits">
        <SectionHead num="02" title="Portraits" subtitle="People. Presence. Honest moments." />
        <div className="eg-stack">
          <div className="eg-row-five">
            {portraits.map((cell) => (
              <Photo cell={cell} key={cell.src} />
            ))}
          </div>
        </div>
      </section>

      <section className="eg-section" aria-label="Graduation">
        <SectionHead num="03" title="Graduation" subtitle="Milestones. Memories. New beginnings." />
        <div className="eg-stack">
          <div className="eg-row-hero">
            <Photo cell={graduation.hero} />
          </div>
          <div className="eg-row-five">
            {graduation.row.map((cell) => (
              <Photo cell={cell} key={cell.src} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
