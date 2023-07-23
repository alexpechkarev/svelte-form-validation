<script>
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';

	onMount(async () => {
		const fetchImage = async () => {
			const http = axios.create({
				method: 'POST',
				baseURL: 'https://bpbcrmdev.bpbltd.com',
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true
			});
			//axios.defaults.withCredentials = true;
			//await axios.get('https://bpbcrmdev.bpbltd.com/sanctum/csrf-cookie')

			return await http.post('/login', {
				email: 'alex.petchkarev@bpbltd.com',
				password: 'password'
			});
		};
		console.log(fetchImage());
	});
</script>

<div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
	</Alert>
</div>
