import React, { Component } from "react";
import { Table, Button,Media } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th style={{textAlign:"center"}}>Ürün</th>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Stok Adeti</th>
            <th>Miktar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.id}</td>
              <td><Media src={cartItem.product.images} style={{ width: 100, height: 100}}/></td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeFromCart(cartItem.product)}
                >
                  Kaldır
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

render() {
  return <div>{this.renderCart()}</div>;
}
}
