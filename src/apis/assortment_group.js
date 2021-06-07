import API from "./API";

const AssortmentGroup = {

	getInfo: () => API.get(`/assortment_group/info`),

    get: id => API.get(`/assortment_group`, { params: { id }}),

    export: () => API.get(`/assortment_group/export`),

    create: data => API.post(`/assortment_group`, { data }),

    create_list: data => API.post(`/assortment_group/list`, { data }),

    getListByOption: (sort_option, count, page, search_option) => 
		API.post(`/assortment_group/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id ) => API.put(`/assortment_group`, { data, id }),

    delete: id => API.delete(`/assortment_group`, { params: { id }})
}

export default AssortmentGroup;