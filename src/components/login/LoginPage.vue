<template>
  <v-container fluid class="login-screen">
    <v-container max-width="600">
      <div class="login-box">
        <div class="text-center mb-6">
          <RouterLink to="/" class="logo-link">
            <img :src="logo" class="logo" />
            <span class="logo-text">Edunity</span>
          </RouterLink>

          <p class="desc">
            {{ isLoggedIn
              ? "You are already logged in"
              : "Sign in to your account to continue" }}
          </p>
        </div>

        <template v-if="!isLoggedIn">
          <form class="login-form" @submit.prevent="handleSubmit">
            <v-text-field
              label="Email"
              type="email"
              v-model="email"
              required
              variant="outlined"
            />

            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              required
              variant="outlined"
            />

            <p v-if="error" class="error-text">{{ error }}</p>

            <div class="form-options">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                density="compact"
              />

              <RouterLink to="/forgot-password" class="forgot-link">
                Forgot password?
              </RouterLink>
            </div>

            <v-btn type="submit" block class="submit-button">
              Sign in
            </v-btn>
          </form>

          <v-divider class="divider">Or continue with</v-divider>

          <div class="social-buttons">
            <v-btn variant="outlined" block disabled>
              Google Sign-In (coming soon)
            </v-btn>
          </div>

          <p class="register-text text-center">
            Don't have an account?
            <RouterLink to="/register" class="register-link">
              Sign up
            </RouterLink>
          </p>

          <p class="disclaimer">
            By signing up, you agree to our
            <RouterLink to="/terms" class="link">Terms</RouterLink>
            and
            <RouterLink to="/privacy" class="link">Privacy Policy</RouterLink>.
          </p>
        </template>

        <template v-else>
          <div class="logged-in-container">
            <div class="already-logged">
              <v-btn block class="btn-submit" @click="router.back()">
                <v-icon icon="mdi-arrow-left" />
                Back
              </v-btn>

              <v-btn block variant="outlined" class="btn-home" @click="router.push('/')">
                <v-icon icon="mdi-home" />
                Home
              </v-btn>
            </div>

            <p>- or -</p>

            <v-btn block class="btn-logout" @click="handleLogout">
              Log out
            </v-btn>
          </div>
        </template>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.webp";

import { aPost } from "@/api/axiosService";
import { setBrowserTitle } from "@/utils/web_util";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
});

const { isLoggedIn, setToken, setAllowRememberMe, clearAuth } = auth;

function showToast(message: string, color = "success") {
  snackbar.value = { show: true, message, color };
}

async function handleSubmit() {
  error.value = "";

  try {
    const res = await aPost("/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (res.status === 200) {
      setToken(res.data.token);
      setAllowRememberMe(rememberMe.value);
      showToast("Welcome back!");
      router.push("/portal");
    } else {
      error.value = res.message;
      showToast(res.message, "error");
    }
  } catch {
    error.value = "Invalid credentials. Please check your email or password.";
    showToast("An unexpected error occurred", "error");
  }
}

function handleLogout() {
  clearAuth();
  router.push("/");
}

onMounted(() => {
  setBrowserTitle("Login");
});
</script>

<style lang="scss" scoped>
@use "./LoginPage.scss" as *;
</style>
