export const createFilterSlice = (set) => ({
  filterStatus: "all",
  setFilterStatus: (filterStatus) =>
    set(() => ({ filterStatus: filterStatus }))
});
