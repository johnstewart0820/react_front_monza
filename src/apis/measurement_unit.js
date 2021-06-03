import API from "./API";

const MeasurementUnit = {
    getInfo: () => {
        return API
            .get(`/measurement_unit/info`)
            .then( res => res.data )
			.catch( error => error )
    },

    get: id => {
        return API
            .get(`/measurement_unit`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    },

    export: (id) => {
        return API
            .get(`/measurement_unit/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/measurement_unit`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: data => {
        return API
            .post(`/measurement_unit/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: (sort_option, count, page, search_option) => {
        return API
            .post(`/measurement_unit/filter_list`, {
                sort_option: sort_option,
                count: count,
                page: page,
                search_option: search_option
            })
            .then( res => res.data )
			.catch( error => error )
    },

    update: (data, id) => {
        return API
            .put(`/measurement_unit`, { data, id })
            .then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/measurement_unit`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    }
}

export default MeasurementUnit;