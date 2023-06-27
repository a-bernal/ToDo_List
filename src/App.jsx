import React, { useState } from 'react';

export default () => {
  const [todoList, setTodoList] = useState('');
  const [list, setList] = useState([]);

  function add(e) {
    e.preventDefault();

    if(todoList === '') return;

    setList([...list, {
      text: todoList,
      completed: false
    }]);

    setTodoList('');
  }

  function remove(index) {
    setList(list.filter((_item, i) => i !== index));
  }

  function checkedItem(index) {
    const obj = {
      ...list[index]
    };

    obj.completed = !obj.completed;

    setList([
      ...list.slice(0, index),
      obj
    ].concat(list.slice(index + 1)));
  }

  return (
    <div className='container'>
      <h1>My ToDo List</h1>
      <form className='formBox' onSubmit={add}>
        <input
          onChange={e => setTodoList(e.target.value)}
          value={todoList}
        />
        <button>Add</button>
      </form>
      {list.map((item, i) => (
        <div className='list' key={i}>
          <span style={{ textDecoration: item.completed && 'line-through' }}>{item.text}</span>
          <input
            type="checkbox"
            checked={item.completed}
            onClick={() => checkedItem(i)}
            readOnly
          />
          <button className='deleteButton' onClick={() => remove(i)}>Delete</button>
        </div>
      ))}
    </div>
  )
}