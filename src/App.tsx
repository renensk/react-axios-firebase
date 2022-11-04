import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Raffle } from "./pages/Raffle";
import { Raffles } from "./pages/Raffles";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/users" element={<Raffles />} />
			<Route path="/users/*" element={<Raffle />} />
		</Routes>
	);
}
