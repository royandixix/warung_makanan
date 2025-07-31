import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, NavbarComponent, Menus } from "./components";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  // ✅ PERBAIKI INI
  fetchProducts = async () => {
    try {
      const { categoriYangDipilih } = this.state;

      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}products`),
        axios.get(`${API_URL}categories`)
      ]);

      const products = productsRes.data;
      const categories = categoriesRes.data;

      // Gabungkan categoryId menjadi category object
      const menusWithCategory = products.map((product) => {
        const category = categories.find(cat => cat.id === product.categoryId);
        return {
          ...product,
          category: category || { nama: "Tidak diketahui" }
        };
      });

      // Filter sesuai kategori yang dipilih
      const filteredMenus = menusWithCategory.filter(
        (menu) => menu.category.nama.toLowerCase() === categoriYangDipilih.toLowerCase()
      );

      this.setState({ menus: filteredMenus });

    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  changeCategory = (value) => {
    this.setState({ categoriYangDipilih: value, menus: [] }, () => {
      this.fetchProducts();
    });
  };

  masukKeranjang = (value) => {
    axios
      .get(`${API_URL}keranjangs?product.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(`${API_URL}keranjangs`, keranjang)
            .then((res) => {
              swal({
                title: "Berhasil!",
                text: `Produk ${keranjang.product.nama} berhasil ditambahkan ke keranjang!`,
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.setState((prevState) => ({
                keranjangs: [...prevState.keranjangs, res.data],
              }));
            })
            .catch((error) => {
              console.error("Error adding to cart:", error);
            });
        } else {
          const existingCart = res.data[0];
          const updatedKeranjang = {
            jumlah: existingCart.jumlah + 1,
            total_harga: existingCart.total_harga + value.harga,
            product: value,
          };

          axios
            .put(`${API_URL}keranjangs/${existingCart.id}`, updatedKeranjang)
            .then(() => {
              swal({
                title: "Berhasil!",
                text: `Produk ${updatedKeranjang.product.nama} berhasil diperbarui di keranjang!`,
                icon: "success",
                button: false,
                timer: 1500,
              });
              this.setState((prevState) => ({
                keranjangs: prevState.keranjangs.map((item) =>
                  item.id === existingCart.id ? updatedKeranjang : item
                ),
              }));
            })
            .catch((error) => {
              console.error("Error updating cart:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus.length > 0 ? (
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))
                  ) : (
                    <p>Tidak ada produk yang tersedia</p>
                  )}
                </Row>
              </Col>
              <Hasil keranjangs={this.state.keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
