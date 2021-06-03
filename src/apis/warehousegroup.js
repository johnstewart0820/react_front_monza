import API from "./API";


const WarehouseGroup = {
    getInfo: () => {
        return API
            .get(`/warehousegroup/info`)
            .then( res => res.data )
			.catch( error => error )
    },

    get: id => {
        return API
            .get(`/warehousegroup`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    },

    export: () => {
        return API
            .get(`/warehousegroup/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/warehousegroup`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: data => {
        return API
            .post(`/warehousegroup/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: ( sort_option, count, page, search_option ) => {
        return API
            .post(`/warehousegroup/filter_list`, {
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
            .put(`/warehousegroup`, { data, id })
            .then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/warehousegroup`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    }
}

export default WarehouseGroup;