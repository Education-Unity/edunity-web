<template>
  <v-container fluid class="register-screen">
    <v-container max-width="600">
      <div class="register-box">
        <div class="text-center mb-6">
          <RouterLink to="/" class="logo-link">
            <img :src="logo" class="logo" />
            <span class="logo-text">Edunity</span>
          </RouterLink>

          <p class="desc">Create your account</p>
        </div>

        <form class="register-form" @submit.prevent="handleSubmit">
          <v-text-field
            label="Username"
            v-model="form.username"
            required
            variant="outlined"
          />

          <div class="name-fields">
            <v-text-field
              label="First Name"
              v-model="form.firstName"
              required
              variant="outlined"
            />
            <v-text-field
              label="Last Name"
              v-model="form.lastName"
              required
              variant="outlined"
            />
          </div>

          <v-text-field
            label="Email"
            type="email"
            v-model="form.email"
            required
            variant="outlined"
            prepend-inner-icon="mdi-email"
          />

          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            required
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            hint="At least 8 characters"
            persistent-hint
          />

          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
          >
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                label="Birth Date"
                v-model="birthDateFormatted"
                required
                readonly
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
              />
            </template>

            <v-date-picker
              v-model="birthDate"
              :max="maxBirthDate"
              @update:model-value="dateMenu = false"
            />
          </v-menu>

          <v-autocomplete
            label="Country (Optional)"
            v-model="country"
            :items="countries"
            item-title="label"
            item-value="value"
            variant="outlined"
            clearable
          />

          <vue-tel-input
            v-model="phone"
            mode="international"
            default-country="VN"
            class="phone-input"
          />

          <v-btn
            type="submit"
            block
            class="submit-button"
            :loading="loading"
            :disabled="!birthDate"
          >
            Create Account
          </v-btn>
        </form>

        <v-divider class="divider">Or continue with</v-divider>

        <div class="social-buttons">
          <v-btn variant="outlined" block disabled>
            Google Sign-Up (coming soon)
          </v-btn>
        </div>

        <p class="login-text text-center">
          Already have an account?
          <RouterLink to="/login" class="login-link">
            Sign in
          </RouterLink>
        </p>

        <p class="disclaimer">
          By signing up, you agree to our
          <RouterLink to="/terms" class="link">Terms</RouterLink>
          and
          <RouterLink to="/privacy" class="link">Privacy Policy</RouterLink>.
        </p>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import logo from "@/assets/logo.webp"
import { aPost } from "@/api/axiosService"
import { setBrowserTitle } from "@/utils/web_util"
import countryList from "country-list"
import { VueTelInput } from "vue-tel-input"
import "vue-tel-input/vue-tel-input.css"

const router = useRouter()

const form = ref({
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
})

const showPassword = ref(false)
const loading = ref(false)
const phone = ref("")
const country = ref<string | null>(null)
const birthDate = ref<string | null>(null)
const dateMenu = ref(false)

const snackbar = ref({
  show: false,
  message: "",
  color: "success",
})

const countries = countryList.getData()

const maxBirthDate = computed(() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 13)
  return d.toISOString().split("T")[0]
})

const birthDateFormatted = computed(() => birthDate.value || "")

async function handleSubmit() {
  loading.value = true

  try {
    const res = await aPost("/auth/register", {
      ...form.value,
      phoneNumber: phone.value || undefined,
      countryCode: country.value || undefined,
      birthDate: birthDate.value,
    })

    if (res.status === 201) {
      snackbar.value = { show: true, message: res.data.message, color: "success" }
      router.push("/login")
    } else {
      snackbar.value = { show: true, message: res.data.message, color: "error" }
    }
  } catch {
    snackbar.value = {
      show: true,
      message: "Registration failed. Please try again.",
      color: "error",
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  setBrowserTitle("Register")
})
</script>

<style lang="scss" scoped>
@use "./RegisterPage.scss" as *;
</style>
