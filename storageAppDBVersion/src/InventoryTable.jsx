import React, { useState, useEffect } from "react"
import InventoryRow from "./InventoryRow"
import "./App.scss"
import Axios from "axios"

function InventoryTable({ items, setItems }) {
  const [editItemId, setEditItemId] = useState(null)
  const [error, setError] = useState(null)
  //ALL LOCAL API
  useEffect(() => {
    Axios.get("http://localhost:8080/api/get")
      .then(response => {
        setItems(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }, [setItems])

  const handleEdit = itemId => {
    setEditItemId(itemId)
  }

  const handleSave = (itemId, updatedItem) => {
    Axios.put(`http://localhost:8080/api/update/${itemId}`, updatedItem)
      .then(response => {
        const updatedItems = items.map(item => {
          if (item.id === itemId) {
            return response.data
          } else {
            return item
          }
        })
        setItems(updatedItems)
        setEditItemId(null)
      })
      .catch(error => {
        setError(error)
      })
  }

  const handleCancel = () => {
    setEditItemId(null)
  }

  const handleDelete = itemId => {
    Axios.delete(`http://localhost:8080/api/delete/${itemId}`)
      .then(response => {
        const updatedItems = items.filter(item => item.id !== itemId)
        setItems(updatedItems)
      })
      .catch(error => {
        setError(error)
      })
  }

  // //LINODE API
  // useEffect(() => {
  //   Axios.get("lin-22748-12976-mysql-primary.servers.linodedb.net/api/get")
  //     .then(response => {
  //       setItems(response.data)
  //     })
  //     .catch(error => {
  //       setError(error)
  //     })
  // }, [setItems])

  // const handleEdit = itemId => {
  //   setEditItemId(itemId)
  // }

  // const handleSave = (itemId, updatedItem) => {
  //   Axios.put(
  //     `lin-22748-12976-mysql-primary.servers.linodedb.net/api/update/${itemId}`,
  //     updatedItem
  //   )
  //     .then(response => {
  //       const updatedItems = items.map(item => {
  //         if (item.id === itemId) {
  //           return response.data
  //         } else {
  //           return item
  //         }
  //       })
  //       setItems(updatedItems)
  //       setEditItemId(null)
  //     })
  //     .catch(error => {
  //       setError(error)
  //     })
  // }

  // const handleCancel = () => {
  //   setEditItemId(null)
  // }

  // const handleDelete = itemId => {
  //   Axios.delete(
  //     `lin-22748-12976-mysql-primary.servers.linodedb.net/api/delete/${itemId}`
  //   )
  //     .then(response => {
  //       const updatedItems = items.filter(item => item.id !== itemId)
  //       setItems(updatedItems)
  //     })
  //     .catch(error => {
  //       setError(error)
  //     })
  // }

  if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return (
      <div className="table-container">
        <h2 className="table-container-title">Inventory List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Price per Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <InventoryRow
                key={item.id}
                item={item}
                isEditing={editItemId === item.id}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default InventoryTable
