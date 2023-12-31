import { create, test, enforce, only, include, warn } from 'vest';
//https://github.com/validatorjs/validator.js
import isEmail from 'validator/lib/isEmail';
//import isMobilePhone from 'validator/es/lib/isMobilePhone';
import wait from 'wait';


enforce.extend({ isEmail });

const suite = create((data = {}, currentField = undefined) => {

	if(typeof currentField !== 'undefined'){
		only(currentField);
	}
	include('confirm').when('password');

	test('name', 'Name is required', () => {
		enforce(data.name).isNotBlank();
	});

	test('name', 'name must be at least 3 characters', () => {
		enforce(data.name).longerThan(2);
	});

	
	test('email', 'Email is required', () => {
		enforce(data.email).isNotBlank();
	});
	
	test('email', 'email must be valid email address', () => {
		enforce(data.email).isEmail(); 
	});    

	test.memo('email', 'email address already registered', async () => await doesUserExist(data.email), [data.email]);

	test('password', 'Password is required', () => {
		enforce(data.password).isNotEmpty();
	});

	test('password', 'Password must be at least 5 chars', () => {
		enforce(data.password).longerThanOrEquals(5);
	});

	test('password', 'Password is weak. Maybe add a number?', () => {
		warn();
		enforce(data.password).matches(/[0-9]/);
	});

	// skipWhen(!data.confirm, () => {
	// 	test('confirm', 'Passwords do not match', () => {
	// 		enforce(data.password).equals(data.confirm);
	// 	});
	// });

	// test('tos', () => {
	// 	enforce(data.tos).isTruthy();
	// });
});

export default suite;


/**
 * @param {string} email
 */
async function doesUserExist(email: string) {
	await wait(1000);

	console.log('checking if user email address exists');
	// fake taken username.
	enforce(parseInt(btoa(email), 36) % 3).notEquals(0);
}

