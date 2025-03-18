"use client";

import { create } from "zustand";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import type { Session, User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/supabase-server";
import {
	getProfileAction,
	signOutAction,
	updateProfileAction,
} from "@/lib/actions/auth-actions";

// Buat client-side Supabase client
const supabase = createBrowserSupabaseClient();

interface AuthState {
	user: User | null;
	profile: Profile | null;
	session: Session | null;
	isLoading: boolean;
	error: string | null;

	// Actions
	initialize: () => Promise<void>;
	refreshProfile: () => Promise<void>;
	signOut: () => Promise<{ success: boolean; error?: any }>;
	updateProfile: (
		profile: Partial<Profile>
	) => Promise<{ error: Error | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	profile: null,
	session: null,
	isLoading: true,
	error: null,

	initialize: async (): Promise<void> => {
		try {
			// Get initial session from secure API endpoint
			const response = await fetch("/api/auth/session");
			const { session } = await response.json();

			set({
				session,
				user: session?.user ?? null,
				isLoading: false,
			});

			if (session?.user) {
				await get().refreshProfile();
			}

			// Set up auth state change listener
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange(async (_event, session) => {
				set({
					session,
					user: session?.user ?? null,
				});

				if (session?.user) {
					await get().refreshProfile();
				} else {
					set({ profile: null });
				}
			});

			// Clean up subscription on unmount
			subscription.unsubscribe();
		} catch (error) {
			console.error("Error initializing auth:", error);
			set({ isLoading: false, error: "Failed to initialize authentication" });
		}
	},

	refreshProfile: async () => {
		const { user } = get();

		if (!user) return;

		try {
			const { success, profile, error } = await getProfileAction(user.id);

			if (success && profile) {
				set({ profile: profile as Profile });
			} else if (error) {
				console.error("Error fetching profile:", error);
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	},

	signOut: async () => {
		set({ isLoading: true, error: null });

		try {
			// Gunakan server action untuk sign out
			const result = await signOutAction();

			// Reset state di client
			set({
				user: null,
				profile: null,
				session: null,
				isLoading: false,
				error: null,
			});

			return { success: true };
		} catch (error: any) {
			console.error("Error during sign out:", error);
			set({
				isLoading: false,
				error: error.message || "Failed to sign out",
			});
			return { success: false, error };
		}
	},

	updateProfile: async (profile) => {
		set({ isLoading: true, error: null });

		try {
			const { user } = get();

			if (!user) {
				throw new Error("User not authenticated");
			}

			// Buat FormData untuk server action
			const formData = new FormData();
			formData.append("userId", user.id);

			if (profile.full_name !== undefined) {
				formData.append("fullName", profile.full_name || "");
			}

			if (profile.username !== undefined) {
				formData.append("username", profile.username || "");
			}

			if (profile.website !== undefined) {
				formData.append("website", profile.website || "");
			}

			const { success, error } = await updateProfileAction(formData);

			if (success) {
				await get().refreshProfile();
			}

			set({ isLoading: false });
			return { error: error ? new Error(error) : null };
		} catch (error: any) {
			set({
				isLoading: false,
				error: error.message || "Failed to update profile",
			});
			return { error };
		}
	},
}));
