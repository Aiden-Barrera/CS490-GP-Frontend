// src/CustomerPage.js
import React, { useEffect, useState } from "react";
import Customer from './MainCustomer';
import Pagination from "./Pagination";
import Navbar from "./NavBar";
function CustomerEdit() {
  const [customerData, setCustomerData] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[postsperpage] = useState(30);
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    store_id:"",
  });
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("http://localhost:8080/customers")
      .then((res) => res.json())
      .then((data) => setCustomerData(data))
      .catch((err) => console.log("Error fetching customers:", err));
  };

  const lastPostIndex = currentPage * postsperpage;
  const firstPostIndex = lastPostIndex - postsperpage;
  const currentPosts = customerData.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(customerData.length / postsperpage);

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => res.json())
      .then(() => {
        fetchCustomers();
        setNewCustomer({ first_name: "", last_name: "", email: "", store_id: ""});
      })
      .catch((err) => console.log("Error adding customer:", err));
  };

  const deleteCustomer = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    fetch(`http://localhost:8080/customers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCustomerData(customerData.filter((customer) => customer.customer_id !== id));
      })
      .catch((err) => console.log("Error deleting customer:", err));
  };

  return (
    <>
    <div>
      <Navbar></Navbar>
      <Customer customerData={currentPosts} deleteCustomer={deleteCustomer} />
      <Pagination 
      totalPosts={customerData.length} 
      postsPerPage={postsperpage} 
      setCurrentPage={setCurrentPage}
      />
      </div>
    <div className='addCustomer'>
    <h2>Add New Customer</h2>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="first_name"
      value={newCustomer.first_name}
      onChange={handleInputChange}
      placeholder="First Name"
      required
    />
    <input
      type="text"
      name="last_name"
      value={newCustomer.last_name}
      onChange={handleInputChange}
      placeholder="Last Name"
      required
    />
    <input
      type="email"
      name="email"
      value={newCustomer.email}
      onChange={handleInputChange}
      placeholder="Email"
      required
    />
    <input
    type="store_id"
    name="store_id"
    value={newCustomer.store_id}
    onChange={handleInputChange}
    placeholder="Store ID"
    required
  />
    <button type="submit">Add Customer</button>
  </form>
  </div>
  </>
  );
}

export default CustomerEdit;
