<template>
  <section>
    <div class="mx-auto max-w-[1280px]" :class="$style.heroWrapper">
      <div
        :class="$style.hero"
        class="flex h-[400px] flex-col items-center justify-center"
      >
        <h1 class="mb-10 max-w-[600px] pt-[100px] text-5xl">
          <p><span class="text-primary-400">Unlimited</span> movies</p>
          <p><span class="text-primary-400">Watch</span> anywhere</p>
        </h1>

        <div class="max-w-[600px]">
          <InputGroup class="flex">
            <InputText placeholder="Type here..." class="w-full" />
            <Button label="Search" />
          </InputGroup>
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
