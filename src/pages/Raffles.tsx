import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export type Usuario = {
	name: string;
};

export type Raffle = {
	name: string;
	price: number;
	title: string;
	tag: string;
	createTime: string;
};

export function Raffles() {
	const { data, isFetching, error } = useQuery<Raffle[]>(
		"users",
		async () => {
			var data: Raffle[] | PromiseLike<Raffle[]> = [];
			const response = await api
				.get("/projects/rifas-335115/databases/(default)/documents/rifas/")
				.then((response) => {
					data = response.data.documents;
				});
			return data;
		},
		{ staleTime: 10000 * 60 }
	);

	if (error) {
		console.error(error);
		return <div>Error!</div>;
	}

	console.log("Data is an: ", typeof data);
	console.log(data);

	return (
		<ul>
			{isFetching && <p>Carregando...</p>}
			{data?.map((raffle) => {
				return (
					<li key={raffle.name}>
						<Link to={`/users/${raffle.name}`}>{raffle.name}</Link>
						<p>{raffle.price}</p>
						<p>{raffle.tag}</p>
					</li>
				);
			})}
		</ul>
	);
}
