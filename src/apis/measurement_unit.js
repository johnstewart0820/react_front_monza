import API from "./API";

const MeasurementUnit = {
    getInfo: () => API.get(`/measurement_unit/info`),

    get: id => API.get(`/measurement_unit`, { params: { id }}),

    export: () => API.get(`/measurement_unit/export`),

    create: data => API.post(`/measurement_unit`, { data }),

    create_list: data => API.post(`/measurement_unit/list`, { data }),

    getListByOption: ( sort_option, count, page, search_option ) => 
		API.post(`/measurement_unit/filter_list`, {
			sort_option: sort_option,
			count: count,
			page: page,
			search_option: search_option
		}),

    update: ( data, id ) => API.put(`/measurement_unit`, { data, id }),

    delete: id => API.delete(`/measurement_unit`, { params: { id }})
}

export default MeasurementUnit;