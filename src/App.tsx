import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Raffle } from "./pages/Raffle";
import { Raffles } from "./pages/Raffles";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/raffles" element={<Raffles />} />
			<Route path="/raffles/*" element={<Raffle />} />
		</Routes>
	);
}
