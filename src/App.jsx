import { useEffect } from "react";
import { useTaskStore } from "./stores";
import { Header, AddItemForm, FilterBar, ItemList } from "./components";

export default function App() {
  const fetch = useTaskStore((s) => s.fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 px-5 py-12">
      <div className="mx-auto max-w-xl">
        <Header />
        <AddItemForm />
        <FilterBar />
        <ItemList />
      </div>
    </div>
  );
}
