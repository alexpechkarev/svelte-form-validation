<script lang="ts">
	import type { SuiteResult } from 'vest';
	//https://www.youtube.com/watch?v=X2PuiawaGV4
	//https://codesandbox.io/s/svelte-vest-5-imnq9z?file=/Form.svelte:1753-2159
	import { enhance, applyAction } from '$app/forms';
	import classnames from 'vest/classnames';
	import suite from './suite';
	import Input from '$lib/components/Input.svelte';
	import { Button, Spinner } from 'flowbite-svelte';

	//export let form;

	let formState: { [name: string]: string; email: string } = {
		name: '',
		email: ''
	};
	let emailPending = false;
	let isProcessing = false;
	let result = suite.get();

	// Hadle the field input
	const handleChange = (field: string) => {
		result = suite(formState, field);

		if (field === 'email') {
			emailPending = true;
		}

		result.done('email', (res: SuiteResult) => {
			emailPending = false;
			result = res;
		});

	};

	$: cn = classnames(result, {
		//untested: 'is-untested', // will only be applied if the provided field did not run yet
		//tested: 'some-tested-class', // will only be applied if the provided field did run
		invalid: 'error', // will only be applied if the provided field ran at least once and has an error
		valid: 'success', // will only be applied if the provided field ran at least once does not have errors or warnings
		warning: 'warning' // will only be applied if the provided field ran at least once and has a warning
	});
	$: disabled = !result.isValid();

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="my-6">
	<div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<img
				class="mx-auto h-10 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
			<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Create new account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
			<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
				<form
					class="space-y-6"
					use:enhance={({ formElement, formData, action, cancel, submitter }) => {
						isProcessing = true;

						return async ({ result, update }) => {
							await update();
							// response has an error
							if(result.status == 422){
								
								for (const [key, value] of Object.entries(formState)) {
									if (formData.has(key)) {
										formState[key] = value;
										handleChange(key);
									}
								}
								isProcessing = false;
							}else{
								suite.reset();
							}
						};
					}}
					method="POST"
				>
					<!-- Name -->
					<div>
						<div class="mt-2">
							<Input
								name="name"
								label="Name"
								type="text"
								autocomplete="given-name"
								bind:value={formState.name}
								onInput={handleChange}
								validityClass={cn('name')}
								messages={result.getErrors('name').concat(result.getWarnings('name'))}
							/>
						</div>
					</div>

					<!-- Email -->
					<div>
						<div class="mt-2">
							<Input
								name="email"
								type="email"
								label="Email address"
								autocomplete="email"
								bind:value={formState.email}
								onInput={handleChange}
								pending={emailPending}
								validityClass={cn('email')}
								messages={result.getErrors('email')}
							/>
						</div>
					</div>

					<!-- Password -->
					<div>
						<div class="mt-2">
							<Input
								name="password"
								type="password"
								label="Password"
								bind:value={formState.password}
								onInput={handleChange}
								validityClass={cn('password')}
								messages={result.getErrors('password').concat(result.getWarnings('password'))}
							/>
						</div>
					</div>					

					<!-- Submit button -->
					<div>
						<Button type="submit" class="w-full" color="blue" disabled={disabled || isProcessing}>
							<div class:hidden={!isProcessing}>
								<Spinner class="mr-3" size="4" color="white" /> Processing...
							</div>
							<div class={isProcessing ? 'hidden' : 'inline-block'}>Register</div>
						</Button>
					</div>

					<!-- Social login -->
					<div>
						<div class="relative mt-10">
							<div class="absolute inset-0 flex items-center" aria-hidden="true">
								<div class="w-full border-t border-gray-200" />
							</div>
							<div class="relative flex justify-center text-sm font-medium leading-6">
								<span class="bg-white px-6 text-gray-900">Or continue with</span>
							</div>
						</div>

						<div class="mt-6 grid grid-cols-2 gap-4">
							<a
								href="#"
								class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path
										d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
									/>
								</svg>
								<span class="text-sm font-semibold leading-6">Twitter</span>
							</a>

							<a
								href="#"
								class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="text-sm font-semibold leading-6">GitHub</span>
							</a>
						</div>
					</div>
				</form>
			</div>

			<!-- Login link -->
			<p class="mt-10 text-center text-sm text-gray-500">
				Have an account?
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="/auth/login" class="leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
			</p>
		</div>
	</div>
</div>

<style>
	:global(html) {
		height: 100%;
	}
	:global(body) {
		background-color: #f3f4f6;
		height: 100%;
	}

	form {
		--color-error: rgb(220 38 38);
		--color-warning: rgb(249 115 22);
		--color-success: rgb(22 163 74);
		--color-content-active: #5081a6;
		--color-content-semi: #89b8dd;
		--color-content-inactive: #cfe3f0;
	}
</style>
