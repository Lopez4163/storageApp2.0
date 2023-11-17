import React, { useState } from "react";
import InventoryForm from "./iventoryForm";
import InventoryTable from "./inventoryTable";
import "./app.css";

function App() {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, itemName: "Default Item 1", quantity: 10, location: "Warehouse A", pricePerUnit: 5.0 },
    { id: 2, itemName: "Default Item 2", quantity: 20, location: "Warehouse B", pricePerUnit: 8.0 },
    // Add more default items as needed
  ]);

  const addItem = newItem => {
    setInventoryItems([...inventoryItems, { ...newItem, id: Date.now() }]);
  }

  const deleteItem = index => {
    const updatedItems = [...inventoryItems];
    updatedItems.splice(index, 1);
    setInventoryItems(updatedItems);
  }

  const editItem = (index, updatedItem) => {
    const updatedItems = [...inventoryItems];
    updatedItems[index] = updatedItem;
    setInventoryItems(updatedItems);
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
  );
}

export default App;
