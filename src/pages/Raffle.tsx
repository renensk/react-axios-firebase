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
	};
};

export function Raffle() {
	const params = useParams();
	const currentUser = params["*"] as string;

	{
		/* 
	const queryClient = useQueryClient();

	const { data, isFetching, error } = useQuery<Raffle[]>(
		["user", { currentUser }],
		async () => {
			const response = await api.get(`/${currentUser}`);
			return response.data;
		},
		{ staleTime: 10000 * 60 }
	);
	*/
	}

	const fatchRaffle = (): Promise<Raffle[]> =>
		api.get(`/${currentUser}`).then((response) => response.data);

	const { data, isFetching, error } = useQuery(
		["raffle", { currentUser }],
		fatchRaffle
	);

	if (error) {
		console.error(error);
		return <div>Error!</div>;
	}

	return (
		<ul>
			{isFetching && <p>Carregando...</p>}
			{data && (
				<li key={data.name}>
					<p>{data.name}</p>
					<p>{data.fields.title.stringValue}</p>
					<p>`Create time: ${data.createTime}`</p>
					<p>{data.fields.tag.stringValue}</p>
				</li>
			)}
		</ul>
	);
}
