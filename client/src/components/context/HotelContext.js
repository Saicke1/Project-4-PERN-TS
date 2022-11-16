import React, { createContext } from 'react';

export const stateHotelContext = createContext();

const HotelContext = (props) => {

    

  return (
    <div>
      <stateHotelContext.Provider>
        {props.children}
      </stateHotelContext.Provider>
    </div>
  )
}

export default HotelContext
