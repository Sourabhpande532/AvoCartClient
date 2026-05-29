export function useCategoryFilter(categories, globalSearch) {
  const filteredCategory = (categories || []).filter((category) =>
    (category?.name || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase()),
  );
  return { filteredCategory };
}