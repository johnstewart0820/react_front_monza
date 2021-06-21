import API from "./API";

const WarehouseOperation = {
  getInfo: () => API.get(`/warehouse_operation/info`),

  get: id => API.get(`/warehouse_operation`, { params: { id } }),

  export: () => API.get(`/warehouse_operation/export`),

  create: data => API.post(`/warehouse_operation`, { data }),

  create_list: data => API.post(`/warehouse_operation/list`, { data }),

  getListByOption: (sort_option, count, page, search_option) =>
    API.post(`/warehouse_operation/filter_list`, {
      sort_option: sort_option,
      count: count,
      page: page,
      search_option: search_option
    }),

  update: (data, id) => API.put(`/warehouse_operation`, { data, id }),

  delete: id => API.delete(`/warehouse_operation`, { params: { id } }),

  getChartData: (assortment, warehouse, date_from, date_to, value_quantity, duration) => API.post(`/warehouse_operation/chart_data`, {
    assortment: assortment,
    warehouse: warehouse,
    date_from: date_from,
    date_to: date_to,
    value_quantity: value_quantity,
    duration: duration
  }),
}

export default WarehouseOperation;