import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";

import { queryClient } from "./lib/react-query";
import { ContactList } from "./features/contacts/components/ContactList";
import { ContactInfoPage } from "./features/contacts/components/ContactInfoPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Routes>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contacts/edit" element={<ContactInfoPage />} />
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </Provider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
