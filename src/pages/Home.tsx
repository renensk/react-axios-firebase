import reactLogo from "../assets/react.svg";
import "../App.css";

export function Home() {
	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://axios-http.com/" target="_blank">
					<img src="/axios.svg" className="logo axios" alt="React logo" />
				</a>
				<a href="https://firebase.com/" target="_blank">
					<img src="/firebase.svg" className="logo firebase" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React + Axios + Firebase</h1>

			<p></p>
		</div>
	);
}
