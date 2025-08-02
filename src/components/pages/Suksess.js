import React, { Component } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/constants";

// Ini harus dijadikan class agar ComponentDidMount valid
class Suksess extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;

        keranjangs.forEach((item) => {
          axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });

        this.setState({
          keranjangs,
        });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  }


  render() {
    return (
      <Container className="mt-5 text-center">
        <Image src="/images/Suksess.png" width="500" className="mb-4" />
        <h2>Transaksi Sukses!</h2>
        <p>Terima kasih telah memesan di Warung Kang Roy.</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </Container>
    );
  }
}

export default Suksess;
