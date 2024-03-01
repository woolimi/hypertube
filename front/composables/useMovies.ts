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

const filter = reactive({
  genre: null,
  release_date: null,
  vote_average: null,
});

export const useMovies = () => {
  const axios = useAxios();
  const { y } = useWindowScroll();
  const { localeProperties } = useI18n();

  /**
   * verify if each filter is triggered(multiple filtering is possible)
   */
  const filteredMovies = computed(() =>
    movies.value.filter(
      (movie) =>
        (filter.genre === null ||
          Object.values(movie.genres).find(
            (genre) => genre.id === filter.genre,
          )) &&
        (filter.release_date === null ||
          movie.release_date.includes(filter.release_date)) &&
        (filter.vote_average === null ||
          movie.vote_average > filter.vote_average),
    ),
  );

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

  /**
   * This function will be called when filteredMovies has less than 20 movies info
   */
  const infinitySearch = async () => {
    while (
      params.search.length &&
      filteredMovies.value.length < 20 &&
      params.page < info.total_pages
    ) {
      await loadMoreMovies();
    }
  };

  const searchMovies = async () => {
    fetching.value = true;
    sortBy.value = "popularity";
    sortDesc.value = true;
    params.page = 1;

    const { data } = await fetchMovies();
    const { page, total_pages, total_results, results } = data;

    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;

    infinitySearch();
  };

  const isNotLoadable = () => {
    return (
      !params.search.length || fetching.value || params.page >= info.total_pages
    );
  };

  const loadMoreMovies = async () => {
    params.page = info.page + 1;
    fetching.value = true;
    const { data } = await fetchMovies();
    const { page, total_pages, total_results, results } = data;
    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = [...movies.value, ...results];
    fetching.value = false;
  };

  const wheelEventListener = async () => {
    if (isNotLoadable()) return;
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      await loadMoreMovies();
    }
  };

  onMounted(async () => {
    fetching.value = true;
    const { data } = await fetchMovies();
    const { total_pages, total_results, results } = data;

    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;

    window.addEventListener("wheel", wheelEventListener);
  });

  onBeforeUnmount(() => {
    if (wheelEventListener) {
      window.removeEventListener("wheel", wheelEventListener);
    }
  });

  watch(y, async (scrolledHeight: number) => {
    if (isNotLoadable()) return;
    const totalScrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    console.log("here", params.page);
    if (totalScrollHeight - scrolledHeight <= 200) {
      await loadMoreMovies();
    }
  });

  return {
    filteredMovies,
    info,
    fetching,
    movies,
    params,
    filter,
    searchMovies,
    toggleSort,
    sortIcon,
    fetchMovies,
    isOtherTarget,
    isSameTargetAndDesc,
    infinitySearch,
  };
};
