<script setup lang="ts">
const { searchMovies, params } = useMovies();
</script>

<template>
  <section>
    <div class="mx-auto max-w-[1280px]" :class="$style.heroWrapper">
      <div
        :class="$style.hero"
        class="flex h-[400px] flex-col items-center justify-center"
      >
        <div class="max-w-[600px]">
          <h1 class="mb-10 px-2 pt-[100px] text-center text-4xl sm:text-5xl">
            <p v-html="$t('Home.Jumbotron.title1')"></p>
            <p v-html="$t('Home.Jumbotron.title2')"></p>
          </h1>

          <form @submit.prevent="searchMovies">
            <InputGroup class="flex">
              <InputText
                v-model="params.search"
                :placeholder="$t('Home.Search.placeholder')"
                class="w-full"
              />
              <Button type="submit" :label="$t('Home.Search.label')" />
            </InputGroup>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" module>
.heroWrapper {
  position: relative;

  &::before {
    @apply bg-gradient-to-r from-black to-transparent;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    width: 5px;
    height: 100%;
    content: "";
  }

  &::after {
    @apply bg-gradient-to-l from-black to-transparent;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    width: 5px;
    height: 100%;
    content: "";
  }
}

.hero {
  background-image: url("~/assets/images/hero.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
