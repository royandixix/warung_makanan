import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} className="mt-2">
        <h4>
          <strong>Keranjang</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 ? (
          <ListGroup variant="flush">
            {keranjangs.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {item.jumlah}
                      </Badge>
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
          </ListGroup>
        ) : (
          <p>Keranjang masih kosong.</p>
        )}
      </Col>
    );
  }
}
