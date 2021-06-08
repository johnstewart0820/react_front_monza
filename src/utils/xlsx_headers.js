const assortment_header = [
  {
    header: 'Nazwa',
    attr: 'name' 
  }, {
    header: 'Indeks',
    attr: 'index',
  }, {
    header: 'GTIN',
    attr: 'gtin' 
  }, {
    header: 'Jednostka miary',
    attr: 'measure_unit_name' 
  }, {
    header: 'Jednostka logistyczna',
    attr: 'logistic_unit_name'
  }, {
    header: 'Cena zakupu [PLN]',
    attr: 'purchase_price',
    type: 'number',
  }, {
    header: 'Cena sprzedaży [PLN]',
    attr: 'sale_price' ,
    type: 'number',
  }, {
    header: 'Grupa asortymentowa',
    attr: 'assortment_group_name' 
  }, {
    header: 'Prawdopodobieństwo \nObsługi popytu [%]',
    attr: 'service_demand' ,
    type: 'number',
  }, {
    header: 'Czas cyklu \nUzupełniania [dnia]',
    attr: 'refill_cycle_time' ,
    type: 'number',
  }, {
    header: 'Odchylenia czasu \nCyklu uzupełnienia [dni]',
    attr: 'cycle_time_deviations' ,
    type: 'number',
  }, {
    header: 'Współczynnik kosztu \nUtrzymania zapasu [-]',
    attr: 'inventory_cost_factor' ,
    type: 'number',
  }, {
    header: 'Aktywny',
    attr: 'active',
    type: 'bool', 
  }, {
    header: 'Dostawca',
    attr: 'supplier' ,
  }, {
    header: 'Odbiorca',
    attr: 'recipient' ,
  },
];

const assortment_group_header = [
  {
    header: 'Nazwa grupy',
    attr: 'name' 
  }, {
    header: 'Grupa główna',
    attr: 'is_main_group' ,
    type: 'bool'
  }, {
    header: 'Nazwa grupy głównej',
    attr: 'main_group_name' 
  }, {
    header: 'Kod',
    attr: 'code' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }
];

const warehouse_header = [
  {
    header: 'Nazwa magazynu',
    attr: 'name' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Aktywny',
    attr: 'active' ,
    type: 'bool'
  }
];

const warehouse_group_header = [
  {
    header: 'Nazwa grupy',
    attr: 'name' 
  }, {
    header: 'Przynależne magazyny',
    attr: 'warehouses' 
  }, {
    header: 'Aktywny',
    attr: 'active' ,
    type: 'bool'
  }, {
    header: 'Opis',
    attr: 'description' 
  },
];

const contractor_header = [
  {
    header: 'Kod',
    attr: 'code' 
  }, {
    header: 'Nazwa',
    attr: 'name' 
  }, {
    header: 'GLN',
    attr: 'GLN' 
  }, {
    header: 'Ulica',
    attr: 'address' 
  }, {
    header: 'Kod pocztowy',
    attr: 'postal_code' 
  }, {
    header: 'Miasto',
    attr: 'city' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Minimalna wielkość zamówienia',
    attr: 'minimum_order_quantity' ,
    type: 'number'
  }, {
    header: 'Minimalna wartość zamówienia [PLN]',
    attr: 'minimum_order_value' ,
    type: 'number'
  }, {
    header: 'Dostawca',
    attr: 'supplier' ,
    type: 'bool'
  }, {
    header: 'Odbiorca',
    attr: 'recipient' ,
    type: 'bool'
  }, {
    header: 'Aktywny',
    attr: 'active',
    type: 'bool' 
  }, {
    header: 'Dostawca pokrywa koszty transportu',
    attr: 'supplier_transport' ,
    type: 'bool'
  }
];

const measure_unit_header = [
  {
    header: 'Jednostka',
    attr: 'type_name'
  },
  {
    header: 'Nazwa',
    attr: 'name'
  }, {
    header: 'Opis',
    attr: 'description'
  }
];

const warehouse_operation_header = [
  {
    header: 'Nazwa asortymentu',
    attr: 'assortment_name'
  }, {
    header: 'Grupa',
    attr: 'assortment_group_name'
  }, {
    header: 'Data',
    attr: 'date'
  }, {
    header: 'Jednostka miary',
    attr: 'measure_unit_name'
  }, {
    header: 'Jednostka logistyczna',
    attr: 'logistic_unit_name',
  }, {
    header: 'Magazyn',
    attr: 'warehouse_name'
  }, {
    header: 'Wielkość przyjęć',
    attr: 'received',
    type: 'number'
  }, {
    header: 'Liczba przyjęć [-]',
    attr: 'received_number',
    type: 'number'
  }, {
    header: 'Wartość przyjęć [PLN]',
    attr: 'received_value',
    type: 'calculate',
    first: 'received',
    second: 'purchase_price'
  }, {
    header: 'Koszt obsługi I dostawy',
    attr: 'handling_delivery_cost',
    type: 'number'
  }, {
    header: 'Wielkość wydań',
    attr: 'release',
    type: 'number'
  }, {
    header: 'Liczba wydań [-]',
    attr: 'release_number',
    type: 'number'
  }, {
    header: 'Wartość wydań [PLN]',
    attr: 'release_value',
    type: 'calculate',
    first: 'release',
    second: 'sale_price'
  }, {
    header: 'Zapas [jednostka miary]',
    attr: 'stock',
    type: 'number'
  }, {
    header: 'Wartość zapasu [PLN]',
    attr: 'stock_pln',
    type: 'calculate',
    first: 'stock',
    second: 'purchase_price'
  }, {
    header: 'Wielkość zamówienia [jednostka miary]',
    attr: 'order',
    type: 'number',
  }, {
    header: 'Wartość Zamówienia [PLN]',
    attr: 'order_pln',
    type: 'calculate',
    first: 'order',
    second: 'sale_price'
  }
];

export {
  assortment_header,
  assortment_group_header,
  warehouse_header,
  warehouse_group_header,
  contractor_header,
  measure_unit_header,
  warehouse_operation_header
}