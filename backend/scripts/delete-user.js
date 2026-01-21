// Script to delete a user from Supabase Auth
// Usage: node delete-user.js <user-email>

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pisxaqaxcoisvsthvxhx.supabase.co";
// ⚠️ Replace with your SERVICE ROLE key (NOT anon key)
// Get it from: Supabase Dashboard > Project Settings > API > service_role key
const serviceRoleKey = "YOUR_SERVICE_ROLE_KEY_HERE";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const email = process.argv[2];

if (!email) {
  console.error("Usage: node delete-user.js <email>");
  process.exit(1);
}

async function deleteUserByEmail(email) {
  try {
    // Get user by email
    const {
      data: { users },
      error: listError,
    } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return;
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      console.log(`No user found with email: ${email}`);
      return;
    }

    // Delete user
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("Error deleting user:", error);
    } else {
      console.log(`✅ User ${email} (${user.id}) deleted successfully`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

deleteUserByEmail(email);
