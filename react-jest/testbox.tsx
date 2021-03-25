import React, { createRef } from 'react'


type testprops = {
  changes: any;
  id: number;
  value: {title: string, body: string}
}
export const TestBox: React.FC<testprops> = ({id, value, changes}) => {

  const bodyRef = createRef<HTMLInputElement>();
  const titleRef = createRef<HTMLInputElement>();

  const handleChange = () => {
    
    changes({
      id: id,
      title: titleRef.current?.value,
      body: bodyRef.current?.value
    });
  }


  return (
    <React.Fragment>
      <input type="text" className="title" value={value.title} ref={titleRef} onChange={handleChange}></input>
      <input type="text" className="body" value={value.body} ref={bodyRef} onChange={handleChange}></input>
    </React.Fragment>
  )
};
