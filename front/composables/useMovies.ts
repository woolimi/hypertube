import { useWindowScroll } from "@vueuse/core";
import { ref } from "vue";

import type { MovieData } from "~/types";

export const useMovies = () => {
  const { y } = useWindowScroll();
  const axios = useAxios();
  const { localeProperties } = useI18n();

  const info = reactive({
    page: 1,
    total_pages: 0,
    total_results: 0,
  });

  const params = reactive({
    page: 1, // default pagination
    // TODO: choice one
    // sort_by: "popularity.desc", // default sort at backend to tmdb api
    sort_by: undefined,
    width_genres: undefined,
    with_keywords: undefined,
    with_origin_country: undefined,
  });

  const movies = ref<MovieData[]>([]);
  const fetching = ref(true);

  const isOtherTarget = (target: string) => {
    // TODO: choice one
    return !params.sort_by || !params.sort_by.includes(target);
    //return !params.sort_by.includes(target);
  };

  const isSameTargetAndDesc = (target: string) => {
    return params.sort_by.includes(target) && params.sort_by.includes("desc");
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

  const toggleSort = async (target: string) => {
    console.log(target, params.sort_by);
    params.page = 1;
    if (isOtherTarget(target)) params.sort_by = target + "." + "desc";
    else if (isSameTargetAndDesc(target))
      params.sort_by = params.sort_by.replace("desc", "asc");
    // TODO: choice one
    // else params.sort_by = "popularity.desc";
    else params.sort_by = undefined;

    fetching.value = true;
    const { data } = await fetchMovies();
    const { page, total_pages, total_results, results } = data;
    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;
  };

  const searchMovies = async (keyword: string, clear: CallableFunction) => {
    params.with_keywords = keyword;

    const { data } = await fetchMovies();
    const { page, total_pages, total_results, results } = data;
    info.page = page;
    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    fetching.value = false;
    clear();
    params.with_keywords = undefined;
  };

  onMounted(async () => {
    fetching.value = true;
    const { data } = await fetchMovies();
    const { total_pages, total_results, results } = data;

    info.total_pages = total_pages;
    info.total_results = total_results;
    movies.value = results;
    // console.log('onMounted', movies.value);
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
