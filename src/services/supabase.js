import { createClient } from "@supabase/supabase-js";
import { generateRandomSixDigitNumber } from "./utils";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabaseUrl = "https://gpcuhwvxzanawuankpty.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY3Vod3Z4emFuYXd1YW5rcHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzQ4ODMsImV4cCI6MjA0ODc1MDg4M30.06q5m1iGDJ6ZGm6v8xY2G4s1GIiGoPvSyuN4zWMzn8E";

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

async function answerQuestion(questionId, answerText) {
  try {
    const body = { question_id: questionId, answer_text: answerText };
    const { error } = await supabase.from("answers").insert([body]).select();

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
  answerQuestion,
};
