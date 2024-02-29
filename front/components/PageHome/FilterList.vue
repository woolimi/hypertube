<script setup lang="ts">
import type { DropdownOption } from "~/types";
import { Genre, getVoteAverages, getYears } from "~/types";

const { localeProperties, t } = useI18n();
const { filter } = useMovies();
const lang = localeProperties.value.iso;

const genreOptions: DropdownOption[] = Object.entries(Genre).map(
  ([key, value]) => ({
    label: value[lang as keyof typeof value],
    value: Number(key),
  }),
);

const releaseDateOption: DropdownOption[] = getYears().map((year) => ({
  label: year,
  value: year,
}));

const voteAverageOption: DropdownOption[] = getVoteAverages().map((vote) => ({
  label: `${t("_Global.greaterThan")} ${vote}.0`,
  value: vote,
}));
</script>

<template>
  <div class="mb-5 flex flex-wrap gap-5 sm:flex-nowrap lg:justify-end">
    <Dropdown
      v-model="filter.genre"
      filter
      :options="genreOptions"
      option-label="label"
      option-value="value"
      placeholder="Genre"
      reset-filter-on-clear
      show-clear
      clear-icon="pi pi-times"
    />
    <Dropdown
      v-model="filter.release_date"
      filter
      :options="releaseDateOption"
      option-label="label"
      option-value="value"
      :placeholder="$t('Sort.release_date')"
      reset-filter-on-clear
      show-clear
      clear-icon="pi pi-times"
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
    />
  </div>
</template>
