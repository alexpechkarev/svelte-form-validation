import { fail, redirect } from '@sveltejs/kit';
import { object, string } from 'yup';
import suite from './suite';

export async function load({ cookies, request }) {
	const id = cookies.get('userid');

	// if (!id) {
	// 	cookies.set('userid', crypto.randomUUID(), { path: '/' });
	// }

	return {
		data: 'Export data from server'
	};
}

export const actions = {
	
	default: async ({ cookies, request }) => {

		const data = await request.formData();
		const formData = Object.fromEntries(data);
		
		let result = suite.get();
		const serversideStatelessCheck = (formData: { [k:string]:FormDataEntryValue }) =>{
			return suite(formData);
		}
		result = serversideStatelessCheck(formData);
		console.log(result.getErrors());



		if(!result.isValid()){
			return fail(422, {
				name: data.get('name'),
				email: data.get('email'),
				error: 'Validation error',
				errors: result.getErrors()
			});
		}


		//cookies.set('userid', crypto.randomUUID(), { path: '/' });
		cookies.set('userid', 'alexp', { path: '/' });
		console.log(formData)

		throw redirect(303,'/dashboard');
		// const userSchema = object({
		// 	name: string().required().min(3).max(20),
		// 	email: string().required().email(),
		// 	//password: string().min(8).max(20)
		// });
		// try {
		// 	const user = await userSchema.validate(formData, { abortEarly: false });
		// 	console.log(user);
		// } catch (error) {
		// 	//console.log(error);

		// 	const errorBag = error.inner.map((err: { path: string; message: string; }) => {
		// 		//console.log(err);
		// 		return {
		// 			field: err.path,
		// 			message: err.message
		// 		};
		// 	});

		// 	//console.log(errorBag);

		// 	return fail(422, {
		// 		name: data.get('name'),
		// 		email: data.get('email'),
		// 		error: error.message,
		// 		errors: errorBag
		// 	});
		//}

		//db.createTodo(cookies.get('userid'), data.get('description'));
	}
};
