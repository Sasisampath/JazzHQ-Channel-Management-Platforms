export type NavDestination = string | null;
export const ROUTES = { home: "https://www.jazzhq.ai/" } as const;
// These global destinations are not available in the standalone build.
export const NAV_ITEMS: { label: string; href: NavDestination }[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: null },
  { label: "Events", href: null },
  { label: "Marketplace", href: null },
  { label: "Stories", href: null },
];
export type JourneyKey = "buyer" | "vendor" | "partner";
export const JOURNEYS: {key: JourneyKey; title: string; description: string; href: NavDestination}[] = [
 {key:"buyer",title:"I’m an AI Buyer",description:"Find AI solutions · Coming soon",href:null},
 {key:"vendor",title:"I’m an AI Vendor",description:"List your product · Coming soon",href:null},
 {key:"partner",title:"I’m a Channel Partner",description:"Partner with AI companies · Coming soon",href:null},
];
export const FOOTER_COMPANY: {label:string;href:NavDestination}[] = [{label:"About us",href:null}];
export const FOOTER_HELP: typeof FOOTER_COMPANY = [{label:"Contact us",href:null},{label:"Privacy policy",href:null},{label:"Terms and conditions",href:null}];
export const FOOTER_LEGAL: typeof FOOTER_COMPANY = [{label:"Privacy Policy",href:null},{label:"Terms of Service",href:null}];
export const kifloPublication = { slug: "kiflo-alternatives", listed: false };

export const showKifloInNavigation =
  kifloPublication.listed || process.env.NODE_ENV === "development";

const alternativesOrigin = process.env.NEXT_PUBLIC_ALTERNATIVES_ORIGIN?.replace(/\/$/u, "");
const alternatives = (path: string) => alternativesOrigin ? `${alternativesOrigin}${path}` : null;

export const FOOTER_ALTERNATIVES: typeof FOOTER_COMPANY = [
  { label: "All Alternatives", href: alternatives("/alternatives") },
  { label: "PartnerStack Alternatives", href: alternatives("/alternatives/partnerstack-alternatives") },
  { label: "Salesforce PRM Alternatives", href: alternatives("/alternatives/salesforce-prm-alternatives") },
  { label: "Euler Alternatives", href: alternatives("/alternatives/euler-alternatives") },
  { label: "Channelscaler Alternatives", href: alternatives("/alternatives/channelscaler-alternatives") },
  { label: "Mindmatrix Alternatives", href: alternatives("/alternatives/mindmatrix-alternatives") },
  ...(showKifloInNavigation
    ? [{ label: "Kiflo Alternatives", href: alternatives(`/alternatives/${kifloPublication.slug}`) }]
    : []),
];
