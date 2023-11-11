import React, { useState } from "react"
import InventoryForm from "./iventoryForm"
import InventoryTable from "./inventoryTable"
import "./app.css"

function App() {
  const [inventoryItems, setInventoryItems] = useState([])

  const addItem = newItem => {
    setInventoryItems([...inventoryItems, newItem])
  }

  const deleteItem = index => {
    const updatedItems = [...inventoryItems]
    updatedItems.splice(index, 1)
    setInventoryItems(updatedItems)
  }

  const editItem = (index, updatedItem) => {
    const updatedItems = [...inventoryItems]
    updatedItems[index] = updatedItem
    setInventoryItems(updatedItems)
  }

  return (
    <div className="container">
      <div className="form-container">
        <InventoryForm addItem={addItem} />
      </div>
      <div className="table-container">
        <InventoryTable
          items={inventoryItems}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </div>
  )
}

export default App
