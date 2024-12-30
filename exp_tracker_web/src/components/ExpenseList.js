import React, { useState, useMemo, useRef, useCallback } from 'react';
import { DataGrid, getGridDefaultColumnTypes, DEFAULT_GRID_COL_TYPE_KEY } from '@mui/x-data-grid';
import InputField from './common/InputField/InputField';
import Card from './common/Card/Card';
import NewExpense from './common/Button/NewExpense';

const ExpenseList = ({ expenses, onNewExpenseClick }) => {
  const [filterText, setFilterText] = useState('');
  const [models, setModels] = useState(() => ({
    filterModel: {
      items: [
        {
          field: 'title',
          operator: 'contains',
          value: '',
        },
      ],
    },
    rowSelectionModel: [],
  }));

  const rowSelectionModelLookup = useMemo(
    () =>
      models.rowSelectionModel.reduce((lookup, rowId) => {
        lookup[rowId] = rowId;
        return lookup;
      }, {}),
    [models.rowSelectionModel]
  );

  const rowSelectionModelLookupRef = useRef(rowSelectionModelLookup);
  rowSelectionModelLookupRef.current = rowSelectionModelLookup;

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);
    setModels((prev) => ({
      ...prev,
      filterModel: {
        items: [
          {
            field: 'title',
            operator: 'contains',
            value,
          },
        ],
      },
    }));
  };

  const columns = useMemo(() => {
    const defaultColumnTypes = getGridDefaultColumnTypes();
  
    const wrapOperator = (operator) => {
      const getApplyFilterFn = (filterItem, column) => {
        const innerFilterFn = operator.getApplyFilterFn(filterItem, column);
        if (!innerFilterFn) {
          return innerFilterFn;
        }
  
        return (value, row, col, apiRef) => {
          const rowId = apiRef.current.getRowId(row);
          if (rowSelectionModelLookupRef.current[rowId]) {
            return true;
          }
          return innerFilterFn(value, row, col, apiRef);
        };
      };
  
      return {
        ...operator,
        getApplyFilterFn,
      };
    };
  
    return [
      { field: 'id', headerName: '#', width: 70 },
      { field: 'title', headerName: 'Title', width: 200 },
      {
        field: 'amount',
        headerName: 'Amount (₹)',
        width: 150,
        type: 'number',
        sortComparator: (v1, v2) => v1 - v2,
        renderCell: (params) => (
          <div style={{ textAlign: 'left', width: '100%' }}>{params.value}</div>
        ),
        headerAlign: 'left',
      },
      { field: 'category', headerName: 'Category', width: 150 },
      { field: 'date', headerName: 'Date', width: 150 },
    ].map((col) => {
      const filterOperators =
        col.filterOperators ??
        defaultColumnTypes[col.type ?? DEFAULT_GRID_COL_TYPE_KEY].filterOperators;
  
      return {
        ...col,
        filterOperators: filterOperators.map((operator) => wrapOperator(operator)),
      };
    });
  }, []);

  const rows = useMemo(
    () =>
      expenses.map((expense, index) => ({
        id: index + 1,
        ...(() => {
          const { id, ...rest } = expense;
          return rest;
        })(),
        amount: Number(expense.amount),
      })),
    [expenses]
  );

  const handleRowSelectionModelChange = useCallback(
    (newRowSelectionModel) =>
      setModels((prev) => ({
        ...prev,
        rowSelectionModel: newRowSelectionModel,
        filterModel: { ...prev.filterModel },
      })),
    []
  );

  const handleFilterModelChange = useCallback(
    (newFilterModel) =>
      setModels((prev) => ({ ...prev, filterModel: newFilterModel })),
    []
  );

  return (
    <div className="container">
      <div className="row">
        <Card
          width="w-full md:w-3/4 mx-auto"
          padding="p-6"
          shadow="shadow-md"
          borderRadius="rounded-lg"
          textColor="text-gray-900 dark:text-gray-100"
        >
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Expense List
              </h1>
              <NewExpense onClick={onNewExpenseClick} />
            </div>
            <label
              htmlFor="filterInput"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
            </label>
            <InputField
              id="filterInput"
              type="text"
              placeholder="Title or Category"
              value={filterText}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
              filterModel={models.filterModel}
              onFilterModelChange={handleFilterModelChange}
              onRowSelectionModelChange={handleRowSelectionModelChange}
              disableSelectionOnClick
              className="text-text-dark bg-background dark:bg-background-dark dark:text-text-dark"
              sx={{
                '--DataGrid-containerBackground': 'var(--tw-bg-primary-dark)', // Adjusts the header background
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'var(--DataGrid-containerBackground)',
                  color: 'var(--tw-text-text-dark)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1000,
                },
                '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle': {
                  color: 'inherit',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: 'var(--tw-bg-primary-dark)',
                  color: 'var(--tw-text-text-dark)',
                },
                '& .MuiTablePagination-root': {
                  color: 'var(--tw-text-text-dark)',
                },
                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'var(--tw-bg-primary-light)',
                },
                '& .MuiDataGrid-cell': {
                  color: 'var(--tw-text-text-dark)',
                },
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseList;
