import * as React from "react";

const StoreContext = React.createContext(null);


//Создали в 44 уроке для работы с контекстом
//Упрощает передачу контекста
//Такая же компонента в React-Redux
export const Provider = (props) => {
  return <StoreContext.Provider value={props.store}>
    {props.children}
  </StoreContext.Provider>

}

export default StoreContext;