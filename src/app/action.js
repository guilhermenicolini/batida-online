"use server";

export async function add(formData) {
  if (formData.key !== process.env.APP_KEY) {
    return {
      ok: false,
      message: "Invalid key",
    };
  }

  const timestamp = new Date().valueOf();
  const accuracy =
    Math.floor(Math.random() * 5010000000000 + 5000000000000) / 10000000000;

  const response = await fetch(process.env.AHGORA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account: process.env.AHGORA_ACCOUNT,
      accuracy: accuracy,
      identification_type: "matricula_senha",
      identity: process.env.AHGORA_MACHINECODE,
      latitude: process.env.AHGORA_LATITUDE,
      longitude: process.env.AHGORA_LONGITUDE,
      logon: false,
      offline: false,
      origin: "chr",
      password: process.env.AHGORA_PASSWORD,
      provider: "network/wifi",
      timestamp: timestamp,
      timestamp_loc: timestamp,
      version: process.env.AHGORA_VERSION ?? "1.1.2",
    }),
  });

  const json = await response.json();

  return {
    ok: json.result,
    message: json.result ? "Batida adicionada com sucesso" : json.reason,
  };
}
