import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjangs from "./ModalKeranjangs";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keranjangDetail: null,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (item) => {
    this.setState({
      showModal: true,
      keranjangDetail: item,
      jumlah: item.jumlah,
      keterangan: item.keterangan,
      totalHarga: item.total_harga, // sebelumnya salah refer ke menuKeranjang
    });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  tambah = () => {
    this.setState((prevState) => ({
      jumlah: prevState.jumlah + 1,
      totalHarga: prevState.keranjangDetail.product.harga * (prevState.jumlah + 1),
    }));
  };

  kurang = () => {
    if (this.state.jumlah > 1) {
      this.setState((prevState) => ({
        jumlah: prevState.jumlah - 1,
        totalHarga: prevState.keranjangDetail.product.harga * (prevState.jumlah - 1),
      }));
    }
  };

  changeHandler = (event) => {
    this.setState({ keterangan: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    const { showModal, keranjangDetail, jumlah, keterangan, totalHarga } = this.state;

    return (
      <Col md={3} className="mt-2">
        <h4><strong>Keranjang</strong></h4>
        <hr />

        {keranjangs.length !== 0 ? (
          <ListGroup variant="flush">
            {keranjangs.map((item) => (
              <ListGroup.Item
                key={item.id}
                onClick={() => this.handleShow(item)}
                style={{ cursor: "pointer" }}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">{item.jumlah}</Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{item.product.nama}</h5>
                    <p>Rp. {numberWithCommas(item.product.harga)}</p>
                  </Col>
                  <Col className="text-end">
                    <strong>Rp. {numberWithCommas(item.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ModalKeranjangs
              showModal={showModal}
              handleClose={this.handleClose}
              keranjangsDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              totalHarga={totalHarga}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        ) : (
          <p>Keranjang masih kosong.</p>
        )}

        {keranjangs.length !== 0 && (
          <TotalBayar keranjangs={keranjangs} />
        )}
      </Col>
    );
  }
}
