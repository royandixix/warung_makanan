import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

// Mapping kategori berdasarkan ID
const categoryMap = {
  1: "makanan",
  2: "minuman",
  3: "cemilan"
};

const Menus = ({ menu, masukKeranjang }) => {
  // Ambil nama kategori: dari objek category atau fallback ke mapping
  const categoryName = menu?.category?.nama?.toLowerCase() || categoryMap[menu.categoryId] || "default";

  // Path gambar lengkap
  const imagePath = menu?.gambar
    ? `/images/${categoryName}/${menu.gambar}`
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
      <Card className="shadow-sm border-0">
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
        <Card.Body>
          <Card.Title className="text-center">
            {menu.nama} <strong>{menu.kode}</strong>
          </Card.Title>
          <Card.Text className="text-center">
            Rp.{numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
