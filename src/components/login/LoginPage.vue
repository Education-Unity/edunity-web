<template>
  <v-container fluid class="login-screen">
    <v-container max-width="sm">
      <v-card elevation="6" class="login-box">
        <div class="text-center mb-4">
          <RouterLink to="/" class="logo-link">
            <img :src="logo" alt="Edunity Logo" class="logo" />
            <h2 class="logo-text">Edunity</h2>
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

            <p v-if="error" class="error-text">
              {{ error }}
            </p>

            <div class="form-options">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                color="primary"
              />

              <RouterLink to="/forgot-password" class="forgot-link">
                Forgot password?
              </RouterLink>
            </div>

            <v-btn
              type="submit"
              block
              class="submit-button"
            >
              Sign in
            </v-btn>
          </form>

          <v-divider class="divider">
            Or continue with
          </v-divider>

          <div class="social-buttons">
            <GoogleLogin
              @success="() => {}"
              @error="() => {}"
            />
          </div>

          <p class="register-text text-center">
            Don't have an account?
            <RouterLink to="/register" class="register-link">
              Sign up
            </RouterLink>
          </p>

          <p class="disclaimer">
            Note: By signing up, you acknowledge that you agree to our
            <RouterLink to="/terms" class="link">
              Terms of Service
            </RouterLink>
            and
            <RouterLink to="/privacy" class="link">
              Privacy Policy
            </RouterLink>.
          </p>
        </template>

        <template v-else>
          <div class="logged-in-container">
            <div class="already-logged">
              <v-btn
                block
                class="btn-submit"
                @click="router.back()"
              >
                <v-icon icon="mdi-arrow-left" />
                <span>Back</span>
              </v-btn>

              <v-btn
                block
                variant="outlined"
                class="btn-home"
                @click="router.push('/')"
              >
                <v-icon icon="mdi-home" />
                <span>Home</span>
              </v-btn>
            </div>

            <p>- or -</p>

            <v-btn
              block
              class="btn-logout"
              @click="handleLogout"
            >
              Log out
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

import logo from "../assets/logo.webp";
import { aPost } from "@/api/axiosService";
import { setBrowserTitle } from "@/utils/web_util";
import { sendErrorToast } from "@/utils/toast_util";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");

const { isLoggedIn, setToken, setAllowRememberMe, clearAuth } = auth;

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
      toast.success("Welcome back!");
      router.push("/portal");
    } else {
      error.value = res.message;
      sendErrorToast(res.message);
    }
  } catch {
    error.value = "Invalid credentials. Please check your email or password.";
    sendErrorToast("An unknown error occurred. Please try again.");
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
@use "@styles/common.scss" as *;

@import "./LoginPage.scss";
</style>
