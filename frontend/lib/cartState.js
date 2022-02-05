import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  // this is our own custom provider! we will store data (State) and functionality (updates) in here and anyone can access it via consumber!

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };
  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <LocalStateProvider
      value={{ cartOpen, openCart, closeCart, toggleCartOpen }}
    >
      {" "}
      {children}{" "}
    </LocalStateProvider>
  );
};

//make a custom hook for accessing the card local state
const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { CartStateProvider, useCart };
