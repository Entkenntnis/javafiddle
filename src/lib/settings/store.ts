import { browser } from "$app/environment";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
import { writable, derived } from "svelte/store"

export type Theme = "system" | "light" | "dark";
export const theme = persist(writable<Theme>("system"), createLocalStorage(), "theme");

export const effectiveTheme = derived(theme, ($theme) => {
	if ($theme === "system") {
		return (browser && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
	}
	return $theme;
});

export const autoRun = writable<boolean>(true);
