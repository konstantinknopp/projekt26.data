import { useEffect } from "react";
import { useItemStore } from "./stores";
import { Header, AddItemForm, FilterBar, ItemList } from "./components";

export default function App() {
  const fetchItems = useItemStore((s) => s.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div style={{ padding: "48px 20px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <Header />
        <AddItemForm />
        <FilterBar />
        <ItemList />
      </div>
    </div>
  );
}
