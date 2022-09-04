import { JSDOM } from "jsdom";
import got from "got";

export default async function getBcvDom(): Promise<Document> {
  const result = await got.get("http://bcv.org.ve/");

  const dom = new JSDOM(result.body);
  const document = dom.window.document;

  return document;
}
