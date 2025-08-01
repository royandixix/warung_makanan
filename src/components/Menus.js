import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

// Fallback kategori berdasarkan ID jika relasi tidak ada
const categoryMap = {
  1: "makanan",
  2: "minuman",
  3: "cemilan",
};

const Menus = ({ menu, masukKeranjang }) => {
  const categoryName =
    menu?.category?.nama?.toLowerCase() || categoryMap[menu.categoryId] || "default";

  const imagePath = menu?.gambar
    ? `/images/${categoryName}/${menu.gambar.trim()}`
    : "/images/default.jpg";

  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className="mb-4"
      onClick={() => masukKeranjang(menu)}
    >
      <Card className="shadow-sm border-0 h-100 cursor-pointer">
        <Card.Img
          variant="top"
          src={imagePath}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default.jpg";
          }}
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center fw-bold">
            {menu.nama} <br />
            <small className="text-muted">({menu.kode})</small>
          </Card.Title>
          <Card.Text className="text-center text-success fs-5">
            Rp. {numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
