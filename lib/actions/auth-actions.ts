"use server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

// Helper untuk mendapatkan supabase server client dengan cookies
const getSupabaseServerClient = () => {
	const cookieStore = cookies();

	// Gunakan variabel lingkungan server-side
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				async get(name) {
					return (await cookieStore).get(name)?.value;
				},
				async set(name, value, options) {
					(await cookieStore).set({ name, value, ...options });
				},
				async remove(name, options) {
					(await cookieStore).set({ name, value: "", ...options });
				},
			},
		}
	);
};

// Server action untuk sign up
export async function signUpAction(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const fullName = formData.get("fullName") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: fullName,
				},
			},
		});

		if (error) {
			return { success: false, error: error.message };
		}

		if (data.user) {
			// Create profile record
			const { error: profileError } = await supabase.from("profiles").insert([
				{
					id: data.user.id,
					full_name: fullName,
					username: email.split("@")[0],
					avatar_url: null,
					updated_at: new Date().toISOString(),
				},
			]);

			if (profileError) {
				return { success: false, error: profileError.message };
			}
		}

		return {
			success: true,
			message:
				"Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.",
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal mendaftar. Silakan coba lagi.",
		};
	}
}

// Server action untuk sign in dengan password
export async function signInWithPasswordAction(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, user: data.user };
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Login gagal. Periksa email dan password Anda.",
		};
	}
}

// Server action untuk sign in dengan OTP
export async function signInWithOtpAction(formData: FormData) {
	const email = formData.get("email") as string;
	const redirectTo = (formData.get("redirectTo") as string) || "";

	const supabase = getSupabaseServerClient();

	try {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${
					process.env.NEXT_PUBLIC_SITE_URL
				}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
			},
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return {
			success: true,
			message: "Kode OTP telah dikirim ke email Anda.",
			redirectTo,
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal mengirim kode OTP. Silakan coba lagi.",
		};
	}
}

// Server action untuk verify OTP
export async function verifyOtpAction(formData: FormData) {
	const email = formData.get("email") as string;
	const token = formData.get("token") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { data, error } = await supabase.auth.verifyOtp({
			email,
			token,
			type: "email",
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, user: data.user };
	} catch (error: any) {
		return {
			success: false,
			error:
				error.message ||
				"Kode OTP tidak valid atau telah kedaluwarsa. Silakan coba lagi.",
		};
	}
}

// Server action untuk reset password
export async function resetPasswordAction(formData: FormData) {
	const email = formData.get("email") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return {
			success: true,
			message: "Instruksi reset password telah dikirim ke email Anda.",
		};
	} catch (error: any) {
		return {
			success: false,
			error:
				error.message ||
				"Gagal mengirim instruksi reset password. Silakan coba lagi.",
		};
	}
}

// Server action untuk update password
export async function updatePasswordAction(formData: FormData) {
	const password = formData.get("password") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { error } = await supabase.auth.updateUser({
			password,
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, message: "Password berhasil diperbarui!" };
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal memperbarui password. Silakan coba lagi.",
		};
	}
}

// Server action untuk sign out
export async function signOutAction() {
	const supabase = getSupabaseServerClient();

	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return { success: false, error: error.message };
		}

		redirect("/");
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal keluar. Silakan coba lagi.",
		};
	}
}

// Server action untuk get session
export async function getSessionAction() {
	const supabase = getSupabaseServerClient();

	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		return { session };
	} catch (error: any) {
		return { session: null, error: error.message };
	}
}

// Server action untuk get profile
export async function getProfileAction(userId: string) {
	const supabase = getSupabaseServerClient();

	try {
		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", userId)
			.single();

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, profile: data };
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal mengambil profil. Silakan coba lagi.",
		};
	}
}

// Server action untuk update profile
export async function updateProfileAction(formData: FormData) {
	const userId = formData.get("userId") as string;
	const fullName = formData.get("fullName") as string;
	const username = formData.get("username") as string;
	const website = formData.get("website") as string;

	const supabase = getSupabaseServerClient();

	try {
		const { error } = await supabase
			.from("profiles")
			.update({
				full_name: fullName,
				username,
				website,
				updated_at: new Date().toISOString(),
			})
			.eq("id", userId);

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, message: "Profil berhasil diperbarui" };
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Gagal memperbarui profil. Silakan coba lagi.",
		};
	}
}
