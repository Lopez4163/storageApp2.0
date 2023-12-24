import React, { useState, useEffect } from "react"
import "./App.scss"
import InventoryForm from "./InventoryForm"
import InventoryTable from "./InventoryTable"
import Axios from "axios"

function App() {
  const [items, setItems] = useState([])

  function addItem(newItem) {
    setItems(prevItems => [...prevItems, newItem])
  }

  function handleUpdate(itemId, updatedItem) {
    setItems(prevItems =>
      prevItems.map(item => (item.itemName === itemId ? updatedItem : item))
    )
  }

  // localhost
  function submitReview(reviewData) {
    const { itemName, quantity, location, pricePerUnit } = reviewData
    Axios.post("http://localhost:8080/api/insert", {
      itemName: itemName,
      quantity: quantity,
      location: location,
      pricePerUnit: pricePerUnit,
    }).then(() => {
      alert("success insert")
    })
  }
  // //linode
  // function submitReview(reviewData) {
  //   const { itemName, quantity, location, pricePerUnit } = reviewData
  //   Axios.post("lin-22748-12976-mysql-primary.servers.linodedb.net", {
  //     itemName: itemName,
  //     quantity: quantity,
  //     location: location,
  //     pricePerUnit: pricePerUnit,
  //   }).then(() => {
  //     alert("success insert")
  //   })
  // }
  return (
    <div className="container">
      <div className="header">
        <div className="seperator left-side" />
        <div className="title">
          <h2>Inventory Management</h2>
        </div>
        <div className="seperator right-side" />
      </div>
      <div className="content">
        <div className="left">
          <InventoryForm addItem={addItem} submitReview={submitReview} />
        </div>
        <div className="right">
          <InventoryTable
            items={items}
            handleUpdate={handleUpdate}
            setItems={setItems}
          />
        </div>
      </div>
      <div className="footer">
        <div className="container-bottom">
          <div className="separator left-side" />
        </div>
      </div>
    </div>
  )
}

export default App
