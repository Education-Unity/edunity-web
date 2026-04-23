<template>
  <HomeTemplate>
    <div class="contact-page">
      <div class="contact-container">
        <div class="contact-header">
          <h1 class="contact-title">Contact Us</h1>
          <p class="contact-subtitle">
            We're here to help you!
          </p>
        </div>

        <div class="contact-content">
          <div class="contact-form-section">
            <div class="form-card">
              <div v-if="submitted" class="success-message">
                <div class="success-icon">✓</div>
                <h3>Thank you!</h3>
                <p>Your message has been sent. We’ll get back to you soon.</p>
              </div>

              <form
                v-else
                class="contact-form"
                @submit.prevent="handleSubmit"
              >
                <div class="form-grid">
                  <div class="form-group">
                    <label for="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      v-model="formData.name"
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      v-model="formData.email"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    v-model="formData.category"
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Account</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    v-model="formData.subject"
                    required
                    placeholder="e.g. Cannot export quiz results"
                  />
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="8"
                    v-model="formData.message"
                    required
                    placeholder="Please describe your issue or idea in detail..."
                  />
                </div>

                <button
                  type="submit"
                  class="submit-btn"
                  :disabled="isSubmitting"
                  :class="{ loading: isSubmitting }"
                >
                  {{ isSubmitting ? "Sending..." : "Send Message" }}
                </button>
              </form>
            </div>
          </div>

          <div class="contact-info-section">
            <div class="info-card">
              <h2>Other ways to reach us:</h2>

              <div class="info-item">
                <strong>Email</strong>
                <a href="mailto:support@Edunity.com">
                  support@Edunity.com
                </a>
              </div>

              <div class="info-item">
                <strong>Community Forums</strong>
                <a href="/forums">
                  forums.Edunity.com
                </a>
              </div>

              <div class="info-item">
                <strong>Response Time</strong>
                <span>Usually within 24–48 hours</span>
              </div>
            </div>

            <div class="faq-card">
              <h3>To ensure your best support:</h3>
              <ul>
                <li>Bug reports with steps to reproduce get priority</li>
                <li>Feature requests are reviewed weekly by the team</li>
                <li>Include screenshots or video if possible</li>
                <li>We never share your email with third parties</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { ref } from "vue";
import HomeTemplate from "@/templates/HomeTemplate";

const formData = ref({
  name: "",
  email: "",
  category: "general",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  isSubmitting.value = false;
  submitted.value = true;
  setTimeout(() => {
    submitted.value = false;
  }, 5000);
};
</script>

<style lang="scss" src="./ContactPage.scss"></style>
