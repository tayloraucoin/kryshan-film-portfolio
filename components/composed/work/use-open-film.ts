import { useSyncExternalStore } from "react";
import {
  getOpenFilm,
  getServerOpenFilm,
  subscribeOpenFilm,
} from "@/components/composed/work/open-film";

/** The slug of the film open on this page, or null. */
export function useOpenFilm(): string | null {
  return useSyncExternalStore(
    subscribeOpenFilm,
    getOpenFilm,
    getServerOpenFilm,
  );
}
