<template>
  <HomeTemplate :isReactive="true">
    <div class="home-page">
      <div class="hero-container">
        <div>
          <h1 class="title">Edunity</h1>
          <p class="hero-desc">
            The all-in-one Classroom Management System solution trusted by
            schools and institutes in
            <strong>Vietnam</strong> to deliver engaging, equitable, and
            measurable education from anywhere in the world.
          </p>
          <div class="hero-buttons">
            <v-btn to="/register" variant="outlined" size="large" class="home-page__btn--primary">
              Explore our features
            </v-btn>
            <v-btn variant="text" size="large" class="home-page__btn--outline">
              <v-icon left>mdi-play-circle</v-icon>
              Watch demo
            </v-btn>
          </div>

          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-value">99.9%</span>
              <span class="hero-stat-label">Uptime SLA</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">24/7</span>
              <span class="hero-stat-label">Support</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value">ISO 27001</span>
              <span class="hero-stat-label">Certified</span>
            </div>
          </div>
        </div>
        <div class="hero-image"></div>
      </div>

      <div class="stats-container">
        <p class="stats-title">As of 2025, our service has provided for:</p>
        <v-row class="stats-grid">
          <v-col v-for="(stat, index) in stats" :key="index" cols="6" md="3" class="stat-item">
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </v-col>
        </v-row>

        <div class="trusted-section">
          <p class="stats-title">Alongside project partners:</p>
          <div class="trusted-logos">
            <div v-for="(company, index) in partners" :key="index" class="trusted-logo">
              <img :src="company.logo" :alt="company.name" />
            </div>
          </div>
        </div>

        <div class="trusted-section">
          <p class="stats-title">Trusted by leading companies worldwide:</p>
          <div class="trusted-logos">
            <div v-for="(company, index) in trustedBy" :key="index" class="trusted-logo">
              <img :src="company.logo" :alt="company.name" />
            </div>
          </div>
        </div>
      </div>

      <!-- Solutions Section -->
      <div class="solutions-section">
        <div class="solutions-header">
          <p class="title-sub">A complete solutions for modern education</p>
          <p class="solution-intro">Everything you need to transform your classroom into a digital powerhouse</p>
        </div>
        <v-container fluid>
          <v-row>
            <v-col v-for="(solution, index) in solutions" :key="index" cols="12" md="4">
              <v-card class="solution-card" elevation="2">
                <v-card-item>
                  <v-icon size="48" class="solution-icon">{{ solution.icon }}</v-icon>
                  <h3>{{ solution.title }}</h3>
                  <p>{{ solution.description }}</p>
                </v-card-item>
                <v-card-actions>
                  <v-btn variant="text" class="learn-more-btn">Learn more</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="features-container">
        <div>
          <p class="title-sub">Perfect for everyday classrooms</p>
          <p class="feature-intro">
            Everything teachers need to create, deliver, and measure impactful
            learning experiences, all in one intuitive platform.
          </p>
        </div>
        <v-row class="features-list">
          <v-col v-for="(feature, index) in features" :key="index" cols="12" md="6">
            <div class="feature-card">
              <v-icon class="feature-icon" size="48">{{ feature.icon }}</v-icon>
              <div class="home-page__feature-text">
                <p class="feature-title">{{ feature.title }}</p>
                <p class="feature-desc">{{ feature.description }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="benefit-section">
        <p class="title-sub" style="margin-bottom: 10px">Who we benefit from</p>
        <p class="benefit-intro">
          Our service is targeted at the following audiences (but not limited to):
        </p>
        <v-row class="benefit-grid">
          <v-col v-for="(b, index) in beneficiaries" :key="index" cols="12" sm="6" md="3">
            <div class="benefit-card">
              <v-icon size="48" color="#4A90E2">{{ b.icon }}</v-icon>
              <p class="benefit-title">{{ b.title }}</p>
              <p class="benefit-desc">{{ b.desc }}</p>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="demo-preview">
        <div class="demo-content">
          <p class="title-sub" style="color: white; -webkit-text-fill-color: white">Check what we can do</p>
          <p class="demo-desc">Watch how our platform streamlines classroom management, engagement, and assessment</p>
          <div class="demo-video-placeholder">
            <v-icon size="80" color="white">mdi-play-circle-outline</v-icon>
            <p>Interactive demo preview</p>
          </div>
        </div>
      </div>

      <div class="testimonials-section">
        <p class="title-sub">What educators say</p>
        <p class="testimonial-intro">Join thousands of satisfied educators transforming their classrooms</p>

        <v-carousel hide-delimiters cycle interval="5000" height="auto" class="testimonial-carousel">
          <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
            <v-card class="testimonial-card" elevation="0">
              <v-icon size="48" color="#FFD700">mdi-star</v-icon>
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <v-avatar size="60">
                  <v-img :src="testimonial.avatar" :alt="testimonial.name"></v-img>
                </v-avatar>
                <div>
                  <p class="author-name">{{ testimonial.name }}</p>
                  <p class="author-title">{{ testimonial.title }}</p>
                </div>
              </div>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="community-section">
        <div class="community-header">
          <p class="title-sub" style="color: white; -webkit-text-fill-color: white">Join our community</p>
          <p class="community-intro">Connect, share, and learn with educators worldwide</p>
        </div>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="forum-card">
                <v-icon size="40" color="#4A90E2">mdi-forum</v-icon>
                <h3>Discussion Forums</h3>
                <p>Engage in meaningful discussions with fellow educators, share best practices, and get expert advice
                </p>
                <v-chip-group>
                  <v-chip v-for="(chip, index) in chips" :key="index">
                    {{ chip }}
                  </v-chip>
                </v-chip-group>
                <v-btn variant="outlined" color="#4A90E2" class="forum-btn">Join the conversation</v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="forum-card">
                <v-icon size="40" color="#50E3C2">mdi-account-group</v-icon>
                <h3>Resource Library</h3>
                <p>Access thousands of lesson plans, templates, and teaching resources shared by the community</p>
                <div class="resource-stats">
                  <div class="resource-stat">
                    <span class="resource-number">5,000+</span>
                    <span>Lesson Plans</span>
                  </div>
                  <div class="resource-stat">
                    <span class="resource-number">2,500+</span>
                    <span>Video Tutorials</span>
                  </div>
                </div>
                <v-btn variant="outlined" color="#50E3C2" class="forum-btn">Explore resources</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>



      <!-- Integration Section -->
      <div class="integration-section">
        <p class="title-sub">Seamless Integrations</p>
        <p class="integration-intro">Connect with the tools you already love</p>
        <div class="integration-logos">
          <div v-for="(integration, index) in integrations" :key="index" class="integration-item">
            <v-icon size="48">{{ integration.icon }}</v-icon>
            <span>{{ integration.name }}</span>
          </div>
        </div>
      </div>

      <div class="pricing-preview">
        <p class="title-sub">With simple, transparent pricing</p>
        <p class="pricing-intro">Choose the perfect plan for your institution</p>
        <v-btn to="/pricing" variant="flat" class="pricing-btn">Get Started</v-btn>
      </div>

      <div class="blog-section">
        <p class="title-sub">Latest from Edunity Blog</p>
        <p class="blog-intro">Insights, tips, and news for modern educators</p>
        <v-row>
          <v-col v-for="(post, index) in blogPosts" :key="index" cols="12" md="4">
            <v-card class="blog-card">
              <v-img :src="post.image" height="200" cover></v-img>
              <v-card-item>
                <v-chip size="small" color="#4A90E2" text-color="white">{{ post.category }}</v-chip>
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt }}</p>
              </v-card-item>
              <v-card-actions>
                <v-btn variant="text" color="#4A90E2">Read more</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class="cta-card">
        <div class="cta-content">
          <p class="started-title">So, ready to transform your classroom?</p>
          <p class="cta-desc">Join thousands of educators already using Edunity to deliver exceptional learning
            experiences</p>
          <div class="cta-buttons">
            <v-btn to="/register" size="large" class="btn-register">
              Get started for free
            </v-btn>
            <v-btn variant="outlined" size="large" class="btn-demo">
              Request a demo
            </v-btn>
          </div>
          <p class="cta-note">No credit card required • Free 14-day trial • Cancel anytime</p>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HomeTemplate from "@/templates/HomeTemplate.vue";
import { setBrowserTitle } from "@/utils/web_util";
import { chips } from "./home.variables";

const features = [
  {
    icon: "mdi-play-circle",
    title: "Live Lessons",
    description:
      "Deliver real-time interactive classes or let students learn at their own pace.",
  },
  {
    icon: "mdi-account-group",
    title: "Classroom Collaboration",
    description:
      "Group projects, discussions, live polls, and team-based activities built-in.",
  },
  {
    icon: "mdi-view-dashboard-edit",
    title: "Custom Course Builder",
    description:
      "Drag-and-drop creator for lessons, quizzes, assignments, and multimedia content.",
  },
  {
    icon: "mdi-chart-line",
    title: "Real-Time Analytics",
    description:
      "Track engagement, mastery, and progress with detailed class and student reports.",
  },
  {
    icon: "mdi-translate",
    title: "Multilingual",
    description:
      "Supports 100+ languages with layout and accessibility standards.",
  },
  {
    icon: "mdi-devices",
    title: "Works Everywhere",
    description:
      "Fully responsive — phones, tablets, laptops, and interactive whiteboards.",
  },
];

const stats = [
  { value: "250K+", label: "Members" },
  { value: "8M+", label: "Active Students" },
  { value: "56", label: "Institutes" },
  { value: "150+", label: "Countries" },
];

const beneficiaries = [
  {
    icon: "mdi-school",
    title: "Primary & Secondary Schools",
    desc: "Engage young learners with gamified lessons, formative assessments, and parent progress sharing.",
  },
  {
    icon: "mdi-domain",
    title: "Universities & Colleges",
    desc: "Scale large lecture halls with live polling, automated grading, and integrated LMS tools.",
  },
  {
    icon: "mdi-home",
    title: "Homeschooling Families",
    desc: "Full curriculum support, progress tracking, and community-shared resources.",
  },
  {
    icon: "mdi-briefcase",
    title: "Professional Development",
    desc: "Teacher training academies and corporate learning programs love our intuitive platform.",
  },
];

const partners = [
  { name: "Vietnam National University", logo: "/assets/logos/vnu.png" },
];

const trustedBy = [
  { name: "UNESCO", logo: "/assets/logos/unesco.png" },
  { name: "Cambridge", logo: "/assets/logos/cambridge.png" },
  { name: "British Council", logo: "/assets/logos/british-council.png" },
  { name: "Ministry of Education Singapore", logo: "/assets/logos/sg-moe.png" },
  { name: "Khan Academy", logo: "/assets/logos/khan-academy.png" },
];

const solutions = [
  {
    icon: "mdi-chart-timeline-variant",
    title: "Learning Management System",
    description: "Complete LMS with course creation, assignment management, and gradebook",
  },
  {
    icon: "mdi-video-box",
    title: "Virtual Classroom",
    description: "HD video conferencing, breakout rooms, and interactive whiteboard",
  },
  {
    icon: "mdi-account-school",
    title: "Student Information System",
    description: "Centralized student data, attendance tracking, and parent portals",
  },
  {
    icon: "mdi-chart-box",
    title: "Analytics Dashboard",
    description: "Real-time insights into student performance and engagement metrics",
  },
  {
    icon: "mdi-security",
    title: "Security & Compliance",
    description: "GDPR compliant, data encryption, and regular security audits",
  },
  {
    icon: "mdi-robot",
    title: "AI-Powered Learning",
    description: "Personalized learning paths and automated recommendations",
  }
];

const testimonials = [
  {
    text: "Edunity has completely transformed how we teach. Our student engagement has increased by 40% since implementing the platform.",
    name: "Nguyen Thi Lan",
    title: "Principal, Hanoi International School",
    avatar: "https://ui-avatars.com/api/?name=John+Doe"
  },
  {
    text: "The analytics feature alone is worth it. We can now identify struggling students in real-time and provide immediate support.",
    name: "Tran Van Minh",
    title: "Head of IT, Saigon Academy",
    avatar: "https://ui-avatars.com/api/?name=John+Doe"
  },
  {
    text: "Our teachers love the intuitive interface and students enjoy the gamified learning experience. It's a win-win!",
    name: "Le Thi Huong",
    title: "Curriculum Director, Da Nang Education Center",
    avatar: "https://ui-avatars.com/api/?name=John+Doe"
  }
];

const integrations = [
  { name: "Microsoft Teams", icon: "mdi-microsoft-teams" },
  { name: "Zoom", icon: "mdi-video" },
  { name: "Slack", icon: "mdi-slack" },
  { name: "Canvas", icon: "mdi-view-dashboard" },
  { name: "Turnitin", icon: "mdi-check-decagram" }
];

const blogPosts = [
  {
    title: "10 Ways to Increase Student Engagement in Virtual Classrooms",
    excerpt: "Discover proven strategies to keep students motivated and engaged during online learning sessions.",
    category: "Teaching Tips",
    image: "/assets/blog/engagement.jpg"
  },
  {
    title: "The Future of Education: AI and Personalized Learning",
    excerpt: "How artificial intelligence is revolutionizing the way we teach and learn.",
    category: "EdTech Trends",
    image: "/assets/blog/ai-education.jpg"
  },
  {
    title: "Edunity's 2025 Roadmap: What's Coming Next",
    excerpt: "Get a sneak peek at the exciting new features we're developing for the upcoming year.",
    category: "Product Updates",
    image: "/assets/blog/roadmap.jpg"
  }
];

onMounted(() => {
  setBrowserTitle(null);
});
</script>

<style scoped lang="scss">
@use "./HomePage.scss" as *;
</style>
