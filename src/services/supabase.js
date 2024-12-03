import { createClient } from "@supabase/supabase-js";
import { generateRandomSixDigitNumber } from "./utils";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function isExistingEmail(email) {
  const { data: signups, error } = await supabase
    .from("signups")
    .select("*")
    .eq("email", email);
  if (error) {
    throw error;
  }
  if (signups && signups.length) {
    return signups[0];
  }
  return null;
}

async function register(fullName, email) {
  const existing = await isExistingEmail(email);
  if (existing) {
    return {
      data: existing,
    };
  }

  const regId = `WIT-${generateRandomSixDigitNumber()}`;
  try {
    const body = { full_name: fullName, email, reg_id: regId };
    const { error } = await supabase.from("signups").insert([body]).select();

    return {
      data: body,
      error,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export const apiClient = {
  register,
  isExistingEmail,
};
