import axios from 'axios';
import { API_TOKEN } from '$env/static/private';

export async function handle({ event, resolve }) {
	if (typeof event.cookies.get('XSRF-TOKEN') === 'undefined') {
		console.log('set cookies');
		const http = axios.create({
			method: 'POST',
			withCredentials: true,
			baseURL: 'https://bpbcrmdev.bpbltd.com',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_TOKEN}`
			}
		});
		const rsp = await http.get('/get-xsrf-token');
		//console.log(rsp.data);
		event.cookies.set('XSRF-TOKEN', rsp.data.token);
	}

	const response = await resolve(event);
	return response;
}
