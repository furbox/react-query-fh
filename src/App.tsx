import "./App.css";
import { useRandom } from "./hooks/useRandom";

export const App = () => {
  const query = useRandom();

  return (
    <div className="App App-header">
      {query.isFetching ? <h1>Loading...</h1> : <h2>hola: {query.data}</h2>}
      {!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        Actualizar
      </button>
    </div>
  );
};
