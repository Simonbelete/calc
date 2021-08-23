import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { useState } from "react";
import IHistory from "interface/IHistory";
import axios from "lib/axios";

const Histories = () => {
  const [rows, setRows] = useState<IHistory[]>([]);

  useEffect(() => {
    axios
      .get("/api/history")
      .then((response) => {
        if (response.status === 200) setRows(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className="" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Expression</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.expression}</TableCell>
              <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Histories;
