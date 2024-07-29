/* =====================
 * FORMAT QUERY OBJECTS TO STRING FOR URL
 * ===================== */

function objectToQuery(obj: Record<string, any>) {
    if (!obj) {
      throw Error("objectToQuery expects an object");
    }
    return Object.entries(obj).reduce((query, cur) => {
      const [key, value] = cur;
      if (Array.isArray(value)) {
        query.append(key, `[${value}]`);
      } else if (value !== "") {
        query.set(key, value);
      }
      return query;
    }, new URLSearchParams());
  }
  
  export function getQueryToString(query: Record<string, any>) {
    if (!query) {
      return objectToQuery({}).toString();
    }
    return objectToQuery(query).toString();
  }
  

  export function formatAmount(amount: number | string, fixed = 0) {
    const suffixes = [
      ["B", 1000000000],
      ["M", 1000000],
      ["K", 1000],
      // Add more suffixes as needed... it should be from large to small
    ] as const;
  
    for (const [suffix, value] of suffixes) {
      if (+amount >= value) {
        const newAmount = +amount / value;
        return (
          (newAmount % 1 === 0
            ? newAmount?.toString()
            : newAmount.toFixed(fixed)) + suffix
        );
      }
    }
  
    return Number.isInteger(amount)
      ? amount?.toString()
      : Number(amount)?.toFixed(fixed);
  }