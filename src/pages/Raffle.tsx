import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Usuario } from "./Raffles";

export type Raffle = {
	[key: string]: any;
	name: string;
	createTime: string;
	updateTime: string;
	fields: {
		title: {
			stringValue: string;
		};
		name: {
			stringValue: string;
		};
		price: {
			integerValue: string;
		};
		status: {
			stringValue: string;
		};
		tags: {
			stringValue: string;
		};
		lastModifiedAt: {
			timestampValue: string;
		};
		createdAt: {
			timestampValue: string;
		};
	};
};

export function Raffle() {
	const params = useParams();
	const currentUser = (params["*"] as string).substring(
		(params["*"] as string).lastIndexOf("/") + 1
	);

	//using firebase api
	const { data, isFetching, error } = useQuery<Raffle[]>(
		"raffle",
		async () => {
			var data: Raffle | PromiseLike<Raffle> = [];

			const response = await axios.get("/data/raffle.json").then((response) => {
				data = response.data;
			});

			//using firebase api
			// const response = await api.get(`/${currentUser}`).then((response) => {
			// 	data = response.data;
			// });

			return data;
		},
		{ staleTime: 1000 * 60 }
	);

	// const fatchRaffle = (): Promise<Raffle[]> =>
	// 	api.get(`/${currentUser}`).then((response) => response.data);

	// const { data, isFetching, error } = useQuery(
	// 	["raffle", { currentUser }],
	// 	fatchRaffle
	// );

	if (error) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<ul>
			{isFetching && <p>Carregando...</p>}
			{data && (
				<li key={data.name}>
					<p>ID: {data.name.substring(data.name.lastIndexOf("/") + 1)}</p>
					<p>Title: {data.fields.title.stringValue}</p>
					<p>`Create time: {data.fields.createdAt.timestampValue}`</p>
					<p>{data.fields.tag.stringValue}</p>
				</li>
			)}
		</ul>
	);
}
