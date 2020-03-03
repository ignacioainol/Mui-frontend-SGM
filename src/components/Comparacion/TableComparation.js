import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ModalValue from './ModalValue';
import SvgIcon from '@material-ui/core/SvgIcon';
import PositionedSnackbar from '../../utils/SnackBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Utilities from '../../helpers/utilities';
import ProgressLoad from '../../utils/ProgressLoad';

var diff = require('diff-lines');

function rowsEdit(e){
  let rows = e;
  return rows;
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'SYSTEM', numeric: false, disablePadding: true, label: 'Sistema' },
  { id: 'BD', numeric: true, disablePadding: false, label: 'Base Datos' },
  { id: 'SCHEMA', numeric: true, disablePadding: false, label: 'Esquemas' },
  { id: 'VALUE', numeric: true, disablePadding: false, label: 'Value' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, celdas } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          /> */}
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row._id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row._id}
              direction={order}
              onClick={createSortHandler(row._id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = theme => ({
  root: {

  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {

  },
  title: {
    flex: '0 0 auto',
  },
});

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              Objetos
          </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Comparar">
            <a onClick={props.handleClickOpenCompare}>
              
            </a>
          </Tooltip>
        ) : (
            <div></div>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%'
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function TableComparation(props) {
  const classes = useStyles();
  const data = props.celdas;
  const rows = rowsEdit(data);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('bd');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [state, setState] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [nameSelected, setnameSelected] = React.useState([{}]);
  const [comparacion, setComparacion] = React.useState(null);
  const [cargado, setCargado] = React.useState(false);
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.sistema);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    setComparacion(
      null
      );
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    var temp = false;
      console.log(selected.length);
      console.log(nameSelected);
    switch(selected.length){
      case 0:
          nameSelected[0] = name;
        break;

      case 1:
        if(nameSelected[0]){

          if(nameSelected[0]._id == name._id){
            nameSelected[0] = null;
            temp = true
          }

          if(nameSelected[1]){
            if(nameSelected[1]._id == name._id){
              nameSelected[1] = null;
            }
          }else{
            if(temp == false){
            nameSelected[1] = name;
            }
            temp = false;
          }

        }else{
          nameSelected[0] = name;
        }
         
        break;

      case 2:
        if(nameSelected[0]){
          if(nameSelected[0]._id == name._id){
            nameSelected[0] = null;
          }
        }

        if(nameSelected[1]){
          if(nameSelected[1]._id == name._id){
            nameSelected[1] = null;
          }
        }

        break;

      default:
          setnameSelected({});
  }  
    if(selected.length<=1){

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    }
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }else{
      setAlert({
              openSnackBar: true,
              showErrors: true,
              messageErrors: `No puedes seleccionar mas de dos casillas`,
              messageType: 'warning'
            })
      setnameSelected({});
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleCloseSnackBar() {
    setAlert({ openSnackBar: false, messageType: 'warning', showErrors: false, messageErrors: '' });
  }

  const editObject = (row) => event => {
    setCargado(true);
    setState(row);
    // setTimeout(function(){props.openDialog(), 2000});
    // setTimeout(function(){setCargado(false), 2000});
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const anteComparador = () => {
    setCargado(true);
    setTimeout(function(){Comparador()}, 2000);
    setTimeout(function(){setCargado(false)}, 2000);
  }

  const Comparador = () => {
    // console.log(nameSelected);
    setComparacion(
      null
      );

    if(nameSelected[0] && nameSelected[1]){
      let a = nameSelected[0].VALUE;
      let b = nameSelected[1].VALUE;
      setComparacion(
        diff(a, b)
        );
    }
  }
  return (
    <div className={classes.root}>
      <p>{cargado}</p>
      {cargado ?
      <ProgressLoad/>
      :null}
      <Grid container>
      <Grid item xs={6} style={{padding: '10px'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${row}`;
                
                return (
                  <TableRow
                    hover
                  onClick={event => handleClick(event, row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.SYSTEM}
                  selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </TableCell>
                    <TableCell component="th" padding="none">
                      {row.SYSTEM}
                    </TableCell>
                    <TableCell align="right">{row.BD}</TableCell>
                    <TableCell align="right">{row.SCHEMA}</TableCell>
                    <TableCell align="right">
                      <a onClick={editObject(row)}>
                        <IconButton >
                          <SvgIcon>
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </SvgIcon>
                        </IconButton>
                      </a>
                    </TableCell>
                  </TableRow>
                );
                
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <br/>
        <Button variant="contained" color="primary" onClick={anteComparador} href={'#'}>
        Comparar
      </Button>
        <TablePagination
          //rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
      
      <PositionedSnackbar type={alert.messageType} open={alert.openSnackBar} show={alert.showErrors} message={alert.messageErrors} onclose={handleCloseSnackBar}></PositionedSnackbar>
      <div style={{ zIndex: '100000000000', position: 'absolute' }}>
        <ModalValue
          closeDialog={props.closeDialog}
          dialogState={props.dialogState}
          sistema={state.SYSTEM}
          bd={state.BD}
          esquema={state.SCHEMA}
          nombre={state.NAME}
          value={state.VALUE}
        />
      </div>
      </Grid>
        <Grid item xs={6} style={{paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '0px'}}>
        <div style={{display: 'grid'}}>
      <div style={{padding: '5px'}}>
        <div style={{float: 'left', marginRight: '10px', backgroundColor: '#FFF984', height: "20px", width: "20px", borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', color: "black"}}>#</div>
        {nameSelected[0] && nameSelected[0].BD != undefined?
          <div style={{float: 'left', fontWeight: 'bold'}}>{nameSelected[0].BD+" - "+nameSelected[0].SCHEMA}</div>
          :null}     
      </div>
      <div style={{padding: '5px'}}>
        <div style={{float: 'left', marginRight: '10px', backgroundColor: '#FF763F', height: "20px", width: "20px", borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', color: "black"}}>$</div>
        {nameSelected[1] ?
          <div style={{float: 'left', fontWeight: 'bold'}}>{nameSelected[1].BD+" - "+nameSelected[1].SCHEMA}</div>
          :null} 
      </div>
    </div>
        <Paper style={{height: '475px', overflowX: 'auto', overflowY: '100%', backgroundColor: '#F5F5F5', width: '100%'}}>
          <pre style={{color: 'black', textAlign: 'left'}}>{comparacion ? 
                      Utilities.changeColorCompare(comparacion)
                    :<div> 
                      
                    </div>}</pre>
        </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default TableComparation;
