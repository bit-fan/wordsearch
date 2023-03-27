import { createWorker } from "tesseract.js";

export const parseImage = async (uri, logger) => {
  const worker = await createWorker({
    logger: (m) => logger(m), // Add logger here
  });
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  console.log("uri", uri);
  const {
    data: { text },
  } = await worker.recognize(
    uri || "https://tesseract.projectnaptha.com/img/eng_bw.png"
  );
  console.log(text);
  await worker.terminate();
  return text;
};
