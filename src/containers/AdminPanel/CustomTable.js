import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../contexts/AdminContext";
import Edit from "./Edit";

const CustomTable = () => {
  const {
    getProducts,
    products,
    deleteProduct,
    getProductToEdit,
    productToEdit,
  } = useContext(adminContext);

  useEffect(() => {
    getProducts();
  }, []);
  const [changeId, setChangeId] = useState(null);

  const handleEditChange = (id) => {
    getProductToEdit(id);
    setChangeId(id);
  };
  //   console.log(products);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Название</TableCell>
            <TableCell align="rigth">Фото</TableCell>
            <TableCell align="rigth">Описание</TableCell>
            <TableCell align="rigth">Цена</TableCell>
            <TableCell align="rigth">Автор</TableCell>
            <TableCell align="rigth">Скидка(в %)</TableCell>
            <TableCell align="rigth">Номер Продавца</TableCell>
            <TableCell align="rigth">Категория(память)</TableCell>
            <TableCell align="rigth">Количество</TableCell>
            <TableCell align="rigth">Локация</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products ? (
            <>
              {products.length ? (
                products.map((product) => (
                  <React.Fragment key={product.id}>
                    {changeId === product.id ? (
                      <Edit setChangeId={setChangeId} />
                    ) : (
                      <TableRow>
                        <TableCell align="right">
                          <button onClick={() => deleteProduct(product.id)}>
                            Del
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button onClick={() => handleEditChange(product.id)}>
                            Edit
                          </button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {product.title}
                        </TableCell>
                        <TableCell align="right">
                          <img width="100" src={product.image}></img>
                        </TableCell>
                        <TableCell align="right">
                          {product.description}
                        </TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">{product.author}</TableCell>
                        <TableCell align="right">{product.discount}</TableCell>
                        <TableCell align="right">{product.phone}</TableCell>
                        <TableCell align="right">{product.category}</TableCell>
                        <TableCell align="right">
                          {product.countInStock}
                        </TableCell>
                        <TableCell align="right">
                          {product.storeAddress}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <h2>На данный момент товаров нет</h2>
              )}
            </>
          ) : (
            <h1>Loading</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
