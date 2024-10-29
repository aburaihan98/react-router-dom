import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  createContactsActions,
  deleteContactAction,
  editContactAction,
  favoriteUpdateAction,
} from "./actions/contactsActions";
import ErrorPage from "./ErrorPage";
import "./index.css";
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoaders";
import Contact from "./routes/Contact";
import EditContact from "./routes/EditContact";
import Index from "./routes/Index";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactsActions,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: getContactLoader,
            action: favoriteUpdateAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
