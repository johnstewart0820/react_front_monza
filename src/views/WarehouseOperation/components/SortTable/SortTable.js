import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  Card,
  TextareaAutosize,
  Typography,
  Grid
} from '@material-ui/core';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { pl } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DeleteModal, SingleSelect } from 'components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import main from 'utils/main';
import dateUtil from 'utils/moment';

const SortTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { rows, sortOption, requestSort, searchOption, setSearchOption, handleDelete, handleChange, listInfo } = props;
  const global_classes = useGlobalStyles();

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleSelectedItem = (id) => {
    setSelectedItem(id);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handlePreview = (indx_main) => {
    let _rows = JSON.parse(JSON.stringify(rows));

    _rows[indx_main].preview = !_rows[indx_main].preview;
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push(`/warehouse_operation/edit/${id}`)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 0}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(0)}
                >
                  ID
              </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 1}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(1)}
                >
                  Data
            </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 2}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(2)}
                >
                  Nazwa asortymentu
            </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 3}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(3)}
                >
                  Grupa
            </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 4}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(4)}
                >
                  <div>
                    <div>
                      Jednostka
                  </div>
                    <div>
                      miary
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 5}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(5)}
                >
                  <div>
                    <div>
                      Jednostka
                  </div>
                    <div>
                      logistyczna
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 6}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(6)}
                >
                  Magazyn
              </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 7}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(7)}
                >
                  <div>
                    <div>
                      Wielkść
                  </div>
                    <div>
                      przyjęć
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 8}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(8)}
                >
                  <div>
                    <div>
                      Wielkść
                  </div>
                    <div>
                      wydań
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 9}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(9)}
                >
                  <div>
                    <div>
                      Wielkść
                  </div>
                    <div>
                      zamówień
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 10}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(10)}
                >
                  <div>
                    <div>
                      Koszt obsługi
                  </div>
                    <div>
                      i dostawy
                  </div>
                  </div>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortOption.sortBy === 11}
                  direction={sortOption.sortOrder}
                  onClick={() => requestSort(11)}
                >
                  Akcje
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
              <input className={global_classes.input_box} value={searchOption.id} onChange={(e) => setSearchOption({ ...searchOption, id: e.target.value })} />
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex' }}>
                  <KeyboardDatePicker
                    disableToolbar
                    className={global_classes.date_picker}
                    variant="inline"
                    format="dd.MM.yyyy"
                    margin="normal"
                    value={searchOption.start_date}
                    onChange={(value) => setSearchOption({ ...searchOption, start_date: value })}
                    style={{ marginRight: '10px' }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    className={global_classes.date_picker}
                    variant="inline"
                    format="dd.MM.yyyy"
                    margin="normal"
                    value={searchOption.end_date}
                    onChange={(value) => setSearchOption({ ...searchOption, end_date: value })}
                  />
                </div>
              </TableCell>
              <TableCell>
                <SingleSelect
                  value={searchOption.assortment}
                  handleChange={(value) => setSearchOption({ ...searchOption, assortment: value })}
                  list={listInfo.assortment}
                />
              </TableCell>
              <TableCell>
                <SingleSelect
                  value={searchOption.assortment_group}
                  handleChange={(value) => setSearchOption({ ...searchOption, assortment_group: value })}
                  list={listInfo.assortment_group}
                />
              </TableCell>
              <TableCell>
                <SingleSelect
                  value={searchOption.measure_unit}
                  handleChange={(value) => setSearchOption({ ...searchOption, measure_unit: value })}
                  list={listInfo.measure_unit}
                />
              </TableCell>
              <TableCell>
                <SingleSelect
                  value={searchOption.logistic_unit}
                  handleChange={(value) => setSearchOption({ ...searchOption, logistic_unit: value })}
                  list={listInfo.logistic_unit}
                />
              </TableCell>
              <TableCell>
                <SingleSelect
                  value={searchOption.warehouse}
                  handleChange={(value) => setSearchOption({ ...searchOption, warehouse: value })}
                  list={listInfo.warehouse}
                />
              </TableCell>
              <TableCell>
                <input className={global_classes.input_box} value={searchOption.receipt_value} onChange={(e) => setSearchOption({ ...searchOption, receipt_value: e.target.value })} />
              </TableCell>
              <TableCell>
                <input className={global_classes.input_box} value={searchOption.issue_amount} onChange={(e) => setSearchOption({ ...searchOption, issue_amount: e.target.value })} />
              </TableCell>
              <TableCell>
                <input className={global_classes.input_box} value={searchOption.order_quantity} onChange={(e) => setSearchOption({ ...searchOption, order_quantity: e.target.value })} />
              </TableCell>
              <TableCell>
                <input className={global_classes.input_box} value={searchOption.handling_delivery_cost} onChange={(e) => setSearchOption({ ...searchOption, handling_delivery_cost: e.target.value })} />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {rows.map((item, indx) => (
              <>
                <TableRow key={indx} className={global_classes.root}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{dateUtil.getStringFromDate(item.date)}</TableCell>
                  <TableCell>{item.assortment_name}</TableCell>
                  <TableCell>{item.assortment_group_name}</TableCell>
                  <TableCell>{item.measure_unit_name}</TableCell>
                  <TableCell>{item.logistic_unit_name}</TableCell>
                  <TableCell>{item.warehouse_name}</TableCell>
                  <TableCell>{item.received}</TableCell>
                  <TableCell>{item.release}</TableCell>
                  <TableCell>{item.order}</TableCell>
                  <TableCell>{item.handling_delivery_cost}</TableCell>
                  <TableCell>
                    <IconButton component="span" className={!item.preview ? global_classes.iconButton : global_classes.greenIconButton} onClick={() => handlePreview(indx)} >
                      <VisibilityIcon className={global_classes.icon} />
                    </IconButton>
                    <IconButton component="span" className={global_classes.iconButton} onClick={() => handleEditItem(item.id)}>
                      <EditOutlinedIcon className={global_classes.icon} />
                    </IconButton>
                    <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                      <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {item.preview &&
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Grid container spacing={2} justify="space-around" style={{ padding: '10px 50px' }}>
                        <Grid item xs={6}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Liczba przyjęć [-]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={item.received_number} className={global_classes.input_box} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Wartość przyjęć [PLN]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={
                                main.convertNumToStr(
                                  main.round(main.convertStrToNum(main.getAttrFromArray(listInfo.assortment, item.assortment, 'purchase_price', ''))
                                    * main.convertStrToNum(item.receipt),
                                    2))} className={global_classes.input_box} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Zapas [j.m.]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={item.stock} className={global_classes.input_box} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Wartość zapasu [PLN]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={
                                main.convertNumToStr(
                                  main.round(
                                    main.convertStrToNum(main.getAttrFromArray(listInfo.assortment, item.assortment, 'purchase_price', ''))
                                    * main.convertStrToNum(item.stock), 2))} className={global_classes.input_box} />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Liczba wydan [-] 
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={item.release_number} className={global_classes.input_box} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Wartość wydań [PLN]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={main.convertNumToStr(
                                main.round(
                                  main.convertStrToNum(main.getAttrFromArray(listInfo.assortment, item.assortment, 'sale_price', ''))
                                  * main.convertStrToNum(item.release)
                                  , 2))} className={global_classes.input_box} />
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6" style={{ marginBottom: 8 }}>
                                Wartość zamówienia [PLN]
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <input value={main.round(main.convertStrToNum(main.getAttrFromArray(listInfo.assortment, item.assortment, 'sale_price', ''))
                                * main.convertStrToNum(item.order), 2)} className={global_classes.input_box} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                }
              </>
            )
            )}

          </TableBody>
        </Table>
        <DeleteModal
          title="Czy na pewno chcesz usunąć tę operacje magazynowe?"
          openModal={openModal}
          handleClose={handleCloseModal}
          handleDelete={handleDelete}
          selectedIndex={selectedItem}
        />
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(SortTable);
