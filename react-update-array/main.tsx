
import React, {useEffect, useReducer, Reducer} from 'react';
import ReactDOM from 'react-dom';

type testprops = {
  changes: any;
  id: number;
  value: {title: string, body: string}
}
const TestBox: React.FC<testprops> = ({id, value, changes}) => {

  const bodyRef = React.createRef();
  const titleRef = React.createRef();

  const handleChange = (event) => {
    
    changes({
      id: id,
      title: titleRef.current.value,
      body: bodyRef.current.value
    });
  }


  return (
    <React.Fragment>
      <input type="text" value={value.title} ref={titleRef} onChange={handleChange}></input>
      <input type="text" value={value.body} ref={bodyRef} onChange={handleChange}></input>
    </React.Fragment>
  )
};



const Main = () => {

  const [textList, setTextList] = React.useState([]);

  const [boxList, setBoxList] = React.useState([
    {title: 'sdf', body: 'hgdf'},
    {title: 'fsd', body: 'asdf'}]);

  useEffect(()=>{
    console.log('updated state', textList)
  },[textList]);

  const remove = (event) => {
    console.log('removing', event.target.id)

    console.log('unfiltered text', boxList);
    const newBoxList=boxList.filter((text,key)=>key!=event.target.id)
    setBoxList(newBoxList)
    console.log('filtered text', newBoxList);
  
  }

  const add = () => {
    let tempBoxList = [...boxList];
    tempBoxList.push({title: '', body: ''});

    setBoxList(tempBoxList)
  }

  const updateText = (event) => {

    let tempTextList = [...textList];
    tempTextList[event.target.id] = event.target.value;
    setTextList(tempTextList);
  }

  const updateBoxState = ({id, body, title}) => {
    console.log('updating testbox with id', id)

    let tempBoxList = [...boxList];

    tempBoxList[id] = {title,body}

    setBoxList(tempBoxList);
    
  }


  return (
    <>
      {boxList.map((text,id)=>(
        <React.Fragment key={id} >
          {/* <input id={id.toString()} onChange={updateText} value={text}></input> */}
          <TestBox id={id} value={boxList[id]} changes={updateBoxState}></TestBox>
          <button id={id.toString()} onClick={remove}>X</button><br/>
        </React.Fragment>
      ))}
      <button onClick={add}>add</button>
    </>
  )
  
}

ReactDOM.render(<Main />, document.getElementById('main'));