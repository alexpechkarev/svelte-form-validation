<script>
	import { Icon, ExclamationCircle, CheckCircle } from 'svelte-hero-icons';
	//https://github.com/schum123/svelte-loading-spinners#readme
	import { Jumper } from 'svelte-loading-spinners';

	export let value = '';
	export let label = '';
	export let name = '';
	export let pending = false;
	export let autocomplete = 'off';
	/**
	 * @type {string}
	 */
	 export let type;

	/**
	 * @param {HTMLInputElement} node
	 */
	function typeAction(node){
		node.type = type || 'text';
		}

	/**
	 * @type {string | any[]}
	 */
	export let messages = [];
	/**
	 * @type {any}
	 */
	export let validityClass;
	export let onInput = (/** @type {string} */ value) => {};
</script>

<div class:pending class={`${validityClass}`}>
	<div class="flex justify-between">
		<div>
			<label for={name} class="text-sm font-medium leading-6 text-gray-900 flex justify-between">
				<strong>{label}</strong>
			</label>
		</div>

		<div>
			{#if messages.length}
				<span class="text-sm text-red-600">{messages[0]}</span>
			{/if}
		</div>
	</div>

	<div class="relative mt-2 rounded-md shadow-sm">
		<input
			{name}
			use:typeAction
			{autocomplete}
			bind:value
			on:input={() => onInput(name)}
			class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		/>
		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 status">
			{#if validityClass === 'error'}
				<Icon src={ExclamationCircle} class="h-5 w-5 text-red-500" solid />
			{:else if validityClass === 'success'}
				<Icon src={CheckCircle} class="h-5 w-5 text-green-500" solid />
			{/if}
			{#if pending && validityClass !== 'error' && validityClass !== 'success'}
				<Jumper size="30" color="#FF3E00" unit="px" duration="1s" />
			{/if}
		</div>
	</div>
</div>

<style>
	
	.success input {
		/* border: 1px solid var(--color-success); */
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
			var(--color-success);
		color: var(--color-success);
	}

	.warning input {
		/* border: 1px solid var(--color-warning); */
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
			var(--color-warning);
		color: var(--color-warning);
	}

	.error input {
		/* border: 1px solid var(--color-error); */
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
			var(--color-error) !important;
		color: var(--color-error) !important;;
	}
	.warning input:focus {
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--color-warning);
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(var(--color-warning) / var(--tw-ring-opacity));
	}
	.error input:focus {
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--color-error);
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(var(--color-error) / var(--tw-ring-opacity));
	}
	.success input:focus {
		box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--color-success);
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(var(--color-success) / var(--tw-ring-opacity));
	}
</style>
