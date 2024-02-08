// components/organisms/Table.tsx
import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

interface TableColumn {
  id: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  onEdit: (data: any) => void;
  onDelete: (id: string) => void;
}

const CustomTable: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(row)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                  onClick={() => onDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
