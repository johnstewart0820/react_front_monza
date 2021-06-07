import API from "./API";


const WarehouseGroup = {
    getInfo: () => API.get(`/warehousegroup/info`),

    get: id => API.get(`/warehousegroup`, { params: { id }}),

    export: () => API.get(`/warehousegroup/export`),

    create: data => API.post(`/warehousegroup`, { data }),

    create_list: data => API.post(`/warehousegroup/list`, { data }),

    getListByOption: ( sort_option, count, page, search_option ) => 
		API.post(`/warehousegroup/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id ) => API.put(`/warehousegroup`, { data, id }),

    delete: id => API.delete(`/warehousegroup`, { params: { id }})
}

export default WarehouseGroup;