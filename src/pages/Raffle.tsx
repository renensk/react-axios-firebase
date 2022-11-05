import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export type Raffle = {
	[key: string]: any;
	name: string;
	createTime: string;
	updateTime: string;
	fields: {
		title: { stringValue: string };
		name: { stringValue: string };
		price: { integerValue: string };
		status: { stringValue: string };
		tag: { stringValue: string };
		lastModifiedAt: { timestampValue: string };
		createdAt: { timestampValue: string };
	};
};

export function Raffle() {
	document.title = "Rifa";

	const params = useParams();
	const currentUser = (params["*"] as string).substring(
		(params["*"] as string).lastIndexOf("/") + 1
	);

	const responseApi = async () => {
		const response = await api.get(`/${currentUser}`);
		return response.data;
	};

	const responseJson = async () => {
		const response = await axios.get("/data/raffle.json");
		return response.data;
	};

	// USING JSON FILE
	const { data, isFetching, error } = useQuery<Raffle>(
		["raffle", { currentUser }],
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
