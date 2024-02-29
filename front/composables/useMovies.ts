import { useWindowScroll } from "@vueuse/core";
import { ref } from "vue";

import type { MovieData } from "~/types";

const fetching = ref(true);
const movies = ref<MovieData[]>([]);
const params = reactive({
  page: 1, // default pagination
  search: "",
});
const info = reactive({
  page: 1,
  total_pages: 0,
  total_results: 0,
});

const sortBy = ref<string>("popularity");
const sortDesc = ref(true);

export const useMovies = () => {
  const axios = useAxios();
  const { y } = useWindowScroll();
  const { localeProperties } = useI18n();

  const isOtherTarget = (target: string) => {
    return sortBy.value !== target;
  };

  const isSameTargetAndDesc = (target: string) => {
    return sortBy.value === target && sortDesc.value === true;
  };

  const sortIcon = (target: string) => {
    if (isOtherTarget(target)) return "";

    if (isSameTargetAndDesc(target)) return "pi pi-arrow-down";
    return "pi pi-arrow-up";
  };

  const fetchMovies = async () => {
    return await axios.get("/movies/", {
      params: {
        ...params,
        language: localeProperties.value.iso,
      },
    });
  };

  const toggleSort = (target: keyof MovieData) => {
    sortDesc.value = sortBy.value === target ? !sortDesc.value : true;

    movies.value.sort((a: MovieData, b: MovieData) => {
      const valueA = a[target];
      const valueB = b[target];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDesc.value
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDesc.value ? valueB - valueA : valueA - valueB;
      }
      return 0;
    });
    sortBy.value = target;
  };

  const searchMovies = async () => {
    fetching.value = true;
    sortBy.value = "popularity";
    sortDesc.value = true;

    const { data } = await fetchMovies();
    const { page, total_pages, total_results, results } = data;

    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;
  };

  onMounted(async () => {
    fetching.value = true;
    const { data } = await fetchMovies();
    const { total_pages, total_results, results } = data;

    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;
  });

  watch(y, async (scrolledHeight: number) => {
    if (fetching.value) return;
    if (info.page >= info.total_pages) return;

    const totalScrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollHeight - scrolledHeight <= 200) {
      info.page += 1;
      params.page = info.page;

      fetching.value = true;
      const { data } = await fetchMovies();
      const { page, total_pages, total_results, results } = data;
      info.page = page;
      info.total_pages = total_pages;
      info.total_results = total_results;
      movies.value = [...movies.value, ...results];
      fetching.value = false;
    }
  });

  return {
    info,
    fetching,
    movies,
    params,
    searchMovies,
    toggleSort,
    sortIcon,
    fetchMovies,
    isOtherTarget,
    isSameTargetAndDesc,
  };
};
