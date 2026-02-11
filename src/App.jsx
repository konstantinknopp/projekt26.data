import { useEffect } from "react";
import { useItemStore } from "./stores";
import { Header, AddItemForm, FilterBar, ItemList } from "./components";

export default function App() {
  const fetchItems = useItemStore((s) => s.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
