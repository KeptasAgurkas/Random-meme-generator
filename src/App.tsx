import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/header";
import { Meme } from "./components/meme";
import { ChatProvider, MemeProvider, Sample } from "./context";
const client = new QueryClient();

function UserLength() {
  const l = Sample();
  return l;
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <MemeProvider>
        <ChatProvider>
          <UserLength></UserLength>
        </ChatProvider>
        <div className="grid gap-8">
          <Header />
          <Meme />
        </div>
      </MemeProvider>
    </QueryClientProvider>
  );
}

export default App;
