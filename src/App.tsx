import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/header";
import { Meme } from "./components/meme";
import { ChatProvider, MemePricingGuard, MemeProvider } from "./context";
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <MemeProvider>
        <ChatProvider></ChatProvider>
        <div className="grid gap-8">
          <Header />
          <Meme />
        </div>
      </MemeProvider>
    </QueryClientProvider>
  );
}

export default App;
