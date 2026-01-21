// Delete a Supabase Auth user by email using the service role key (admin only)
// Usage: SUPABASE_SERVICE_ROLE_KEY=... node delete-user.mjs <email>
// Requires: SUPABASE_URL set (or uses VITE_SUPABASE_URL fallback)

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://pisxaqaxcoisvsthvxhx.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY (service role). Get it from Supabase Dashboard > Settings > API > service_role key.",
  );
  process.exit(1);
}

if (!supabaseUrl) {
  console.error("Missing SUPABASE_URL");
  process.exit(1);
}

const email = process.argv[2];
if (!email) {
  console.error(
    "Usage: SUPABASE_SERVICE_ROLE_KEY=... node delete-user.mjs <email>",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`Searching user with email: ${email}`);
  const { data, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    console.error("Error listing users:", listError);
    process.exit(1);
  }

  const user = data.users.find((u) => u.email === email);
  if (!user) {
    console.log(`No user found with email: ${email}`);
    return;
  }

  // Clean related rows before deleting auth user to avoid FK/RLS issues
  console.log(
    "Cleaning related data (exercise_progress, streaks, profiles)...",
  );
  const client = supabase;

  const { error: delProgressError } = await client
    .from("exercise_progress")
    .delete()
    .eq("user_id", user.id);
  if (delProgressError) {
    console.error("Error deleting exercise_progress:", delProgressError);
  }

  const { error: delStreaksError } = await client
    .from("streaks")
    .delete()
    .eq("user_id", user.id);
  if (delStreaksError) {
    console.error("Error deleting streaks:", delStreaksError);
  }

  const { error: delProfileError } = await client
    .from("profiles")
    .delete()
    .eq("id", user.id);
  if (delProfileError) {
    console.error("Error deleting profile:", delProfileError);
  }

  console.log(`Deleting auth user ${email} (${user.id})...`);
  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
  if (deleteError) {
    console.error("Error deleting user:", deleteError);
    process.exit(1);
  }

  console.log("✅ User deleted successfully");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
