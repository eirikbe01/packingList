import "./App.css";
import { initialList } from "./data/data.js";
import { useState } from 'react';

let nextId = 3;

function App() {
  const packingArray = Object.values(initialList);
  const [packingList, setPackingList] = useState(packingArray);
  const [item, setItem] = useState("");

  console.log(packingList);


  function handleDelete(itemId) {
    const updatedList = packingList.filter(item => item.id !== itemId);
    setPackingList(updatedList);
  }

  function handleChecked(itemId, checked) {
    const updatedList = packingList.map(item => 
      item.id === itemId ? {...item, done: checked } : item
    );
    setPackingList(updatedList);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const itemName = formData.get("itemName");
    const itemId = ++nextId;
    
    const itemToAdd = {
      id: itemId,
      text: itemName,
      done: false,
    }
    setPackingList([...packingList, itemToAdd]);
  }


  return (
    <>
      <h1>Packing List Practice</h1>
      <hr />
      <AddItem 
        item={item} 
        onChange={e => setItem(e.target.value)} 
        onSubmit={handleSubmit}
      />
      <hr />
      <PackingList 
        items={packingList} 
        onChecked={handleChecked} 
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;

function AddItem({ item, onChange, onSubmit }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="itemName" value={item.text} onChange={onChange}/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function PackingList({ items, onChecked, onDelete }) {
  return(
    <div>
      {items.map(item => 
        <ItemComponent 
          key={item.id}
          item={item}
          onChecked={onChecked}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}


function ItemComponent({ item, onChecked, onDelete }) {
  return (
    <p>
      <input 
        type="checkbox" 
        checked={item.done} 
        onChange={e => onChecked(item.id, e.target.checked)}
      />
      {item.text}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </p>
  );
}
