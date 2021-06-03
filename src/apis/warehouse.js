import API from "./API";

const Warehouse = {
    
	get: id => {
        return API
            .get(`/warehouse`, { params: { id }})
			.then( res => res.data )
			.catch( error => error )
    },

    export: () => {
        return API
            .get(`/warehouse/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/warehouse`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: data => {
        return API
            .post(`/warehouse/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: ( sort_option, count, page, search_option ) => {
        return API
            .post(`/warehouse/filter_list`, {
                sort_option: sort_option,
                count: count,
                page: page,
                search_option: search_option
            })
            .then( res => res.data )
			.catch( error => error )
    },

    update: ( data, id ) => {
        return API
            .put(`/warehouse`, { data , id })
            .then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/warehouse`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    }
}

export default Warehouse;