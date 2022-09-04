import type { referenceType } from "../types";

export default function scrapFiatReference(
  fiat: string,
  document: Document
): referenceType {
  const element = document.getElementById(fiat);
  const elementTextContent = element?.textContent?.trim() ?? "";
  const dataString = elementTextContent
    .replaceAll("\n", "")
    .replaceAll(" ", "")
    .replaceAll("	", "-");
  const dataArray = dataString.split("-");
  const currency = dataArray[0];
  const value = parseFloat(dataArray[1].replace(",", "."));
  const formatedValue = new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "VES",
  }).format(value);

  return {
    currency,
    value,
    formatedValue,
  };
}
