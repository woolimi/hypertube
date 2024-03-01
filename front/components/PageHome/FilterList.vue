<script setup lang="ts">
import type { DropdownOption } from "~/types";
import { GENRE, range } from "~/utils";

const { localeProperties, t } = useI18n();
const { filter, infinitySearch } = useMovies();
const lang = localeProperties.value.iso;

const genreOptions: DropdownOption[] = Object.entries(GENRE).map(
  ([key, value]) => ({
    label: value[lang as keyof typeof value],
    value: Number(key),
  }),
);

const releaseDateOption: DropdownOption[] = range(
  1950,
  new Date().getUTCFullYear() + 1,
  true,
).map((year: number) => ({
  label: year.toString(),
  value: year.toString(),
}));

const voteAverageOption: DropdownOption[] = range(1, 10, true).map(
  (vote: number) => ({
    label: `${t("_Global.greaterThan")} ${vote}.0`,
    value: vote,
  }),
);
</script>

<template>
  <div class="mb-5 flex flex-wrap gap-5 sm:flex-nowrap lg:justify-end">
    <Dropdown
      v-model="filter.genre"
      filter
      :options="genreOptions"
      option-label="label"
      option-value="value"
      :placeholder="$t('_Global.genre')"
      reset-filter-on-clear
      show-clear
      clear-icon="pi pi-times"
      @change="infinitySearch"
    />
    <Dropdown
      v-model="filter.release_date"
      filter
      :options="releaseDateOption"
      option-label="label"
      option-value="value"
      :placeholder="$t('_Global.year')"
      reset-filter-on-clear
      show-clear
      clear-icon="pi pi-times"
      @change="infinitySearch"
    />
    <Dropdown
      v-model="filter.vote_average"
      filter
      :options="voteAverageOption"
      option-label="label"
      option-value="value"
      :placeholder="$t('Sort.vote_average')"
      reset-filter-on-clear
      show-clear
      clear-icon="pi pi-times"
      @change="infinitySearch"
    />
  </div>
</template>
~/utils
