import React from 'react';
import ReactDOM from 'react-dom';



const SubObject = ({subObject, remover}) => {
  return (
    <>
      <label>title: {subObject.title}</label><br />
      <label>body: {subObject.body}</label>
      <button onClick={remover}>remove</button>
    </>
  )
}

const Main = () => {

  const remove = ()=> {
    console.log('removing from', list.length);
  }

  const add = () => {
    console.log('adding to', list.length);
    let tempList = [...list];
    const id = list.length;
    tempList.push({title: '', body: ''})
    setList(tempList);
  }

  const [list, setList] = React.useState([
    {title: 'sdf', body: 'fdsfsf'}
  ]);

  return (
    <div>
      {list.map((elm, key)=> <SubObject key={key} subObject={elm} remover={remove}></SubObject>)}
      <button onClick={add}>add</button>
    </div>
  )
}

ReactDOM.render(<Main />, document.getElementById('main'));