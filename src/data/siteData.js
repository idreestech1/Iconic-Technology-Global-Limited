import { portfolioProjects } from './portfolioData';

export const siteInfo = {
  name: "Iconic Technologies Global",
  phone: "+2348106156968",
  phoneRaw: "+2348106156968",
  email: "support@iconictechnologiesgloballimited.com",
  whatsapp: "+2348106156968",
  address: "Lagos, Nigeria",
  socials: {
    facebook: "https://www.facebook.com/iconictechglbl",
    behance: "http://www.behance.net/iconictechglbltd",
    instagram: "https://www.instagram.com/iconictechglbl",
    linkedin: "https://www.linkedin.com/company/ipropertylens",
    dribbble: "https://www.tiktok.com/@iconictechgloballtd"
  },
  about: {
    mission: "To architect world-class digital ecosystems, high-performance software, and enduring brand identities that empower businesses to scale seamlessly and lead their markets globally.",
    vision: "To become the premier global technology partner recognized for engineering excellence, zero-defect architecture, and transformative digital experiences.",
    coreValues: [
      {
        title: "Engineering Rigor",
        description: "Zero-compromise approach to code quality, system security, and high-availability architecture."
      },
      {
        title: "Human-Centered Design",
        description: "Transforming complex technical capabilities into intuitive, frictionless user journeys."
      },
      {
        title: "Speed & Predictability",
        description: "Agile sprint cadence with transparent milestone delivery and proactive communication."
      },
      {
        title: "Compounding Business Value",
        description: "Building resilient solutions designed to maximize conversion, retention, and long-term ROI."
      }
    ],
    globalOperatingModel: "Operating with a distributed team of senior software engineers, UI/UX architects, and product strategists, Iconic Technologies delivers 24/7 velocity, rapid cross-timezone collaboration, and bank-grade data security protocols across every engagement."
  }
};

export const services = [
  {
    id: "ui-and-ux-design",
    slug: "ui-and-ux-design",
    title: "UI & UX Design",
    shortTitle: "UI/UX Design",
    icon: "/assets/imgs/icon/icon-s-1-light.webp",
    description: "We build beautiful, intuitive websites and applications that delight users and achieve ambitious business goals.",
    features: [
      "App Design",
      "Website Design",
      "Software Testing",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "User Flows",
      "Interaction Design",
      "Information Architecture",
      "User Personas",
      "User Journeys"
    ],
    overview: "Our human-centered UI/UX design methodology turns complex workflows into seamless, delightfully simple digital journeys. We combine deep behavioral psychology, structured wireframing, and interactive design systems that maximize retention and conversion.",
    deliverables: [
      "Figma Design Systems & Component Libraries",
      "Clickable Interactive Prototypes",
      "User Research & Journey Maps",
      "Comprehensive Usability Testing Reports",
      "Mobile App & SaaS Web Interfaces"
    ],
    heroImage: "/assets/imgs/gallery/uiImg.jpg",
    gallery: [
      "/assets/imgs/gallery/uiImg1.jpg",
      "/assets/imgs/gallery/uiImg2.jpg",
      "/assets/imgs/gallery/uiImg3.jpg"
    ],
    workingSteps: [
      {
        title: "Planning and\nSketching",
        text: "Mapping user flows, information hierarchy, and functionality with clarity."
      },
      {
        title: "User-Centered\nDesign",
        text: "Keeping real users at the heart of every design decision."
      },
      {
        title: "Prototyping &\nTesting",
        text: "Bringing interfaces to life and validating them with real feedback."
      },
      {
        title: "Design\nSystems",
        text: "Scalable components and visual consistency for growing products."
      }
    ]
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphic Design",
    shortTitle: "Graphic Design",
    icon: "/assets/imgs/icon/servi2.svg",
    description: "Distinct visual design assets that command attention and express your brand essence across every digital and print touchpoint.",
    features: [
      "Logo Design",
      "Style Guides",
      "Social Media Graphics",
      "Flyers",
      "Posters",
      "Reports",
      "Presentation Design",
      "Menu Design"
    ],
    overview: "We create distinctive visual graphics that make your brand stand out in high-speed feeds and tangible media alike. From keynote investor decks to premium advertising collateral, our designs make an immediate emotional connection.",
    deliverables: [
      "High-Resolution Vector Graphics",
      "Social Media Kits & Ad Creative Bundles",
      "Corporate Pitch Decks & Investor Presentations",
      "Print-Ready Marketing Collateral",
      "Iconography & Custom Graphic Suites"
    ],
    heroImage: "/assets/imgs/gallery/servicImage.png",
    gallery: [
      "/assets/imgs/gallery/weareImg1.jpg",
      "/assets/imgs/gallery/weareImg2.jpg",
      "/assets/imgs/gallery/aboutImg3.jpg"
    ],
    workingSteps: [
      {
        title: "Creative\nDiscovery",
        text: "Deep-diving into brand essence, typography rules, and aesthetic targets."
      },
      {
        title: "Concept\nExploration",
        text: "Generating distinctive visual iterations and moodboards that push boundaries."
      },
      {
        title: "Refinement &\nPolish",
        text: "Obsessing over vector precision, color profiles, and visual hierarchy."
      },
      {
        title: "Multi-Format\nDelivery",
        text: "Exporting print-ready and digital vector assets for omni-channel campaigns."
      }
    ]
  },
  {
    id: "branding-and-rebranding",
    slug: "branding-and-rebranding",
    title: "Branding & Rebranding",
    shortTitle: "Branding & Rebranding",
    icon: "/assets/imgs/icon/servi3.svg",
    description: "From logos to full brand guidelines, we craft cohesive brand identities that elevate positioning and endure.",
    features: [
      "Brand Identity",
      "Logo Design",
      "Brand Guidelines",
      "Market Positioning",
      "Visual Style"
    ],
    overview: "A brand is not just a logo; it's the lasting emotional impression your business leaves behind. We shape foundational brand narratives, color psychology, typography systems, and market positioning that turn businesses into recognizable market leaders.",
    deliverables: [
      "Brand Architecture & Strategy Document",
      "Full Brand Guidelines Specification",
      "Logo Mark, Typography & Palette System",
      "Brand Voice, Mission & Narrative Manifesto",
      "Packaging & Environmental Design Assets"
    ],
    heroImage: "/assets/imgs/gallery/aboutImg.jpg",
    gallery: [
      "/assets/imgs/gallery/aboutImg2.jpg",
      "/assets/imgs/gallery/aboutImg3.jpg",
      "/assets/imgs/gallery/weareImg1.jpg"
    ],
    workingSteps: [
      {
        title: "Market\nDiscovery",
        text: "Analyzing competitive landscape and uncovering unique market positioning."
      },
      {
        title: "Identity\nArchitecture",
        text: "Crafting foundational brand marks, color palettes, and typographic scales."
      },
      {
        title: "Brand Voice\n& Tone",
        text: "Formulating compelling messaging manifestos and brand narratives."
      },
      {
        title: "Brand\nGuidelines",
        text: "Delivering comprehensive brand books and design system standards."
      }
    ]
  },
  {
    id: "app-development",
    slug: "app-development",
    title: "App Development",
    shortTitle: "App Development",
    icon: "/assets/imgs/icon/servi4.svg",
    description: "Native and cross-platform mobile apps engineered for speed, fluid 60fps animations, and delightful user retention.",
    features: [
      "Android Development",
      "iOS Development",
      "Flutter Development",
      "User Interface",
      "User Experience"
    ],
    overview: "We architect resilient, secure, and blazing-fast mobile experiences for iOS and Android. Whether using Flutter or native architectures, our applications ensure offline-first reliability, micro-interactions, and frictionless checkout flows.",
    deliverables: [
      "Native iOS & Android Applications",
      "Cross-Platform Flutter Codebases",
      "Cloud REST / GraphQL Backend Integrations",
      "Push Notification & Analytics Pipelines",
      "Full App Store & Google Play Launch Management"
    ],
    heroImage: "/assets/imgs/gallery/ctaBG.jpg",
    gallery: [
      "/assets/imgs/gallery/uiImg2.jpg",
      "/assets/imgs/gallery/uiImg3.jpg",
      "/assets/imgs/gallery/homeBanner.jpg"
    ],
    workingSteps: [
      {
        title: "Architecture &\nTech Stack",
        text: "Selecting robust frameworks, cloud infrastructure, and state patterns."
      },
      {
        title: "Native & Cross-\nPlatform UI",
        text: "Translating Figma designs into 60fps responsive mobile screens."
      },
      {
        title: "API & Cloud\nIntegration",
        text: "Engineering secure GraphQL/REST pipelines and push notification systems."
      },
      {
        title: "QA & Store\nDeployment",
        text: "Rigorous automated testing, security audits, and App Store/Play Store launch."
      }
    ]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Website Development",
    shortTitle: "Website Development",
    icon: "/assets/imgs/icon/servi5.svg",
    description: "Custom web and app solutions, robust backend systems, and seamless integrations built for top performance and speed.",
    features: [
      "E-Commerce",
      "Management Tools",
      "Dynamic Websites",
      "Responsive Design",
      "Content Management"
    ],
    overview: "From lightning-fast headless e-commerce to dynamic enterprise portals, we engineer custom web architectures that score 90+ on Core Web Vitals. Our code is clean, modular, and built to scale effortlessly with your traffic.",
    deliverables: [
      "Custom Modern React / Web Application",
      "E-Commerce Stores with Secure Payment Gateways",
      "Headless CMS Integration",
      "SEO-Ready Clean Semantic Code Architecture",
      "Mobile-Responsive Dynamic Layouts"
    ],
    heroImage: "/assets/imgs/gallery/homeBanner.jpg",
    gallery: [
      "/assets/imgs/gallery/uiImg1.jpg",
      "/assets/imgs/gallery/uiImg3.jpg",
      "/assets/imgs/gallery/aboutImg2.jpg"
    ],
    workingSteps: [
      {
        title: "Technical\nBlueprint",
        text: "Architecting clean component structures and optimized database schemas."
      },
      {
        title: "Frontend\nEngineering",
        text: "Building blazing-fast modern React interfaces with smooth animations."
      },
      {
        title: "Performance\nOptimization",
        text: "Targeting 90+ Core Web Vitals, accessible markup, and clean SEO hierarchy."
      },
      {
        title: "CI/CD &\nLaunch",
        text: "Configuring continuous deployment, SSL encryption, and automated monitoring."
      }
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    icon: "/assets/imgs/icon/icon-s-4-light.webp",
    description: "Targeted campaigns and conversion optimization that turn clicks into loyal clients and compound business growth.",
    features: [
      "Digital Marketing",
      "Social Media Marketing",
      "Google Ads",
      "SEO",
      "Content Strategy",
      "Analytics"
    ],
    overview: "We orchestrate data-driven marketing campaigns that scale customer acquisition and maximize return on ad spend. With high-intent keyword strategies, hyper-targeted social ads, and continuous funnel optimization, we accelerate revenue growth.",
    deliverables: [
      "Multi-Channel Paid Advertising Campaigns",
      "Technical & On-Page SEO Overhaul",
      "Social Media Content Strategy & Management",
      "Conversion Rate Optimization (CRO)",
      "Real-Time Analytics & ROI Dashboards"
    ],
    heroImage: "/assets/imgs/gallery/faqimg.jpg",
    gallery: [
      "/assets/imgs/gallery/weareImg2.jpg",
      "/assets/imgs/gallery/aboutImg.jpg",
      "/assets/imgs/gallery/ctaBG.jpg"
    ],
    workingSteps: [
      {
        title: "Audience\nInsights",
        text: "Identifying high-intent audience segments and market search trends."
      },
      {
        title: "Campaign\nArchitecture",
        text: "Designing multi-channel funnels across search, paid social, and retargeting."
      },
      {
        title: "Conversion\nOptimization",
        text: "A/B testing landing page variants and optimizing checkout conversion."
      },
      {
        title: "Real-Time ROI\nAnalytics",
        text: "Continuous funnel monitoring, KPI reporting, and compounding growth loops."
      }
    ]
  }
];

export const teamMembers = [
  {
    name: "Sohel Khan",
    role: "Graphic Designer",
    image: "/assets/imgs/team/sohel.jpg"
  },
  {
    name: "Aslam Khan",
    role: "UI UX Designer",
    image: "/assets/imgs/team/aslam.jpg"
  },
  {
    name: "Lalit Saini",
    role: "Full Stack Developer",
    image: "/assets/imgs/team/lalit.jpg"
  },
  {
    name: "Soud Khan",
    role: "Flutter Developer",
    image: "/assets/imgs/team/soud.jpg"
  },
  {
    name: "Faisal Khan",
    role: "Digital Marketing",
    image: "/assets/imgs/team/faisal.jpg"
  },
  {
    name: "Rashid Khan",
    role: "Managing Director",
    image: "/assets/imgs/team/rashid.jpg"
  }
];

export const testimonials = [
  {
    quote: "Working with Iconic Technologies Global Limited was honestly such a smooth and rewarding experience. From day one, their engineering and design teams demonstrated unmatched depth. They transformed our merchant settlement flows into an ultra-fast, intuitive web experience. The team was agile, proactive with architecture improvements, and delivered two weeks ahead of schedule.",
    author: "Olumide Soyombo",
    role: "Director of Ecosystem Partnerships, Flutterwave"
  },
  {
    quote: "These guys really know their stuff! We engaged Iconic Global Limited to build scalable cross-platform client interfaces and developer dashboard tooling. What we got was way beyond expectations. The Iconic team gave thoughtful architectural suggestions, nailed our security standards, and crafted a frictionless 60fps user experience.",
    author: "Bamidele Adegoke",
    role: "VP of Engineering, Paystack Integration"
  },
  {
    quote: "Best technology and design experience we've had so far. It's rare to find an engineering partner in Nigeria that is fast, reliable, AND exceptionally creative — Iconic Technologies nailed all three. They overhauled our enterprise portal with sub-second response times, cutting onboarding friction by over 40%.",
    author: "Chidi Nwosu",
    role: "Head of Product Engineering, Moniepoint"
  },
  {
    quote: "Our mobile applications and dynamic dashboards look world-class! We needed an engineering team capable of delivering bank-grade reliability with fluid modern micro-interactions, and Iconic Global Limited delivered on every metric. Transparent sprint cadences and excellent communication throughout.",
    author: "Damilola Adebayo",
    role: "Lead Product Architect, Kuda Bank"
  },
  {
    quote: "Iconic Technologies Global Limited took our complex supply chain logistics specifications and engineered them into a high-performance cloud dashboard. Handling high-frequency inventory movements across regional distribution hubs without lag was critical, and their full-stack developers executed it with stellar reliability.",
    author: "Babajide Alabi",
    role: "Director of Digital Transformation, Dangote Group"
  },
  {
    quote: "Working with Iconic Technologies Global Limited has been one of the smoothest agency experiences of my career. They took our multi-product digital ecosystem and created a unified, accessible design system with 95+ Core Web Vitals. Their attention to detail and vector precision set a gold standard.",
    author: "Farouk Bello",
    role: "Head of Growth & Infrastructure, Interswitch"
  },
  {
    quote: "Iconic Global Limited completely elevated our customer-facing web platform. Their digital marketing architecture and conversion optimization strategies surged our user activation by 38% within the first ninety days. A truly top-tier African technology partner you can depend on.",
    author: "Amina Ibrahim",
    role: "Chief Product Officer, Piggyvest"
  },
  {
    quote: "Partnering with Iconic Technologies Global Limited was a remarkable success. They modernized our service portal, streamlined user verification workflows, and delivered a secure, mobile-first experience. If you need robust enterprise digital solutions, Iconic Global Limited is the team to trust.",
    author: "Emeka Eze",
    role: "Senior Operations Lead, MTN Nigeria"
  }
];

export const clientLogos = [
  "/assets/imgs/brand/flutterwave.svg",
  "/assets/imgs/brand/paystack.svg",
  "/assets/imgs/brand/moniepoint.svg",
  "/assets/imgs/brand/kuda.svg",
  "/assets/imgs/brand/interswitch.svg",
  "/assets/imgs/brand/piggyvest.svg",
  "/assets/imgs/brand/dangote.svg",
  "/assets/imgs/brand/opay.svg",
  "/assets/imgs/brand/mtn.svg",
  "/assets/imgs/brand/fairmoney.svg",
  "/assets/imgs/brand/nomba.svg",
  "/assets/imgs/brand/carbon.svg"
];

export const projectSlidesRow1 = portfolioProjects
  .filter((_, idx) => idx % 2 === 0)
  .map((p) => p.image);

export const projectSlidesRow2 = portfolioProjects
  .filter((_, idx) => idx % 2 === 1)
  .map((p) => p.image);

export const aboutFaqs = [
  {
    id: "faq-1",
    question: "UI/UX & Website Design",
    answer: "We build beautiful, intuitive websites and applications that delight users and achieve business goals."
  },
  {
    id: "faq-2",
    question: "Branding & Visual Identity",
    answer: "From logos to full brand guidelines, we craft cohesive brand identities that speak volumes."
  },
  {
    id: "faq-3",
    question: "Development",
    answer: "Custom web and app solutions, robust backend systems, and seamless integrations built for performance."
  }
];
