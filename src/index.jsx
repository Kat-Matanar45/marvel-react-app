import { createRoot } from "react-dom/client";
import App from "@/components/app/App.jsx";
import MarvelService from "./services/MarvelService";
import "@/style/style.scss";

const marvelService = new MarvelService();

marvelService.getAllCharacters().then(res => console.log(res));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
