<script setup>
import FtLogo from "~/assets/icons/42.svg";

const username = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");

const handleOnSubmit = async () => {

  const userInfo = {
    username:username.value,
    password:password.value,
    firstName:firstName.value,
    lastName:lastName.value,
    email:email.value,
  };

  // Maybe use axios and helper to implement for api call
  // This is a only test to see if db is correctly implemented in backend
  try {
    await fetch('http://localhost:5000/users', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userInfo })
    })
  } catch (e) {
    console.error(e);
  }


}
</script>

<template>
  <main
    class="flex min-h-[calc(100vh-64px)] justify-center bg-slate-900 px-4 pb-32 pt-[112px] lg:p-8 lg:pt-[112px]"
  >
    <div class="mt-10 flex w-full max-w-[450px] flex-col items-center gap-4">
      <h1 class="text-center text-2xl font-[800] md:text-4xl lg:mb-10">
        Welcome to Hypertube!
      </h1>
      <p class="text-center text-lg text-gray-400">
        Create an account to enjoy unlimited movies
      </p>

      <section class="mt-3">
        <div class="flex items-center justify-center gap-2">
          <SocialButton aria-label="42 login" class="h-[56px] w-[56px] !p-0">
            <FtLogo class="h-8 w-8" />
          </SocialButton>
          <SocialButton aria-label="Google login">
            <i class="pi pi-google text-[24px]"></i>
          </SocialButton>
          <SocialButton aria-label="Github login">
            <i class="pi pi-github text-[24px]"></i>
          </SocialButton>
        </div>
      </section>

      <div class="flex w-full items-center gap-3">
        <hr class="w-full border-[1px] border-white" />
        or
        <hr class="w-full border-[1px] border-white" />
      </div>

      <section class="flex w-full flex-col text-center">
        <form class="grid max-w-[450px] gap-3" @submit.prevent="handleOnSubmit">
          <BaseInput
            v-model="firstName"
            type="text"
            label="First name"
            autocomplete="given-name"
          />
          <BaseInput
            v-model="lastName"
            type="text"
            label="Last name"
            autocomplete="family-name"
          />
          <BaseInput
            v-model="email"
            type="email"
            label="Email"
            autocomplete="email"
            class="sm:col-span-2"
          />
          <BaseInput
            v-model="username"
            type="text"
            label="Username"
            autocomplete="username"
          />
          <BaseInput
            v-model="password"
            type="password"
            label="Password"
            autocomplete="current-password"
          />
          <Button class="mt-4 w-full sm:col-span-2" type="submit">Register</Button>
        </form>
      </section>
    </div>
  </main>
</template>
