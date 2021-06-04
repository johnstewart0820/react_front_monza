const PATHS = {
	Assortment: "/assortment",
	AssortmentCreate: "/assortment/create",
	AssortmentEdit: ( id = ":id" ) => `/assortment/edit/${ id }`,
	AssortmentGroup: "/assortment-group",
	AssortmentGroupCreate: "/assortment-group/create",
	AssortmentGroupEdit: ( id = ":id" ) => `/assortment-group/edit/${ id }`,

	Warehouse: "/warehouse",
	WarehouseCreate: "/warehouse/create",
	WarehouseEdit: ( id = ":id") => `/warehouse/edit/${ id }`,
	WarehouseGroup: "/warehouse-group",
	WarehouseGroupCreate: "/warehouse-group/create",
	WarehouseGroupEdit: ( id = ":id" ) => `/warehouse-group/edit/${ id }`,

	Contractor: "/contractor",
	ContractorEdit: ( id = ":id" ) => `/contractor/edit/${ id }`,

	MeasureUnit: "/measure-unit",
	MeasureUnitCreate: "/measure-unit/create",
	MeasureUnitEdit: ( id = ":id" ) => `/measure-unit/edit/${ id }`,

	WarehouseOperation: "/warehouse-operation",
	WarehouseOperationCreate: "/warehouse-operation/create",
	WarehouseOperationEdit: ( id = ":id" ) => `/warehouse-operation/edit/${ id }`,
	WarehouseOperationGenerate: "/warehouse-operation/generate",

	AnalyzeXyz: "/analyze-xyz",
	AnalyzeXyzCreate: "/analyze-xyz/create",
	AnalyzeXyzResult: "/analyze-xyz/result",

	Profile: "/profile",

	Login: "/login",
	ForgotPassword: "/forgot-password",
	ResetPassword: "/reset-password",
	Registration: "/registration",
	Verification: "/verification",

	NotFound: "/not-found"
}

export default PATHS;