import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PATHS from "./paths";

import {
  Assortment as AssortmentView,
  AssortmentCreate as AssortmentCreateView,
  AssortmentEdit as AssortmentEditView,
  AssortmentGroup as AssortmentGroupView,
  AssortmentGroupCreate as AssortmentGroupCreateView,
  AssortmentGroupEdit as AssortmentGroupEditView,
  Warehouse as WarehouseView,
  WarehouseCreate as WarehouseCreateView,
  WarehouseEdit as WarehouseEditView,
  WarehouseGroup as WarehouseGroupView,
  WarehouseGroupCreate as WarehouseGroupCreateView,
  WarehouseGroupEdit as WarehouseGroupEditView,
  Contractor as ContractorView,
  ContractorCreate as ContractorCreateView,
  ContractorEdit as ContractorEditView,
  MeasureUnit as MeasureUnitView,
  MeasureUnitCreate as MeasureUnitCreateView,
  MeasureUnitEdit as MeasureUnitEditView,
  WarehouseOperation as WarehouseOperationView,
  WarehouseOperationCreate as WarehouseOperationCreateView,
  WarehouseOperationEdit as WarehouseOperationEditView,
  WarehouseOperationGenerateGraph as WarehouseOperationGenerateGraphView,
	WarehouseOperationGraph as WarehouseOperationGraphView,
  AnalizeXyz as AnalizeXyzView,
  AnalizeXyzCreate as AnalizeXyzCreateView,
  AnalizeXyzResult as AnalizeXyzResultView,
  Profile as ProfileView,
  SignIn as SignInView,
  Forgot as ForgotView,
  ResetPassword as ResetPasswordView,
  SignUp as SignUpView,
  ValidateUser as ValidateUserView,
  NotFound as NotFoundView,
  Orders as OrdersView
} from '../views';


const LOGGED_IN_ROUTES = [
	{
		component: AssortmentView,
		title: "Lista Asortymentów",
		path: PATHS.Assortment
	},
	{
		component: AssortmentCreateView,
		title: "Dodawanie/Edycja Asortymentu",
		path: PATHS.AssortmentCreate
	},
	{
		component: AssortmentEditView,
		title: "Dodawanie/Edycja Asortymentu",
		path: PATHS.AssortmentEdit()
	},
	{
		component: AssortmentGroupView,
		title: "Lista Grup Asortymentowych",
		path: PATHS.AssortmentGroup
	},
	{
		component: AssortmentGroupCreateView,
		title: "Dodawanie/Edycja Grupy Asortymentów",
		path: PATHS.AssortmentGroupCreate
	},
	{
		component: AssortmentGroupEditView,
		title: "Dodawanie/Edycja Grupy Asortymentów",
		path: PATHS.AssortmentGroupEdit()
	},
	{
		component: WarehouseView,
		title: "Lista Magazynów",
		path: PATHS.Warehouse
	},
	{
		component: WarehouseCreateView,
		title: "Dodawanie/Edycja magazynu",
        path: PATHS.WarehouseCreate
	},
	{
		component: WarehouseEditView,
        title: "Dodawanie/Edycja magazynu",
        path: PATHS.WarehouseEdit()
	},
	{
		component: WarehouseGroupView,
        title: "Lista Grup Magazynów",
        path: PATHS.WarehouseGroup
	},
	{
		component: WarehouseGroupCreateView,
        title:"Dodawanie/Edycja Grupy Magazynów",
        path: PATHS.WarehouseGroupCreate
	},
	{
		component: WarehouseGroupEditView,
        title: "Dodawanie/Edycja Grupy Magazynów",
        path: PATHS.WarehouseGroupEdit()
	},
	{
		component: ContractorView,
        title: "Lista Kontrahentów",
        path: PATHS.Contractor
	},
	{
		component: ContractorCreateView,
        title: "Dodawanie/Edycja Kontrahenta",
        path: "/contractor/create"
	},
	{
		component: ContractorEditView,
        title: "Dodawanie/Edycja Kontrahenta",
        path: PATHS.ContractorEdit()
	},
	{
		component: MeasureUnitView,
        title: "Lista Jednostek Miary",
        path: PATHS.MeasureUnit
	},
	{
		component: MeasureUnitCreateView,
        title: "Dodawanie/Edycja Jednostki Miary",
        path: PATHS.MeasureUnitCreate
	},
	{
		component: MeasureUnitEditView,
        title: "Dodawanie/Edycja Jednostki Miary",
        path: PATHS.MeasureUnitEdit()
	},
	{
		component: WarehouseOperationView,
        title: "Lista Operacji Magazynowych",
        path: PATHS.WarehouseOperation
	},
	{
		component: WarehouseOperationCreateView,
        title: "Dodawanie/Edycja operacji magazynowej",
        path: PATHS.WarehouseOperationCreate
	},
	{
		component: WarehouseOperationEditView,
        title: "Dodawanie/Edycja operacji magazynowej",
        path: PATHS.WarehouseOperationEdit()
	},
	{
		component: WarehouseOperationGenerateGraphView,
        title: "Generuj wykres",
        path: PATHS.WarehouseOperationGenerate 
	},
	{
		component: WarehouseOperationGraphView,
        title: "Generuj wykres",
        path: PATHS.WarehouseOperationGraph 
	},
	{
		component: OrdersView,
		title: "Lista Zamówień",
		path: PATHS.Orders	
	},
	{
		component: AnalizeXyzView,
        title: "Lista analiz ABC i XYZ",
        path: PATHS.AnalyzeXyz 
	},
	{
		component: AnalizeXyzCreateView,
        title: "Dodawanie analizy ABC i XYZ",
        path: PATHS.AnalyzeXyzCreate
	},
	{
		component: AnalizeXyzResultView,
        title:"Wyniki analizy",
        path: PATHS.AnalyzeXyzResult
	},
	{
		component: ProfileView,
        title: "Twój profil",
        path: PATHS.Profile
	}
];

const UNLOGGED_ROUTES = [
	{
		component: SignInView,
        title: "Zaloguj się",
        path: PATHS.Login
	},
	{
		component: ForgotView,
        title: "Odzyskaj hasło",
        path: PATHS.ForgotPassword 
	},
	{
		component: ResetPasswordView,
        title: "Zresetuj hasło",
        path: PATHS.ResetPassword
	},
	{
		component: SignUpView,
        title: "Zresetuj się",
        path: PATHS.Registration
	},
	{
		component: ValidateUserView,
        path: PATHS.Verification
	}
];


const getRoutes = arr => (
	arr.map( route => ( 
		<Route 
			exact
			key={ route.path }
			{...route}
		/> 
	))
)

export const getPageTitle = path => LOGGED_IN_ROUTES.find( page => page.path === path )?.title;

export const LoggedRoutes = () => (
	<Switch>
		<Redirect exact from="/" to={ PATHS.Assortment } />
		{ getRoutes( LOGGED_IN_ROUTES )}
		<Route component={ NotFoundView }/>
	</Switch>
)

export const UnLoggedRoutes = () => (
	<Switch>
		{ getRoutes( UNLOGGED_ROUTES )}
		<Redirect to={ PATHS.Login } />
	</Switch>
)


