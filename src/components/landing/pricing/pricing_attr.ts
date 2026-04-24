export const plansData = {
  Personal: [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for getting started',
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      popular: false,
      isEnterprise: false,
      cta: 'Get Started',
      link: '/signup',
      features: [
        'Access to basic courses',
        'Community support',
        'Mobile access',
        'Basic analytics'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for serious learners',
      monthlyPrice: 19.99,
      annualPrice: 15.99,
      popular: true,
      isEnterprise: false,
      cta: 'Go Pro',
      link: '/signup',
      features: [
        'Everything in Basic',
        'All courses access',
        'Priority support',
        'Certificates of completion',
        'Advanced analytics',
        'Offline access'
      ]
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For groups and organizations',
      monthlyPrice: 29.99,
      annualPrice: 23.99,
      popular: false,
      isEnterprise: false,
      cta: 'Contact Sales',
      link: '/contact',
      features: [
        'Everything in Pro',
        'Team management',
        'Admin dashboard',
        'Bulk enrollment',
        'API access',
        'Dedicated account manager'
      ]
    }
  ],
  Business: [
    {
      id: 'team',
      name: 'Team',
      description: 'For small to medium teams',
      monthlyPrice: 49.99,
      annualPrice: 39.99,
      popular: false,
      isEnterprise: false,
      cta: 'Contact Sales',
      link: '/contact',
      features: [
        'Up to 50 users',
        'Team collaboration tools',
        'Admin controls',
        'Analytics dashboard',
        'Priority support',
        'SSO integration'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing organizations',
      monthlyPrice: 99.99,
      annualPrice: 79.99,
      popular: true,
      isEnterprise: false,
      cta: 'Contact Sales',
      link: '/contact',
      features: [
        'Up to 200 users',
        'Everything in Team',
        'Custom reporting',
        'Advanced security',
        '24/7 phone support',
        'API access',
        'Custom integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      isEnterprise: true,
      cta: 'Talk to Sales',
      link: '/contact',
      features: [
        'Unlimited users',
        'Everything in Business',
        'Custom SLA',
        'Dedicated infrastructure',
        'On-premise deployment',
        'Custom training',
        'Strategic consulting'
      ]
    }
  ]
};

export const comparisonData = {
  Personal: [
    {
      feature: 'Number of Courses',
      values: {
        basic: '50+',
        pro: '200+',
        team: '500+'
      }
    },
    {
      feature: 'Certificates',
      values: {
        basic: false,
        pro: true,
        team: true
      }
    },
    {
      feature: 'Download Videos',
      values: {
        basic: false,
        pro: true,
        team: true
      }
    },
    {
      feature: 'Priority Support',
      values: {
        basic: false,
        pro: true,
        team: true
      }
    },
    {
      feature: 'Team Management',
      values: {
        basic: false,
        pro: false,
        team: true
      }
    },
    {
      feature: 'API Access',
      values: {
        basic: false,
        pro: false,
        team: true
      }
    },
    {
      feature: 'Analytics',
      values: {
        basic: 'Basic',
        pro: 'Advanced',
        team: 'Enterprise'
      }
    }
  ],
  Business: [
    {
      feature: 'Max Users',
      values: {
        team: '50',
        business: '200',
        enterprise: 'Unlimited'
      }
    },
    {
      feature: 'SSO Integration',
      values: {
        team: true,
        business: true,
        enterprise: true
      }
    },
    {
      feature: 'Custom Reporting',
      values: {
        team: false,
        business: true,
        enterprise: true
      }
    },
    {
      feature: '24/7 Support',
      values: {
        team: false,
        business: true,
        enterprise: true
      }
    },
    {
      feature: 'Custom SLA',
      values: {
        team: false,
        business: false,
        enterprise: true
      }
    },
    {
      feature: 'On-premise Deployment',
      values: {
        team: false,
        business: false,
        enterprise: true
      }
    },
    {
      feature: 'Training Sessions',
      values: {
        team: 'Basic',
        business: 'Quarterly',
        enterprise: 'Monthly'
      }
    },
    {
      feature: 'Account Manager',
      values: {
        team: false,
        business: true,
        enterprise: true
      }
    }
  ]
};

export const faqs = [
  {
    id: 1,
    question: 'Can I switch plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    id: 2,
    question: 'Do you offer student discounts?',
    answer: 'Yes, students with a valid .edu email get 50% off on the Pro plan. Contact our support team for verification.'
  },
  {
    id: 3,
    question: 'Is there a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
  },
  {
    id: 5,
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. No cancellation fees.'
  }
];
