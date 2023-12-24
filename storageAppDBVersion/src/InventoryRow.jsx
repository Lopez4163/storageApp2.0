import React, { useState } from "react"
import Axios from "axios"

function InventoryRow({
  item,
  isEditing,
  handleEdit,
  handleSave,
  handleCancel,
  handleDelete,
}) {
  const [updatedItem, setUpdatedItem] = useState(item)

  const handleChange = event => {
    const { name, value } = event.target
    setUpdatedItem(prevItem => ({ ...prevItem, [name]: value }))
  }
  //LOCALHOST API
  const handleUpdate = () => {
    Axios.put(`http://localhost:8080/api/update/${item.id}`, updatedItem)
      .then(() => {
        handleSave(item.id, updatedItem)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteItem = () => {
    Axios.delete(`http://localhost:8080/api/delete/${item.id}`)
      .then(() => {
        handleDelete(item.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // const handleUpdate = () => {
  //   Axios.put(
  //     `lin-22748-12976-mysql-primary.servers.linodedb.net/api/update/${item.id}`,
  //     updatedItem
  //   )
  //     .then(() => {
  //       handleSave(item.id, updatedItem)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // const handleDeleteItem = () => {
  //   Axios.delete(
  //     `lin-22748-12976-mysql-primary.servers.linodedb.net/api/delete/${item.id}`
  //   )
  //     .then(() => {
  //       handleDelete(item.id)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  return (
    <tr className="inventory-row" key={item.id}>
      <td>{item.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="itemName"
            value={updatedItem.itemName}
            onChange={handleChange}
          />
        ) : (
          item.itemName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            name="quantity"
            value={updatedItem.quantity}
            onChange={handleChange}
          />
        ) : (
          item.quantity
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={updatedItem.location}
            onChange={handleChange}
          />
        ) : (
          item.location
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            name="pricePerUnit"
            value={updatedItem.pricePerUnit}
            onChange={handleChange}
          />
        ) : (
          item.pricePerUnit
        )}
      </td>
      <td className="actions">
        {isEditing ? (
          <div>
            <button className="alter-btn" onClick={handleUpdate}>
              Save
            </button>
            <button className="alter-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button className="alter-btn" onClick={() => handleEdit(item.id)}>
              Edit
            </button>
            <button className="alter-btn" onClick={handleDeleteItem}>
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default InventoryRow
