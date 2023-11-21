import React, {useState} from "react";
import InventoryForm from "./iventoryForm";
import InventoryTable from "./inventoryTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import "./app.css";

function App() {
    const [inventoryItems, setInventoryItems] = useState([
        {id: 1, itemName: "Github Profile", quantity: 1, location: "https://github.com/Lopez4163", pricePerUnit: 0.1},
        {id: 2, itemName: "Instagram", quantity: 1, location: "nickk_adre", pricePerUnit: 0.0},
        // Add more default items as needed
    ]);

    const addItem = newItem => {
        setInventoryItems([...inventoryItems, {...newItem, id: Date.now()}]);
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
            <div className="powered-by">
                <p className='powered-by-text'>Powered By: <FontAwesomeIcon icon={faReact} className="icon" /></p>
            </div>
            <div className="form-container">
                <InventoryForm addItem={addItem}/>
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
