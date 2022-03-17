import Context from '@mui/base/TabsUnstyled/TabsContext';
import React, { createContext, useState } from 'react'
import Level2 from './Level2';

export default function Level1() {
    const [num, setNum] = useState<Number>(0);
    const NumContext = createContext<Number>(num);
  return (
      <NumContext.Provider value={num}>
    <div>Level1
        <Level2/>
    </div>
        </NumContext.Provider>
  )
}
