import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import "./table.css";
import styled from "styled-components";

const Table = ReactTable as React.FC<{ data: any[]; columns: any[] }>;

export interface ITable {
  data: any[];
  columns: any[];
}

const TableComponent: React.FC<ITable> = ({ data, columns }): JSX.Element => {
  return <Table data={data} columns={columns} />;
};

export default TableComponent;
