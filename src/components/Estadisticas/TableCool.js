import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'database', label: 'Base de Datos', minWidth: 110 },
  { id: 'schemas', label: 'Esquemas', minWidth: 110 },
  { id: 'tables',label: 'Tables', minWidth: 110},
  { id: 'triggers', label: 'Triggers', minWidth: 110},
  { id: 'types', label: 'Types', minWidth: 110 },
  { id: 'functions', label: 'Functions', minWidth: 110 },
  { id: 'views', label: 'Views', minWidth: 110 },
];

function createData(database, schemas, tables, triggers, types, functions, views) {
  return { database, schemas, tables, triggers, types, functions, views };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableCool(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { objectData } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const rows = [];

  if(objectData != undefined){
    for(let i = 0; i < objectData.length; i++){
      rows.push(createData(
                objectData[i].BD,
                objectData[i].SCHEMA,
                objectData[i].objectsBD.table,
                objectData[i].objectsBD.triggers,
                objectData[i].objectsBD.type,
                objectData[i].objectsBD.function,
                objectData[i].objectsBD.views
        ));
    }
  }


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}