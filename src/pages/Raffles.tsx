import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export type Raffles = {
	name: string;
	updateTime: string;
	createTime: string;
};

export function Raffles() {
	const responseApi = async () => {
		const response = await api.get("/");
		return response.data.documents;
	};

	const responseJson = async () => {
		const response = await axios.get("/data/raffles.json");
		return response.data.documents;
	};

	const { data, isFetching, error } = useQuery<Raffles[]>(
		"raffles",
		responseJson,
		{ staleTime: 1000 * 60 }
	);

	if (error) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<ul>
			{isFetching && <p>Carregando...</p>}
			{data?.map((raffle) => {
				return (
					<li key={raffle.name}>
						<Link to={`/raffles/${raffle.name}`}>
							{raffle.name.substring(raffle.name.lastIndexOf("/") + 1)}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
