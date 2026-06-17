import { useEffect, useMemo, useState } from 'react';
import { legalPages, routes, site, supportSections, type LegalPage } from './content/siteContent';

type PageKey =
  | 'home'
  | 'pasajeros'
  | 'conductores'
  | 'zonas-servicio'
  | 'soporte'
  | 'legales'
  | 'aviso-privacidad'
  | 'terminos-condiciones'
  | 'cancelaciones-reembolsos'
  | 'eliminacion-cuenta'
  | 'not-found';

type MetaConfig = {
  title: string;
  description: string;
  path: string;
};

const pageMeta: Record<PageKey, MetaConfig> = {
  home: {
    title: '7Lleva | Sí te lleva',
    description:
      '7Lleva prepara una plataforma regional para viajes locales, viajes entre poblaciones, viajes foráneos, paquetería y mandados.',
    path: '/'
  },
  pasajeros: {
    title: 'Pasajeros | 7Lleva',
    description:
      'Solicita viajes locales, regionales o foráneos desde una sola plataforma en preparación para la región.',
    path: '/pasajeros'
  },
  conductores: {
    title: 'Conductores | 7Lleva',
    description:
      '7Lleva prepara una etapa inicial para conductores locales, autos, unidades amplias, transporte grupal y mototaxis donde aplique.',
    path: '/conductores'
  },
  'zonas-servicio': {
    title: 'Zonas de servicio | 7Lleva',
    description: 'Zonas iniciales consideradas para la etapa de lanzamiento de 7Lleva.',
    path: '/zonas-servicio'
  },
  soporte: {
    title: 'Soporte y contacto | 7Lleva',
    description: 'Canales públicos previstos de soporte, contacto y asuntos legales de 7Lleva.',
    path: '/soporte'
  },
  legales: {
    title: 'Legales | 7Lleva',
    description: 'Documentos legales públicos base de 7Lleva para revisión previa a publicación.',
    path: '/legales'
  },
  'aviso-privacidad': {
    title: 'Aviso de privacidad | 7Lleva',
    description: legalPages[0].description,
    path: '/aviso-privacidad'
  },
  'terminos-condiciones': {
    title: 'Términos y condiciones | 7Lleva',
    description: legalPages[1].description,
    path: '/terminos-condiciones'
  },
  'cancelaciones-reembolsos': {
    title: 'Cancelaciones y reembolsos | 7Lleva',
    description: legalPages[2].description,
    path: '/cancelaciones-reembolsos'
  },
  'eliminacion-cuenta': {
    title: 'Eliminación de cuenta | 7Lleva',
    description: legalPages[3].description,
    path: '/eliminacion-cuenta'
  },
  'not-found': {
    title: 'Página no encontrada | 7Lleva',
    description: 'La página solicitada no está disponible.',
    path: '/'
  }
};

function normalizePath(pathname: string) {
  const cleanedPath = pathname.replace(/\/+$/, '');
  return cleanedPath || '/';
}

function routeFromPath(pathname: string): PageKey {
  const path = normalizePath(pathname);
  if (path === '/') return 'home';
  if (path === '/pasajeros') return 'pasajeros';
  if (path === '/conductores') return 'conductores';
  if (path === '/zonas' || path === '/zonas-servicio') return 'zonas-servicio';
  if (path === '/soporte') return 'soporte';
  if (path === '/legales') return 'legales';
  if (path === '/aviso-privacidad') return 'aviso-privacidad';
  if (path === '/terminos-condiciones') return 'terminos-condiciones';
  if (path === '/cancelaciones-reembolsos') return 'cancelaciones-reembolsos';
  if (path === '/eliminacion-cuenta') return 'eliminacion-cuenta';
  return 'not-found';
}

function setMeta(nameOrProperty: string, value: string, property = false) {
  const selector = property ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property ? 'property' : 'name', nameOrProperty);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

function setCanonical(url: string) {
  let tag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    document.head.appendChild(tag);
  }
  tag.href = url;
}

function useCurrentRoute() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const normalizedPath = normalizePath(path);
    if (normalizedPath === currentPath) {
      return;
    }
    window.history.pushState({}, '', normalizedPath);
    setCurrentPath(normalizedPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    page: routeFromPath(currentPath),
    navigate,
    currentPath
  };
}

function InternalLink({
  href,
  children,
  className,
  onNavigate
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Header({ currentPath, onNavigate }: { currentPath: string; onNavigate: (path: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <InternalLink className="brand-link" href="/" onNavigate={handleNavigate}>
          <img src="/assets/7lleva-icon.png" alt="" className="brand-logo" />
          <span>
            <strong>{site.name}</strong>
            <small>{site.slogan}</small>
          </span>
        </InternalLink>
        <button
          className="nav-toggle"
          type="button"
          aria-label="Abrir navegación"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          ☰
        </button>
        <nav className="nav-links" data-open={menuOpen}>
          {routes.map((route) => (
            <InternalLink
              key={route.path}
              href={route.path}
              onNavigate={handleNavigate}
              className={normalizePath(route.path) === currentPath ? 'active' : undefined}
            >
              {route.label}
            </InternalLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <InternalLink className="brand-link" href="/" onNavigate={onNavigate}>
            <img src="/assets/7lleva-icon.png" alt="" className="brand-logo" />
            <span>
              <strong>{site.name}</strong>
              <small>{site.slogan}</small>
            </span>
          </InternalLink>
          <p>© {new Date().getFullYear()} 7Lleva. Sitio en preparación para lanzamiento.</p>
        </div>
        <nav className="footer-links" aria-label="Enlaces públicos">
          {legalPages.map((page) => (
            <InternalLink key={page.slug} href={`/${page.slug}`} onNavigate={onNavigate}>
              {page.navLabel}
            </InternalLink>
          ))}
          <InternalLink href="/soporte" onNavigate={onNavigate}>
            Soporte
          </InternalLink>
        </nav>
      </div>
    </footer>
  );
}

function Hero({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">Próximamente · Servicio en preparación</span>
        <h1>7Lleva</h1>
        <p className="hero-slogan">Sí te lleva</p>
        <p>
          Conectamos pasajeros, conductores y servicios de traslado en la región. Estamos preparando el lanzamiento para operar con claridad, seguridad y cercanía.
        </p>
        <div className="hero-actions">
          <InternalLink href="/pasajeros" onNavigate={onNavigate} className="button button-primary">
            Quiero viajar
          </InternalLink>
          <InternalLink href="/conductores" onNavigate={onNavigate} className="button button-secondary">
            Quiero conducir
          </InternalLink>
          <a className="button button-ghost" href={`mailto:${site.emails.contact}`}>
            Contactar soporte
          </a>
        </div>
      </div>
      <aside className="launch-note">
        <strong>Etapa inicial</strong>
        <p>La disponibilidad real dependerá de pruebas, zonas activas, validación y conductores participantes.</p>
      </aside>
    </section>
  );
}

function ServiceGrid() {
  return (
    <div className="grid service-grid">
      {site.services.map((service) => (
        <article className="card" key={service.title}>
          <span className="service-label">{service.label}</span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
        </article>
      ))}
    </div>
  );
}

function ZoneList() {
  return (
    <div className="zones" aria-label="Zonas iniciales">
      {site.zones.map((zone) => (
        <span className="zone-pill" key={zone}>
          {zone}
        </span>
      ))}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <section className="section">
        <span className="section-kicker">Servicios previstos</span>
        <h2 className="section-title">Viajes y mandados regionales desde una sola plataforma.</h2>
        <p className="section-copy">
          7Lleva está en preparación para ordenar solicitudes locales y regionales sin prometer disponibilidad inmediata ni precio fijo obligatorio.
        </p>
        <ServiceGrid />
      </section>
      <section className="section split-section">
        <div>
          <span className="section-kicker">Para pasajeros</span>
          <h2 className="section-title">Solicita viajes locales, regionales o foráneos.</h2>
          <p className="section-copy">
            Consulta disponibilidad de conductores participantes. Los precios pueden variar según ruta, horario, tipo de unidad, disponibilidad y condiciones del servicio.
          </p>
        </div>
        <div className="action-panel">
          <InternalLink href="/pasajeros" onNavigate={onNavigate} className="button button-primary">
            Quiero viajar
          </InternalLink>
          <InternalLink href="/zonas-servicio" onNavigate={onNavigate} className="button button-muted">
            Ver zonas de servicio
          </InternalLink>
        </div>
      </section>
      <section className="feature-band">
        <div className="section">
          <span className="section-kicker">Conductores</span>
          <h2 className="section-title">Promoción vigente para la etapa inicial.</h2>
          <p className="section-copy">
            Durante la etapa inicial, 7Lleva no cobrará comisión a conductores participantes conforme a la promoción vigente.
          </p>
          <ul className="feature-list">
            <li>Queremos iniciar con conductores locales, autos, unidades amplias, transporte grupal y mototaxis donde aplique.</li>
            <li>La participación está sujeta a disponibilidad, validación y reglas de operación.</li>
            <li>La promoción podrá ajustarse conforme avance el lanzamiento y se informará por canales oficiales.</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <span className="section-kicker">Zonas iniciales</span>
        <h2 className="section-title">Cobertura regional en preparación.</h2>
        <p className="section-copy">Las zonas se activarán gradualmente conforme a pruebas, seguridad operativa y conductores disponibles.</p>
        <ZoneList />
      </section>
    </>
  );
}

function PassengerPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <ContentPage eyebrow="Pasajeros" title="Viaja cuando la operación esté activa." intro="Solicita viajes locales, regionales o foráneos desde una sola plataforma. El servicio está en preparación y no promete disponibilidad inmediata.">
      <div className="grid grid-three">
        <InfoCard title="Viajes locales" text="Solicitudes dentro de zonas activas y con conductores participantes." />
        <InfoCard title="Entre poblaciones" text="Rutas entre comunidades y municipios cercanos, sujetas a disponibilidad." />
        <InfoCard title="Foráneos" text="Viajes regionales con información clara de origen, destino, pasajeros y unidad." />
      </div>
      <div>
        <span className="section-kicker">Servicios para pasajeros</span>
        <h2 className="section-title">Viajes, paquetería y mandados en una misma plataforma.</h2>
        <ServiceGrid />
      </div>
      <div className="notice">
        <p>Los precios pueden variar según ruta, horario, disponibilidad, tipo de unidad y condiciones del servicio.</p>
      </div>
      <InternalLink href="/zonas-servicio" onNavigate={onNavigate} className="button button-primary">
        Ver zonas de servicio
      </InternalLink>
    </ContentPage>
  );
}

function DriverPage() {
  return (
    <ContentPage eyebrow="Conductores" title="Participa en la etapa inicial de 7Lleva." intro="Buscamos iniciar con conductores locales y unidades adecuadas para la región. La participación está sujeta a disponibilidad, validación y reglas de operación.">
      <div className="notice">
        <p>Durante la etapa inicial, 7Lleva no cobrará comisión a conductores participantes conforme a la promoción vigente.</p>
      </div>
      <div className="grid grid-three">
        <InfoCard title="Unidades previstas" text="Autos, unidades amplias, transporte grupal y mototaxis donde aplique." />
        <InfoCard title="Validación" text="La operación requiere datos claros, revisión y reglas de servicio." />
        <InfoCard title="Contacto" text={`Escribe a ${site.emails.contact} para información de lanzamiento.`} />
      </div>
      <a href={`mailto:${site.emails.contact}`} className="button button-primary">
        Quiero conducir
      </a>
    </ContentPage>
  );
}

function ZonesPage() {
  return (
    <ContentPage eyebrow="Zonas de servicio" title="Cobertura prevista para el lanzamiento." intro="7Lleva prepara cobertura gradual en zonas regionales. La operación final dependerá de pruebas, conductores participantes y reglas locales.">
      <ZoneList />
      <div className="notice">
        <p>Estas zonas son consideradas para la etapa inicial; no significan disponibilidad inmediata en todas las rutas.</p>
      </div>
    </ContentPage>
  );
}

function LegalIndexPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <ContentPage
      eyebrow="Legales"
      title="Documentos legales públicos"
      intro="Bases legales en preparación para revisión profesional antes de publicación definitiva."
    >
      <div className="grid grid-three">
        {legalPages.map((page) => (
          <article className="card" key={page.slug}>
            <h3>{page.navLabel}</h3>
            <p>{page.description}</p>
            <InternalLink href={`/${page.slug}`} onNavigate={onNavigate}>
              Revisar documento
            </InternalLink>
          </article>
        ))}
      </div>
      <div className="notice">
        <p>Estos textos no sustituyen revisión de abogado, contador ni asesor fiscal antes de publicación.</p>
      </div>
    </ContentPage>
  );
}

function SupportPage() {
  return (
    <ContentPage eyebrow="Soporte" title="Soporte y contacto" intro="Canales públicos previstos. No se incluyen formularios reales ni recolección de datos porque el servicio está en preparación.">
      <div className="grid grid-three">
        {supportSections.map((section) => (
          <article className="card" key={section.email}>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
            <a href={`mailto:${section.email}`}>{section.email}</a>
          </article>
        ))}
      </div>
      <div className="notice">
        <p>No compartas contraseñas, NIP, CVV, datos completos de tarjeta ni información innecesaria por correo.</p>
      </div>
    </ContentPage>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ContentPage({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="section content-flow">{children}</section>
    </>
  );
}

function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <ContentPage eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
      <div className="notice">
        <p>{page.description}</p>
      </div>
      <article className="legal-content">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </ContentPage>
  );
}

function NotFoundPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <ContentPage eyebrow="404" title="Página no encontrada" intro="La página solicitada no está disponible.">
      <InternalLink href="/" onNavigate={onNavigate} className="button button-primary">
        Volver al inicio
      </InternalLink>
    </ContentPage>
  );
}

export default function App() {
  const { page, currentPath, navigate } = useCurrentRoute();
  const meta = pageMeta[page];
  const legalPage = useMemo(() => legalPages.find((item) => item.slug === page), [page]);

  useEffect(() => {
    const url = `${site.domain}${meta.path === '/' ? '/' : meta.path}`;
    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', `${site.domain}/assets/hero-7lleva.png`, true);
    setCanonical(url);
  }, [meta]);

  return (
    <>
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main>
        {page === 'home' ? <HomePage onNavigate={navigate} /> : null}
        {page === 'pasajeros' ? <PassengerPage onNavigate={navigate} /> : null}
        {page === 'conductores' ? <DriverPage /> : null}
        {page === 'zonas-servicio' ? <ZonesPage /> : null}
        {page === 'soporte' ? <SupportPage /> : null}
        {page === 'legales' ? <LegalIndexPage onNavigate={navigate} /> : null}
        {legalPage ? <LegalPageView page={legalPage} /> : null}
        {page === 'not-found' ? <NotFoundPage onNavigate={navigate} /> : null}
      </main>
      <Footer onNavigate={navigate} />
    </>
  );
}
