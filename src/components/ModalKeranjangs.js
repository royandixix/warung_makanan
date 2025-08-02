import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjangs = ({
  showModal,
  handleClose,
  keranjangsDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan,
}) => {
  if (keranjangsDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangsDetail.product.nama}
            <strong> (Rp. {numberWithCommas(keranjangsDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Total Harga :</Form.Label>
              <p><strong>Rp. {numberWithCommas(totalHarga)}</strong></p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jumlah :</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Button variant="primary" size="sm" onClick={kurang}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <span className="mx-2">{jumlah}</span>
                <Button variant="primary" size="sm" onClick={tambah}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                placeholder="Contoh: Pedas, Nasi Setengah"
                value={keterangan}
                onChange={changeHandler}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="danger"
                className="me-2"
                onClick={() => hapusPesanan(keranjangsDetail.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
              </Button>

              <Button variant="primary" type="submit">
                Simpan Perubahan
              </Button>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data pesanan tidak tersedia.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjangs;
