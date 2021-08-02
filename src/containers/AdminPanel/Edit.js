import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../contexts/AdminContext";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const Edit = ({ setChangeId }) => {
  //   const {} = useEffect(adminContext);
  const { productToEdit, saveEditedProduct } = useContext(adminContext);
  const [editProduct, setEditProduct] = useState(productToEdit);
  useEffect(() => {
    setEditProduct(productToEdit);
  }, [productToEdit]);
  const handleInput = (e) => {
    let obj = {
      ...editProduct,
      [e.target.name]: e.target.value,
    };
    setEditProduct(obj);
  };
  const handleClick = () => {
    saveEditedProduct(editProduct);
    setChangeId(null);
  };
  return (
    <>
      {editProduct ? (
        <TableRow>
          <TableCell align="right">
            <button disable>Del</button>
          </TableCell>
          <TableCell align="right">
            <button onClick={() => handleClick()}>Save</button>
          </TableCell>
          <TableCell component="th" scope="row">
            <input
              onChange={handleInput}
              value={editProduct.title}
              type="text"
              name="title"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.image}
              type="text"
              name="image"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.description}
              type="text"
              name="description"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.price}
              type="number"
              name="price"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.author}
              type="text"
              name="author"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.discount}
              type="number"
              name="discount"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.phone}
              type="number"
              name="phone"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.category}
              type="text"
              name="category"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.countInStock}
              type="number"
              name="countInStock"
            />
          </TableCell>
          <TableCell align="right">
            <input
              onChange={handleInput}
              value={editProduct.storeAddress}
              type="text"
              name="storeAddress"
            />
          </TableCell>
        </TableRow>
      ) : (
        <h1>Error</h1>
      )}
    </>
  );
};

export default Edit;
