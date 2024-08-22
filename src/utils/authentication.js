import { supabase } from "@/config/supabase"; 

export async function isUserLoggedIn() {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		console.error("Erro ao verificar autenticação:", error.message);
		return false;
	}

	return !!user; 
}
