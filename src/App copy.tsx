import { useEffect, useReducer, useState } from "react";
import "./App.css";

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const data = await res.text();
  return +data;
};

export const App = () => {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [key, forceReFetch] = useReducer((x) => x + 1, 0)


  useEffect(() => {
    setIsLoading(true);
    //setError("");
    //setNumber(0);
    getRandomNumberFromApi()
      .then((number) => setNumber(number))
      .catch((err) => setError(err.message));
  }, [key]);

  useEffect(() => {
    if (number) {
      setIsLoading(false);
    }
  }, [number]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className="App App-header">
      {isLoading ? <h1>Loading...</h1> : <h2>hola: {number}</h2>}
      {!isLoading && error && (<h3>{error}</h3>)}

      <button onClick={forceReFetch} disabled={isLoading}>Actualizar</button>
    </div>
  );
};
