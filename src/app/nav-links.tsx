import Link from "next/link";

const links = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const gallerySections = [
  { href: "/#landscape", label: "Landscape" },
  { href: "/#portrait", label: "Portrait" },
  { href: "/#graduation", label: "Graduation Pics" },
];

export function NavLinks() {
  return (
    <nav className="nav-links">
      {links.map((link) => {
        if (link.label === "Gallery") {
          return (
            <div className="nav-item has-menu" key={link.href}>
              <Link href={link.href}>{link.label}</Link>
              <div className="gallery-menu">
                {gallerySections.map((section) => (
                  <Link href={section.href} key={section.href}>
                    {section.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
