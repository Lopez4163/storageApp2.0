import React, { useState } from "react"

const InventoryTable = ({ items, deleteItem, editItem }) => {
  const [editableIndex, setEditableIndex] = useState(null)

  const handleEdit = index => {
    setEditableIndex(index)
  }

  const handleSave = index => {
    setEditableIndex(null)
  }

  return (
    <div className="table-container">
      <h2 className="table-title">1NV3NT0RY TABL3</h2>
      <div className="table-scroll-container">
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Price per Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={e =>
                      editItem(index, { ...item, itemName: e.target.value })
                    }
                  />
                ) : (
                  item.itemName
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e =>
                      editItem(index, { ...item, quantity: e.target.value })
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={item.location}
                    onChange={e =>
                      editItem(index, { ...item, location: e.target.value })
                    }
                  />
                ) : (
                  item.location
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={item.pricePerUnit}
                    onChange={e =>
                      editItem(index, { ...item, pricePerUnit: e.target.value })
                    }
                  />
                ) : (
                  item.pricePerUnit
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <button className="table-button" onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <>
                    <button className="table-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="table-button" onClick={() => deleteItem(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  )
}

export default InventoryTable
