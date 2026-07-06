export type Project = {
  slug: string;
  href?: string;
  title: string;
  location: string;
  date: string;
  camera: string;
  lens: string;
  summary: string;
  note: string;
  cover: string;
  /* object-position for the cover inside the landscape gallery card; portrait
     covers only show ~40% of their height, so this keeps the subject in frame */
  coverPosition?: string;
  gallery: string[];
};

const portfolio = (slug: string, files: string[]) =>
  files.map((file) => `/portfolio/${slug}/${file}`);

export const projects: Project[] = [
  {
    slug: "yosemite-valley",
    title: "Yosemite Valley Light",
    location: "Yosemite, California",
    date: "Travel Series",
    camera: "Nikon D850 DSLR",
    lens: "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR",
    summary:
      "A landscape sequence of granite walls, open meadows, and soft water spray in the valley.",
    note:
      "The edit keeps the broad scenic frames together, with the valley's scale and green summer light carrying the story.",
    cover: "/portfolio/yosemite-valley/01-dscf1941.jpg",
    gallery: portfolio("yosemite-valley", [
      "01-dscf1941.jpg",
      "02-dscf1986.jpg",
      "03-dscf1985.jpg",
      "04-dscf2013.jpg",
      "05-dscf1984.jpg",
    ]),
  },
  {
    slug: "coastal-california",
    title: "Coastal California",
    location: "California Coast",
    date: "Travel Series",
    camera: "Sony A7R IV Mirrorless",
    lens: "Sony FE 16-35mm f/2.8 GM",
    summary:
      "A small travel set moving from cliffs and rock faces to framed glimpses of the Golden Gate.",
    note:
      "These frames share a rugged, coastal palette and sit better as landscape work than portrait or event coverage.",
    cover: "/portfolio/coastal-california/01-dsf6300.jpg",
    gallery: portfolio("coastal-california", [
      "01-dsf6300.jpg",
      "02-34f84c77-d2e1-4d54-8d5d-4be955eb76c0-37791.jpg",
      "03-dscf1789.jpg",
      "04-dscf1934.jpg",
    ]),
  },
  {
    slug: "garden-city-light",
    title: "Garden and City Light",
    location: "Parks and City Walks",
    date: "Travel Series",
    camera: "Nikon D850 DSLR",
    lens: "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR",
    summary:
      "A gentler landscape group: flowers, river paths, city water, skyline, and late-day reflections.",
    note:
      "I kept the garden and city frames together because their soft greenery and urban details share the same quiet observational tone.",
    cover: "/portfolio/garden-city-light/01-dscf1634.jpg",
    gallery: portfolio("garden-city-light", [
      "01-dscf1634.jpg",
      "02-dscf1616.jpg",
      "03-dscf1601.jpg",
      "04-dscf1595.jpg",
      "05-dscf1491.jpg",
      "06-dscf0791.jpg",
      "07-dscf0382.jpg",
      "08-dscf0021.jpg",
      "09-dscf0016.jpg",
      "10-dscf0050.jpg",
    ]),
  },
  {
    slug: "iceland-aurora",
    title: "Iceland and Aurora",
    location: "Iceland",
    date: "Travel Series",
    camera: "Panasonic Lumix S1 Mirrorless",
    lens: "Lumix S Pro 24-70mm f/2.8",
    summary:
      "A cold-climate travel set of aurora, glacial water, waterfalls, and northern architecture.",
    note:
      "The night sky, ice, and water imagery belongs together as the strongest landscape/travel chapter in the set.",
    cover: "/portfolio/iceland-aurora/01-dsf5513.jpg",
    gallery: portfolio("iceland-aurora", [
      "01-dsf5513.jpg",
      "02-dsf5790.jpg",
      "03-dsf5692.jpg",
      "04-dsf5451-enhanced-nr-2.jpg",
      "05-dsf5430-enhanced-nr.jpg",
      "06-dsf5321.jpg",
      "07-dsf5295-enhanced-nr-2.jpg",
      "08-dsf5195.jpg",
      "09-dsf5191.jpg",
    ]),
  },
];

export const portraitProjects: Project[] = [
  {
    slug: "riverside-golden-hour",
    title: "Riverside Golden Hour",
    location: "Park Portrait Session",
    date: "Portrait Series",
    camera: "Fujifilm X-T4 Mirrorless",
    lens: "Fujinon XF 56mm f/1.2",
    summary: "A warm portrait set by the water with low sun and soft movement.",
    note:
      "These three images are the same subject and share a clear golden-hour look, so they stay together as one portrait story.",
    cover: "/portfolio/riverside-golden-hour/01-dsf9855.jpg",
    gallery: portfolio("riverside-golden-hour", [
      "01-dsf9855.jpg",
      "02-dsf9904.jpg",
      "03-dsf9875.jpg",
    ]),
  },
  {
    slug: "garden-maternity",
    title: "Garden Maternity",
    location: "Garden Session",
    date: "Portrait Series",
    camera: "Sony A7R IV Mirrorless",
    lens: "Sony FE 85mm f/1.4 GM",
    summary: "A soft maternity and couple session framed by doorways and flowers.",
    note:
      "The couple and detail images share the same setting and subject, so they read as one intimate portrait set.",
    cover: "/portfolio/garden-maternity/01-dsf8005.jpg",
    gallery: portfolio("garden-maternity", [
      "01-dsf8005.jpg",
      "02-dsf7958.jpg",
      "03-dsf7949.jpg",
      "04-dsf7857.jpg",
      "05-dsf7734.jpg",
      "06-dsf7613.jpg",
    ]),
  },
  {
    slug: "orchard-portraits",
    title: "Orchard Portraits",
    location: "Spring Garden",
    date: "Portrait Series",
    camera: "Fujifilm X-T4 Mirrorless",
    lens: "Fujinon XF 18-55mm f/2.8-4 R LM OIS",
    summary: "A romantic outdoor portrait set built around blossoms, trees, and garden paths.",
    note:
      "The orchard images share a soft pastel tone, so I kept them as a distinct portrait chapter.",
    cover: "/portfolio/orchard-portraits/01-dsf6181.jpg",
    coverPosition: "50% 15%",
    gallery: portfolio("orchard-portraits", [
      "01-dsf6181.jpg",
      "02-dsf6240.jpg",
      "03-dsf6186.jpg",
      "04-dsf6119.jpg",
      "05-dsf5956.jpg",
    ]),
  },
  {
    slug: "floral-editorials",
    title: "Floral Editorials",
    location: "Garden Editorials",
    date: "Portrait Series",
    camera: "Canon EOS 5D Mark IV DSLR",
    lens: "Canon EF 70-200mm f/2.8L IS III USM",
    summary: "A floral portrait collection with soft dresses, garden architecture, and bright field color.",
    note:
      "These are different portrait looks, but the styling and floral environments match closely enough to live together.",
    cover: "/portfolio/floral-editorials/01-img-00162.jpg",
    coverPosition: "50% 20%",
    gallery: portfolio("floral-editorials", [
      "01-img-00162.jpg",
      "02-img-00140.jpg",
      "03-img-00137.jpg",
      "04-70ed60c0-7849-4f56-abea-17269b664ad3-91927.jpg",
      "05-6266d45a-b483-488b-82f4-d0dfb88c495f-91927.jpg",
      "06-2dc3a932-3fd6-4499-8c4d-cb04416a4f59-91927.jpg",
      "07-daf06393-2e57-4ec9-a1bc-d4aa32ef0e14-91927.jpg",
      "08-dsf5043.jpg",
      "09-3ba665cd-4dfe-46cc-aa79-1d37c1ef5975-20686.jpg",
      "10-ded8a8ac-783e-423c-a928-2af46e6a4af8-20686.jpg",
    ]),
  },
  {
    slug: "character-studies",
    title: "Character Studies",
    location: "Styled Portrait Session",
    date: "Portrait Series",
    camera: "Sony A7R IV Mirrorless",
    lens: "Sony FE 16-35mm f/2.8 GM",
    summary: "A stylized portrait set with arcade color, costume, and cinematic framing.",
    note:
      "This group is more theatrical than the garden work, so it gets its own portrait lane.",
    cover: "/portfolio/character-studies/01-dsf3480.jpg",
    coverPosition: "50% 15%",
    gallery: portfolio("character-studies", [
      "01-dsf3480.jpg",
      "02-dsf3459.jpg",
      "03-228deda6-5947-47f4-9058-85c669cef7fe-2295-.jpg",
    ]),
  },
];

export const graduationProjects: Project[] = [
  {
    slug: "white-gold-graduation",
    title: "White and Gold Graduation",
    location: "Campus Session",
    date: "Graduation Series",
    camera: "Fujifilm X-T4 Mirrorless",
    lens: "Fujinon XF 18-55mm f/2.8-4 R LM OIS",
    summary: "A cohesive graduation session with white dress, gold stole, flowers, and diploma details.",
    note:
      "This is clearly the same graduate and the styling matches across portraits, details, and seated frames.",
    cover: "/portfolio/white-gold-graduation/01-dsf0857.jpg",
    coverPosition: "50% 30%",
    gallery: portfolio("white-gold-graduation", [
      "01-dsf0857.jpg",
      "02-dsf0944.jpg",
      "03-dsf0929.jpg",
      "04-dsf0894.jpg",
      "05-dsf0729-5.jpg",
      "06-dsf0715.jpg",
      "07-dsf0710.jpg",
      "08-dsf0704-2.jpg",
    ]),
  },
  {
    slug: "red-vet-graduation",
    title: "Red Veterinary Graduation",
    location: "Campus Session",
    date: "Graduation Series",
    camera: "Nikon D850 DSLR",
    lens: "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR",
    summary: "A red cap-and-gown graduate session with campus columns and sash details.",
    note:
      "These images are the same graduate in the same red regalia, so they work best as one focused gallery.",
    cover: "/portfolio/red-vet-graduation/01-dsf4547.jpg",
    coverPosition: "50% 55%",
    gallery: portfolio("red-vet-graduation", [
      "01-dsf4547.jpg",
      "02-dsf4641.jpg",
      "03-dsf4599.jpg",
      "04-dsf4576.jpg",
      "05-dsf4572.jpg",
      "06-dsf4546.jpg",
    ]),
  },
  {
    slug: "purple-campus-graduation",
    title: "Purple Campus Graduation",
    location: "Campus Portrait",
    date: "Graduation Series",
    camera: "Sony A7R IV Mirrorless",
    lens: "Sony FE 85mm f/1.4 GM",
    summary: "A single purple cap-and-gown portrait with a quiet campus setting.",
    note:
      "This one is separated from the white/gold and red sessions because the graduate and styling are different.",
    cover: "/portfolio/purple-campus-graduation/01-dsf3567.jpg",
    coverPosition: "50% 12%",
    gallery: portfolio("purple-campus-graduation", ["01-dsf3567.jpg"]),
  },
];

export const galleryCategories = {
  landscape: projects,
  portrait: portraitProjects,
  graduation: graduationProjects,
} satisfies Record<string, Project[]>;

export const allProjects = [
  ...projects,
  ...portraitProjects,
  ...graduationProjects,
];

export const gear = {
  cameras: [
    "Fujifilm X-T4 Mirrorless",
    "Sony A7R IV Mirrorless",
    "Nikon D850 DSLR",
    "Canon EOS 5D Mark IV DSLR",
    "Panasonic Lumix S1 Mirrorless",
  ],
  lenses: [
    "Fujinon XF 18-55mm f/2.8-4 R LM OIS",
    "Sony FE 16-35mm f/2.8 GM",
    "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR",
    "Canon EF 70-200mm f/2.8L IS III USM",
    "Lumix S Pro 24-70mm f/2.8",
  ],
};
