import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase-config";

function CRUD() {
  const [users, setUsers] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // creating a collection with the database collection
  const userCollectionRef = collection(db, "users");

  // post/create data to the database
  const postData = async () => {
    const result = await addDoc(userCollectionRef, {
      name: newName,
      email: newEmail,
      address: newAddress,
      age: newAge,
    });
    if (result) {
      alert("Data Addedd successfully!");
    }
  };

  // get/read the data from the database
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  // update the data
  const updateUsers = async (age, id) => {
    const userDoc = doc(db, "users", id);
    const newField = { age: age + 1 };
    const result = await updateDoc(userDoc, newField);
  };

  // delete data
  const deleteUsers = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc, id);
  };

  return (
    <div>
      <h1 className="text-center">CRUD Operation</h1>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col mr-3 shadow-lg border">
            <table className="table text-center">
              <thead className="bg-success">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.age}</td>
                      <button
                        onClick={() => {
                          updateUsers(user.age, user.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteUsers(user.id);
                        }}
                      >
                        Delete
                      </button>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col shadow-lg p-3">
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
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                placeholder="Enter your name...."
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
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
                placeholder="Enter a valid email address...."
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
                onChange={(event) => {
                  setNewAddress(event.target.value);
                }}
                placeholder="Enter your address..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                name="age"
                id="age"
                aria-describedby="helpId"
                onChange={(event) => {
                  setNewAge(event.target.value);
                }}
                placeholder="Enter your age..."
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={postData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUD;
