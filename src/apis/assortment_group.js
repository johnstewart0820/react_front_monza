import API from "./API";

const AssortmentGroup = {

	getInfo: () => {
        return API
            .get(`/assortment_group/info`)
            .then( res => res.data )
			.catch( error => error )
    },

    get: id => {
        return API
            .get(`/assortment_group`, { params: { id }})
            .then( res => res.data )
			.catch( error => error )
    },

    export: id => {
        return API
            .get(`/assortment_group/export`)
            .then( res => res.data )
			.catch( error => error )
    },

    create: data => {
        return API
            .post(`/assortment_group`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    create_list: data => {
        return API
            .post(`/assortment_group/list`, { data })
			.then( res => res.data )
			.catch( error => error )
    },

    getListByOption: (sort_option, count, page, search_option) => {
        return API
            .post(`/assortment_group/filter_list`, {
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
            .put(`/assortment_group`, { data, id })
			.then( res => res.data )
			.catch( error => error )
    },

    delete: id => {
        return API
            .delete(`/assortment_group`, { params: { id }})
			.then( res => res.data )
			.catch( error => error )
    }
}

export default AssortmentGroup;