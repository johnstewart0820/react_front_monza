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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { DeleteModal, SingleSelect } from 'components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import PATHS from 'routes/paths';

const SortTable = (props) => {
  const classes = useStyles();
  const { history } = props;
  const { rows, sortOption, requestSort, searchOption, setSearchOption, handleDelete, handleChange } = props;
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

  const handleClick = (indx) => {
    let _rows = JSON.parse(JSON.stringify(rows));
    _rows[indx].opened = !_rows[indx].opened;
    handleChange(_rows);
  }

  const handleEditItem = (id) => {
    history.push( PATHS.AssortmentGroupEdit( id ))
  }

  return (
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
                Nazwa głównej grupy
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 2}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(2)}
              >
                Nazwa grupy asortymentowej
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 3}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(3)}
              >
                Opis
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortOption.sortBy === 4}
                direction={sortOption.sortOrder}
                onClick={() => requestSort(4)}
              >
                Kod
            </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel align="right">
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
              <input className={global_classes.input_box} value={searchOption.name} onChange={(e) => setSearchOption({ ...searchOption, name: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.sub_name} onChange={(e) => setSearchOption({ ...searchOption, sub_name: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.description} onChange={(e) => setSearchOption({ ...searchOption, description: e.target.value })} />
            </TableCell>
            <TableCell>
              <input className={global_classes.input_box} value={searchOption.code} onChange={(e) => setSearchOption({ ...searchOption, code: e.target.value })} />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((item, indx) => (
            <>
              <TableRow key={indx} className={global_classes.root}>
                <TableCell >{item.id}</TableCell>
                <TableCell onClick={() => handleClick(indx)}>
                  <div style={{ display: 'flex' }}>
                    {
                      item.opened
                        ?
                        item.sub_list.length > 0 && <RemoveIcon fontSize="small" className={classes.plus_minus_icon} />
                        :
                        item.sub_list.length > 0 && <AddIcon fontSize="small" className={classes.plus_minus_icon} />
                    }
                    {item.name}
                  </div>
                </TableCell>
                <TableCell ></TableCell>
                <TableCell >
                  {item.description}
                </TableCell>
                <TableCell >
                  {item.code}
                </TableCell>
                <TableCell>
                  <IconButton component="span" className={global_classes.iconButton} onClick={() => handleEditItem(item.id)}>
                    <EditOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                  <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                    <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                  </IconButton>
                </TableCell>
              </TableRow>
              {
                item.opened &&
                item.sub_list.map((sub_item, index) => (
                  <React.Fragment>
                    <TableRow key={indx} className={global_classes.root}>
                      <TableCell >{item.id}</TableCell>
                      <TableCell ></TableCell>
                      <TableCell >{sub_item.name}</TableCell>
                      <TableCell >
                        {sub_item.description}
                      </TableCell>
                      <TableCell >
                        {sub_item.code}
                      </TableCell>
                      <TableCell>
                        <IconButton component="span" className={global_classes.iconButton} onClick={() => handleEditItem(sub_item.id)}>
                          <EditOutlinedIcon className={global_classes.icon} />
                        </IconButton>
                        <IconButton variant="outlined" component="span" className={global_classes.iconButton} onClick={() => handleSelectedItem(item.id)}>
                          <DeleteOutlineOutlinedIcon className={global_classes.icon} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                  </React.Fragment>
                ))
              }
            </>
          )
          )}

        </TableBody>
      </Table>
      <DeleteModal
        title="Czy na pewno chcesz usunąć tę grupę asortymentowe?"
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Card>
  );
};

export default withRouter(SortTable);
