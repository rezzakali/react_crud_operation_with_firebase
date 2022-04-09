import React, { useState } from "react";

function Form() {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  let name, value;
  const getUsersData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUsers({ ...users, [name]: value });
    console.log(users);
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, message } = users;
    if (name && email && phone && address && message) {
      const result = await fetch(
        "https://react-form-8181b-default-rtdb.firebaseio.com/React_Form_Data.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            message,
          }),
        }
      );
      if (result) {
        alert("You have successfully addedd your data to firebase!");
        setUsers({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      }
    } else {
      alert("Filled the blank area!");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Register Form in React</h1>
      <form method="POST" className="m-2 shadow-lg p-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="helpId"
            value={users.name}
            onChange={getUsersData}
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="helpId"
            value={users.email}
            onChange={getUsersData}
            placeholder="Enter a valid email address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            name="phone"
            id="number"
            aria-describedby="helpId"
            value={users.phone}
            onChange={getUsersData}
            placeholder="Enter a valid phone number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            id="address"
            aria-describedby="helpId"
            value={users.address}
            onChange={getUsersData}
            placeholder="Enter your village name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            name="message"
            id="message"
            rows="3"
            value={users.message}
            onChange={getUsersData}
          />
        </div>
        <button type="button" className="btn btn-success" onClick={postData}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
