import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Pastikan kamu punya file constants.js dan URL ini benar
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_Bayar: totalBayar,
      menus: this.props.keranjangs,
    }; 

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/Suksess");
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom bg-white shadow-sm py-3 border-top">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5 className="d-flex justify-content-between align-items-center mb-3">
              Total Harga:
              <strong className="text-success">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h5>

            <Button
              variant="primary"
              size="lg"
              className="w-100"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
 