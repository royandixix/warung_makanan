import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4" onClick={() => masukKeranjang(menu)}>
    <Card className="shadow-sm border-0">
      <Card.Img
        variant="top"
        src={
          "images/" +
          menu.category.nama.toLowerCase() +
          "/" +
          menu.gambar
        }
        style={{
          height: "250px", // Menambah tinggi gambar
          objectFit: "cover", // Membuat gambar tetap proporsional
        }}
      />
      <Card.Body>
        <Card.Title className="text-center">{menu.nama} <strong>{menu.kode}</strong> </Card.Title>
        <Card.Text className="text-center">
          Rp.{numberWithCommas(menu.harga)}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default Menus;
