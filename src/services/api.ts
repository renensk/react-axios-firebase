import axios from "axios";

export const api = axios.create({
	baseURL: "https://firestore.googleapis.com/v1/",
});
