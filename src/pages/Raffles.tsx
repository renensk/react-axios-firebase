import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export type Usuario = {
	name: string;
};

export type Raffles = [
	{
		name: string;
		updateTime: string;
		createTime: string;
	}
];

export function Raffles() {
	const { data, isFetching, error } = useQuery<Raffles[]>(
		"raffles",
		async () => {
			var data: Raffles[] | PromiseLike<Raffles[]> = [];

			const response = await axios.get("/data/raffles.json").then((response) => {
				data = response.data.documents;
			});

			//using firebase api
			// const response = await api.get("/").then((response) => {
			// 	data = response.data.documents;
			// });

			return data;
		},
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
