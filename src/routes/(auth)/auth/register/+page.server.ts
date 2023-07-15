import { fail } from '@sveltejs/kit';
import { object, string } from 'yup';

export async function load({ cookies, request }) {
	const id = cookies.get('userid');

	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}

	return {
		data: 'Export data from server'
	};
}

export const actions = {
	
	default: async ({ cookies, request }) => {
		//await new Promise((fulfil) => setTimeout(fulfil, 1000));
		const data = await request.formData();

		const userSchema = object({
			name: string().required().min(3).max(20),
			email: string().required().email(),
			password: string().min(8).max(20)
		});
		try {
			const user = await userSchema.validate(Object.fromEntries(data), { abortEarly: false });
			console.log(user);
		} catch (error) {
			//console.log(error);

			const errorBag = error.inner.map((err: { path: string; message: string; }) => {
				//console.log(err);
				return {
					field: err.path,
					message: err.message
				};
			});

			//console.log(errorBag);

			return fail(422, {
				name: data.get('name'),
				email: data.get('email'),
				error: error.message,
				errors: errorBag
			});
		}

		//db.createTodo(cookies.get('userid'), data.get('description'));
	}
};
