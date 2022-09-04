import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;
let supabase: any;

if (DATABASE_URL && SUPABASE_SERVICE_API_KEY) {
  supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
}

const handler: Handler = async () => {
  const {
    data: reference,
    error,
    id,
  } = await supabase
    .from("reference")
    .select("id, data")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ response: reference, id }),
  };
};

export { handler };
