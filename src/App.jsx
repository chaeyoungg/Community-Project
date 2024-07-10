import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
