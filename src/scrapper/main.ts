import type { Handler } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { config as dotenvConfig } from "dotenv";

import getBcvDom from "./getBcvDom";
import scrapDate from "./scrapDate";
import scrapFiatReference from "./scrapFiatReference";

dotenvConfig();
const { DATABASE_URL, SUPABASE_SERVICE_API_KEY } = process.env;
let supabase: any;

if (DATABASE_URL && SUPABASE_SERVICE_API_KEY) {
  supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
}

const handler: Handler = async (event) => {
  console.log("Received event", event.path);

  const document = await getBcvDom();

  if (!document) {
    throw new Error("NoDom");
  }

  const date = scrapDate(document);
  const dollar = scrapFiatReference("dolar", document);
  const euro = scrapFiatReference("euro", document);

  const referenceData = {
    date,
    dollar,
    euro,
  };

  const { data, error } = await supabase
    .from("reference")
    .insert({ data: referenceData });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ response: data }),
  };
};

module.exports.handler = schedule("@hourly", handler);
