export const useSettingsStore = defineStore("settings", () => {
  const talk = ref(false);
  const draw = ref(true);

  return { talk, draw };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
