/** @format */
import Swal from "sweetalert2";
import { Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import axios from "axios";

type contactMessage = {
  firstName: string;
  email: string;
  message: string;
};

export const Contact = () => {
  const [contactMess, setContactMess] = useState<contactMessage[]>([]);
  const [validForm, setValid] = useState(false);

  const handleSubmit = () => {
    console.log(contactMess);
    if (contactMess.length > 1) {
      axios({
        method: "post",
        url: "https://shopp-market-server.herokuapp.com/message",
        data: { mess: contactMess },
      }).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Message Has Been Sent Successfuly!",
          showConfirmButton: false,
          timer: 3000,
        });
      });
    }
  };
  return (
    <>
      <form style={{ maxWidth: "600px" }}>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          required={true}
          onChange={(e) => {
            setContactMess((pre) => ({ ...pre, firstName: e.target.value }));
            setValid(() => true);
          }}
        ></Form.Control>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          required
          type="email"
          onChange={(e) =>
            setContactMess((pre) => ({ ...pre, email: e.target.value }))
          }
        ></Form.Control>
        <Form.Label>Message:</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={4}
          onChange={(e) =>
            setContactMess((pre) => ({ ...pre, message: e.target.value }))
          }
        ></Form.Control>
        <Button type="submit" className="mt-4" onClick={() => handleSubmit()}>
          SUBMIT
        </Button>
      </form>
    </>
  );
};
