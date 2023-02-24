import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import { loadAllCurrencies } from './features/currencies/currencies-slice';
import Header from './UI/Header';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(loadAllCurrencies());
    return () => promise.abort();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
