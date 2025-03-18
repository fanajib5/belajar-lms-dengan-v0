import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				async get(name) {
					const cookie = cookieStore.get(name);
					return cookie?.value;
				},
				set(name, value, options) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name, options) {
					cookieStore.set({ name, value: "", ...options });
				},
			},
		}
	);

	const { data } = await supabase.auth.getSession();

	return NextResponse.json({ session: data.session });
}
