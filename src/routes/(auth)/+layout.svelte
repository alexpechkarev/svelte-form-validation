<script>
	import "@/auth.css";
	import { onMount } from 'svelte';
	let hFull = 'h-full';
	onMount(() => {
		document.documentElement.classList.add(hFull);
		document.body.classList.add(hFull);
		return () => {
			document.documentElement.classList.remove(hFull);
			document.body.classList.remove(hFull);
		};
	});	
</script>


<div class="p-4">
	<main>
		<slot />
	</main>

	<footer>
		
	</footer>
</div>

