<script>
	
	import { enhance, applyAction } from '$app/forms';
	import { get } from 'svelte/store';
	export let form;
	let creating = false;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Log in" />
</svelte:head>

<div class="text-center my-6">
	<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<img
				class="mx-auto h-10 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
			<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Sign in to your account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			{#if form?.error}
				<p class="error">{form.error}</p>
				<pre>{JSON.stringify(form)}</pre>
			{/if}
			<form
				class="space-y-6"
				action="?/login"
				method="POST"
				use:enhance={(e) => {
					creating = true;
					//console.log('_______executing success enhance',e.formData.get('email'))
					return async ({ update }) => {
						await update();
						creating = false;
					};
				}
			}
			>
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>Email address</label
					>
					<div class="mt-2">
						<input
							disabled={creating}
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							value={form?.email ?? ''}
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
							>Password</label
						>
						<div class="text-sm">
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
								>Forgot password?</a
							>
						</div>
					</div>
					<div class="mt-2">
						<input
							disabled={creating}
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70"
						/>
					</div>
				</div>

				<div>
					<button
						disabled={creating}
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
						>
						<span class={creating ? '' : 'hidden'}>
						<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						  </svg>
						  Processing...
						</span>
						<span class={creating ? 'hidden' : ''}>Sign in</span>
						</button
					>
				</div>
			</form>

			<p class="mt-10 text-center text-sm text-gray-500">
				Not a member?
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="/auth/register" class="leading-6 text-indigo-600 hover:text-indigo-500"
					>Create new account</a
				>
			</p>
		</div>
	</div>
</div>
