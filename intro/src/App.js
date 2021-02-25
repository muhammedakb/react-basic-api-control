import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { BsSearch } from "react-icons/bs";
import Footer from "./Footer";
import { Media, Button, Table } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [], search: null };

  componentDidMount() {
    this.getProducts();
  }

  // eslint-disable-next-line no-dupe-class-members
  /*componentDidMount() {
    const putToCart = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 2,
        categoryId: 1,
        productName: "Logitech G102 Lightsync RGB",
        unitPrice: "500₺",
        unitsInStock: 17,
        images: "/images/id2.jpg",
      }),
    };
    fetch("http://localhost:3000/products/2", putToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  }*/

  // eslint-disable-next-line no-dupe-class-members
  /*componentDidMount() {
    const postToCart = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 19,
        categoryId: 1,
        productName: "Logitech G102 Lightsync RGB",
        unitPrice: "237₺",
        unitsInStock: 17,
        images: "/images/id2.jpg",
      }),
    };
    fetch("http://localhost:3000/products", postToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  }*/

  // eslint-disable-next-line no-dupe-class-members
  /* componentDidMount() {
    const deleteToCart = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/products/19", deleteToCart)
      .then((response) => response.json())
      .then((data) => this.setState({ id: data.id }));
  }*/

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " ürünü sepetinize eklendi!", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " ürünü sepetinizden kaldırıldı!", 2);
  };

  searchSpace = (product) => {
    let keyword = product.target.value;
    this.setState({ search: keyword });
  };

  render() {
    let categoryInfo = { title: "CategoryList" };

    const myStyle = {
      cursor: "default",
      color: "rgb(43, 174, 185)",
    };

    // eslint-disable-next-line array-callback-return
    const items = this.state.products
      .filter((product) => {
        if (this.state.search == null) return product;
        else if (
          product.productName
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        ) {
          return product;
        }
      })
      .map((product) => {
        return (
          <div>
            <tbody>
              <div style={{ width: "10px" }}></div>
              <td style={{ width: "50px" }}> {product.id} </td>

              <td style={{ width: "100px" }}>
                <Media
                  src={product.images}
                  style={{ width: 200, height: 200 }}
                />
              </td>
              <div style={{ width: "30px" }}></div>
              <td style={{ width: "320px" }}>{product.productName}</td>
              <div style={{ width: "50px" }}></div>
              <td style={{ width: "150px" }}>{product.unitPrice}</td>
              <td></td>
              <td>{product.unitsInStock}</td>
              <td style={{ width: "50px" }}>
                <Button
                  style={{ marginLeft: "80px" }}
                  onClick={() => this.addToCart(product)}
                  color="info"
                >
                  +
                </Button>
              </td>
            </tbody>
            <hr></hr>
          </div>
        );
      });

    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <br></br>
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>

            <Col xs="9">
              <br></br>

              <BsSearch
                style={{
                  position: "absolute",
                  marginLeft: "790px",
                  marginTop: "10px",
                }}
              />
              <input
                type="text"
                placeholder=" Aramak istediğiniz ürünü giriniz "
                style={{
                  width: "350px",
                  height: "40px",
                  float: "right",
                  border: "2px solid black",
                }}
                onChange={(product) => this.searchSpace(product)}
              />

              <br></br>
              <div>
                <h3 style={myStyle}>
                  Ürün Listesi {this.props.currentCategory}
                </h3>

                <Table>
                  <th>#</th>
                  <th>Ürün</th>
                  <th>Ürün Adı</th>
                  <th style={{ textAlign: "center" }}>Fiyat</th>
                  <th>Stok</th>
                </Table>
                <hr></hr>
                {items}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
