import type { dateType } from "../types";

export default function scrapDate(document: Document): dateType {
  const dateElement =
    document?.querySelector(".pull-right.dinpro.center")?.textContent?.trim() ??
    "";
  const dateArray = dateElement.replace("Fecha Valor: ", "").split(",");

  const referenceDate = {
    dayName: dateArray[0].trim(),
    date: dateArray[1].trim(),
  };

  return referenceDate;
}
