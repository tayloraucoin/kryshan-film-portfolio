import { useSyncExternalStore } from "react";
import {
  getOpenFilm,
  getServerOpenFilm,
  subscribeOpenFilm,
} from "@/review/mocks/_components/home-d/open-film";

/** The slug of the film open on Demo D's page, or null. */
export function useOpenFilm(): string | null {
  return useSyncExternalStore(
    subscribeOpenFilm,
    getOpenFilm,
    getServerOpenFilm,
  );
}
