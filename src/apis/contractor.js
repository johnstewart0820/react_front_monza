import API from "./API";

const Contractor = {
    getInfo: () => API.get(`/contractor/info`),

    get: id => API.get(`/contractor`, { params: { id }}),

    export: () => API.get(`/contractor/export`),

    create: data => API.post(`/contractor`, { data }),

    create_list: data => API.post(`/contractor/list`, { data }),

    getListByOption: ( sort_option, count, page, search_option ) => 
		API.post(`/contractor/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id ) => API.put(`/contractor`, { data, id }),

    delete: id => API.delete(`/contractor`, { params: { id }})
}

export default Contractor;