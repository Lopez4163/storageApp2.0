import React, { useState } from "react"
import "./App.scss"
import { v4 as uuidv4 } from "uuid"

function InventoryForm({ addItem, submitReview }) {
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [pricePerUnit, setPricePerUnit] = useState("$0.00")

  const handleSubmit = event => {
    event.preventDefault()
    const newItem = {
      itemName,
      quantity,
      location,
      pricePerUnit,
    }
    addItem(newItem)
    submitReview(newItem)
    setItemName("")
    setQuantity("")
    setLocation("")
    setPricePerUnit("$0.00")
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={event => setItemName(event.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={event => setLocation(event.target.value)}
            required
          />
        </label>
        <label>
          Price per Unit:
          <input
            type="text"
            value={pricePerUnit}
            onChange={event => setPricePerUnit(event.target.value)}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  )
}

export default InventoryForm
