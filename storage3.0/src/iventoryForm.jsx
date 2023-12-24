import React, { useState } from "react"

function InventoryForm({ addItem }) {
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
    setItemName("")
    setQuantity("")
    setLocation("")
    setPricePerUnit("$0.00")
  }

  return (
    <div className="form-container">
      <h2 className="form-title">W3LC0ME T0 MYST0RAG3</h2>
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
        <div className="add-item-button">
            <button>Add Item</button>
        </div>
      </form>
    </div>
  )
}

export default InventoryForm
