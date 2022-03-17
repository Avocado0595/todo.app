//test useEffect with return
import { useEffect, useState } from 'react'

const UnMountComponent = ()=>{
  useEffect(()=>{
    console.log('hello');
    return ()=>{
        console.log('bye');
    }
},[])
return <h1>Un mount me</h1>
}

export default function UnMount() {
    const [isExist, setIsExist] = useState(true);
  return (
    <div>
      {isExist && <UnMountComponent/>}
      <button onClick={()=>setIsExist(!isExist)}>Hide me</button>
    </div>

  )
}
