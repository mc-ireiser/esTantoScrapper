import type { Handler } from "@netlify/functions";
import type { referenceType } from "../types";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode: 403,
    };
  }

  const isVes: boolean = JSON.parse(event.body).isVes;
  const amount: number = JSON.parse(event.body).amount;
  const reference: referenceType = JSON.parse(event.body).reference;

  if (!amount || !reference) {
    return {
      statusCode: 403,
    };
  }

  if (isVes as boolean) {
    const result = new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: reference.currency,
    }).format((amount as number) / reference.value);
    return {
      statusCode: 200,
      body: JSON.stringify({ response: result }),
    };
  }

  if (!isVes as boolean) {
    const result = new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "VES",
    }).format((amount as number) * reference.value);
    return {
      statusCode: 200,
      body: JSON.stringify({ response: result }),
    };
  }

  return {
    statusCode: 500,
  };
};

export { handler };
