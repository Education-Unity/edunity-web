export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  isEnterprise: boolean;
  link: string;
}

export interface ComparisonRow {
  feature: string;
  values: Record<string, string | boolean>;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const plansData: Record<string, Plan[]> = {
  Personal: [
    {
      id: "free",
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "For casual learning",
      features: ["5 Quizzes per month", "Basic Analytics", "Community Support"],
      cta: "Get Started",
      popular: false,
      isEnterprise: false,
      link: "/register",
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: 12,
      annualPrice: 9,
      description: "For power users",
      features: ["Unlimited Quizzes", "Advanced Analytics", "No Ads", "Priority Support"],
      cta: "Start Free Trial",
      popular: true,
      isEnterprise: false,
      link: "/register?plan=pro",
    },
  ],
  Business: [
    {
      id: "team",
      name: "Team",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "For small teams & schools",
      features: ["5 Team Seats", "Collaborative Editing", "Team Folders", "Admin Dashboard"],
      cta: "Start Team Trial",
      popular: true,
      isEnterprise: false,
      link: "/register?plan=team",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "For large organizations",
      features: ["Unlimited Seats", "SSO (SAML)", "Dedicated Success Manager", "Custom SLA"],
      cta: "Contact Sales",
      popular: false,
      isEnterprise: true,
      link: "/contact",
    },
  ],
};

export const comparisonData: Record<string, ComparisonRow[]> = {
  Personal: [
    { feature: "Quizzes per month", values: { free: "5", pro: "Unlimited" } },
    { feature: "Players per game", values: { free: "10", pro: "100" } },
    { feature: "Ad-free experience", values: { free: false, pro: true } },
    { feature: "Data Export", values: { free: false, pro: true } },
    { feature: "Support", values: { free: "Community", pro: "Priority Email" } },
  ],
  Business: [
    { feature: "Team Members", values: { team: "Up to 5", enterprise: "Unlimited" } },
    { feature: "SSO / SAML", values: { team: false, enterprise: true } },
    { feature: "API Access", values: { team: "Read-only", enterprise: "Full Access" } },
    { feature: "Audit Logs", values: { team: true, enterprise: true } },
    { feature: "Custom Branding", values: { team: true, enterprise: true } },
    { feature: "Training", values: { team: "Docs", enterprise: "Live Sessions" } },
  ],
};

export const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "Can I change my plan later?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time.",
  },
  {
    id: "faq2",
    question: "How does the Enterprise plan work?",
    answer: "Contact our sales team. We will tailor a contract based on your seat requirements and security needs.",
  },
  {
    id: "faq3",
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid annual plans.",
  },
  {
    id: "faq4",
    question: "Can I switch between Personal and Business plans?",
    answer: "Yes, you can upgrade from Personal to Business at any time. Contact support for assistance with migration.",
  },
  {
    id: "faq5",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
  },
];
