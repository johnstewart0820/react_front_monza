import API from "./API";

const Warehouse = {
    
	get: id => API.get(`/warehouse`, { params: { id }}),

    export: () => API.get(`/warehouse/export`),

    create: data => API.post(`/warehouse`, { data }),

    create_list: data => API.post(`/warehouse/list`, { data }),

    getListByOption: ( sort_option, count, page, search_option ) => 
		API.post(`/warehouse/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id ) => API.put(`/warehouse`, { data , id }),

    delete: id => API.delete(`/warehouse`, { params: { id }})
}

export default Warehouse;