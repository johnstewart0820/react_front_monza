import API from "./API";

const Assortment = {
    getInfo: () => {
        return API
            .get(`/assortment/info`)
            .then( res => res.data )
			.catch( error => error )
    },

    get: id => {
        return API
            .get(`/assortment`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    },

    export: id => {
        return API
            .get(`/assortment/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/assortment`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: data => {
        return API
            .post(`/assortment/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: (sort_option, count, page, search_option) => {
        return API
            .post(`/assortment/filter_list`, {
                sort_option: sort_option,
                count: count,
                page: page,
                search_option: search_option
            })
            .then( res => res.data )
			.catch( error => error )
    },

    update: ( data, id) => {
        return API
            .put(`/assortment`, {
                data: data,
                id: id
            })
            .then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/assortment`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    }
}

export default Assortment;