import { redirect } from "@sveltejs/kit";


export async function load({ cookies }) {
    
    const id = cookies.get('userid');

    if (!id) {
        throw redirect(303,'/auth/register');
    }

    return {
        data: 'Export data from server'
    };
}

