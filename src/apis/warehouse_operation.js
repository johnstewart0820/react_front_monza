import API from "./API";

const WarehouseOperation = {
    getInfo: () => {
        return API
            .get(`/warehouse_operation/info`)
            .then( res => res.data )
			.catch( error => error )
    },

    get: id => {
        return API
            .get(`/warehouse_operation`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    },

    export: () => {
        return API
            .get(`/warehouse_operation/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/warehouse_operation`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: (data) => {
        return API
            .post(`/warehouse_operation/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: (sort_option, count, page, search_option) => {
        return API
            .post(`/warehouse_operation/filter_list`, {
                sort_option: sort_option,
                count: count,
                page: page,
                search_option: search_option
            })
            .then( res => res.data )
			.catch( error => error )
    },

    update: ( data, id )  => {
        return API
            .put(`/warehouse_operation`, { data, id })
            .then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/warehouse_operation`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    }
}

export default WarehouseOperation;