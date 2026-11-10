import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, ChartNoAxesColumn, Check, ClipboardCheck, Clock3, Handshake, UsersRound, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GridBackground } from "@/components/layout/grid-background";
import { Footer } from "@/components/shared/footer";
import { guide, route } from "@/data/guide";
import { pageSeo } from "@/lib/seo";
import { ReadingProgress } from "./reading-progress";
import styles from "./guide.module.css";

const seo = pageSeo({ title: guide.seoTitle, description: guide.description, path: route, indexable: false });
export const metadata = { ...seo, openGraph: { ...seo.openGraph, type: "article" as const } };

const journey = [
  { label: "Recruit", detail: "Find the right partners", icon: UsersRound },
  { label: "Onboard", detail: "Get partners ready to sell", icon: ClipboardCheck },
  { label: "Manage Deals", detail: "Track shared opportunities", icon: Handshake },
  { label: "Activate", detail: "Put training and campaigns to work", icon: Zap },
  { label: "Measure", detail: "See what drives revenue", icon: ChartNoAxesColumn },
];

type Product = (typeof guide.products)[number];

const readingTime = Math.ceil([
  guide.title, ...guide.intro, ...guide.preface, ...guide.criteria, ...guide.glance.flat(),
  ...guide.products.flatMap(({ title, intro, features, pros, consider, best, pricing }) =>
    [title, intro, ...features, ...pros, ...consider, best, ...pricing]),
  ...guide.comparison.flat(), ...guide.chooseIntro, ...guide.guidance.flat(), ...guide.verdict, ...guide.faq.flat(),
].join(" ").split(/\s+/u).length / 225);

function SectionHeading({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return <div className={styles.heading}><p className={styles.eyebrow}>{label}</p><h2 id={id}>{children}</h2></div>;
}

function Comparison({ label, rows, compact = false }: { label: string; rows: string[][]; compact?: boolean }) {
  const [headers, ...items] = rows;
  return <>
    {!compact && <p className={styles.tableHint}>Swipe or scroll to see all columns.</p>}
    <div className={styles.tableRegion} role="region" tabIndex={0} aria-labelledby={label}>
      <table className={`${styles.table} ${compact ? styles.compactTable : styles.comparisonTable}`} aria-labelledby={label}>
        <thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
        <tbody>{items.map(([name, ...values], index) => <tr key={name}>
          <th scope="row"><a href={`#${guide.products[index].id}`}>{name}</a></th>
          {values.map((value, i) => <td key={headers[i + 1]}>{value}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
  </>;
}

function Details({ label, items, className = "" }: { label: string; items: string[]; className?: string }) {
  return <div className={`${styles.detail} ${className}`}><h4>{label}</h4>
    <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
  </div>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [name, ...position] = product.title.split(": ");
  const label = `${product.id}-title`;
  return <section id={product.id} className={styles.product} aria-labelledby={label}>
    <header className={styles.productHeader}>
      <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><h3 id={label}>{name}</h3><p>{position.join(": ")}</p></div>
      {index === 0 && <span className={styles.own}>Our platform</span>}
    </header>
    <p className={styles.productIntro}><a href={product.url}>{product.linkText}</a>{product.intro.slice(product.linkText.length)}</p>
    <figure className={styles.screenshot}>
      <Image src={`${route}/${product.id}.webp`} alt={product.image.alt} width={product.image.width} height={product.image.height} unoptimized />
    </figure>
    <Details label="Key Features" items={product.features} className={styles.features} />
    <div className={styles.pair}>
      <Details label="Pros" items={product.pros} className={styles.pros} />
      <Details label="Things to Consider" items={product.consider} className={styles.consider} />
    </div>
    <div className={styles.pair}>
      <div className={`${styles.detail} ${styles.best}`}><h4>Best For</h4><p>{product.best}</p></div>
      <Details label="Pricing" items={product.pricing} className={styles.pricing} />
    </div>
  </section>;
}

export default function ChannelManagementSoftwarePage() {
  return <GridBackground>
    <a href="#guide-content" className={styles.skip}>Skip to guide</a>
    <Header />
    <ReadingProgress />
    <main id="guide-content" tabIndex={-1} className={styles.page}>
      <article>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Buyer’s Guide <span>·</span> Channel Management</p>
          <h1>{guide.title}</h1>
          <div className={styles.heroMeta}><span><Clock3 size={17} aria-hidden="true" /> {readingTime} min read</span><span>{guide.products.length} platforms compared</span></div>
          <div className={styles.heroIntro}>{guide.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <a className={styles.button} href="#at-a-glance">Compare platforms <ArrowDown size={17} aria-hidden="true" /></a>
        </div>

        <section className={styles.journey} aria-labelledby="journey-title">
          <h2 id="journey-title">The channel journey</h2>
          <ol>{journey.map(({ label, detail, icon: Icon }, index) => <li key={label}>
            <div className={styles.stageTop}><Icon size={19} aria-hidden="true" /><span>0{index + 1}</span></div>
            <h3>{label}</h3><p>{detail}</p>
          </li>)}</ol>
        </section>

        <section id="at-a-glance" className={styles.panel} aria-labelledby="glance-title">
          <SectionHeading id="glance-title" label="01 / Key takeaways">{guide.glanceTitle}</SectionHeading>
          <div className={styles.note}><strong>{guide.preface[0]}</strong><p>{guide.preface[1]}</p></div>
          <p className={styles.prose}>{guide.preface[2]}</p>
          <ul className={styles.criteria}>{guide.criteria.map(item => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>
          <Comparison label="glance-title" rows={guide.glance} compact />
        </section>

        <section id="platforms" className={styles.platforms} aria-labelledby="platforms-title">
          <SectionHeading id="platforms-title" label="02 / Platform reviews">The 8 Best Channel Management Platforms</SectionHeading>
          <div className={styles.products}>{guide.products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        </section>

        <section id="compare" className={styles.panel} aria-labelledby="compare-title">
          <SectionHeading id="compare-title" label="03 / Side by side">{guide.comparisonTitle}</SectionHeading>
          <Comparison label="compare-title" rows={guide.comparison} />
        </section>

        <section id="how-to-choose" className={styles.panel} aria-labelledby="choose-title">
          <SectionHeading id="choose-title" label="04 / Buying criteria">How to Choose Channel Management Software</SectionHeading>
          {guide.chooseIntro.map(paragraph => <p key={paragraph} className={styles.prose}>{paragraph}</p>)}
          <ol className={styles.guidance}>{guide.guidance.map(([title, detail], index) => <li key={title}>
            <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div>
          </li>)}</ol>
        </section>

        <section id="recommendations" className={styles.panel} aria-labelledby="recommendations-title">
          <SectionHeading id="recommendations-title" label="05 / Recommendations">Choose the Best Channel Management Software for You</SectionHeading>
          <div className={styles.verdict}>{guide.verdict.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section id="faq" className={styles.panel} aria-labelledby="faq-title">
          <SectionHeading id="faq-title" label="06 / Common questions">FAQs</SectionHeading>
          <div className={styles.faqList}>{guide.faq.map(([question, answer]) =>
            <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>
          )}</div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <div><h2 id="cta-title">Build your partner channel with JazzHQ</h2><p>Explore partner recruitment, activation, and channel operations in one place.</p></div>
          <a className={styles.button} href="https://www.jazzhq.ai/">Explore JazzHQ <ArrowUpRight size={17} aria-hidden="true" /></a>
        </section>
        <a className={styles.back} href="#guide-content">Back to top <ArrowRight size={14} aria-hidden="true" /></a>
      </article>
    </main>
    <Footer />
  </GridBackground>;
}
