import API from "./API";

const Assortment = {
    getInfo: () => API.get(`/assortment/info`),

    get: id => API.get(`/assortment`, { params: { id }}),

    export: () => API.get(`/assortment/export`),

    create: data => API.post(`/assortment`, { data }),

    create_list: data => API.post(`/assortment/list`, { data }),

    getListByOption: ( sort_option, count, page, search_option ) => 
		API.post(`/assortment/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id) => API.put(`/assortment`, { data, id }),

    delete: id => API.delete(`/assortment`, { params: { id }})
}

export default Assortment;