import { WorkerOptions, parentPort, workerData } from "node:worker_threads";
import sharp, { OutputInfo } from "sharp";
import { Product } from ".";

(async () => {
  const sequential = async (promises: Promise<any>[]) => {
    const results = [];
    for (const promise of promises) {
      results.push(await promise);
    }

    return results;
  };

  const cropBaseImage = async (
    imageBuffer: Buffer,
    info: OutputInfo,
    product: Product
  ) => {
    const { width, height, channels } = info;
    return await sharp(imageBuffer, { raw: { width, height, channels } })
      .extract({
        width: product.x2 - product.x1 + 1,
        height: product.y2 - product.y1 + 1,
        left: product.x1,
        top: product.y1,
      })
      .toBuffer();
  };

  const { products, parentBuffer } = workerData

  const promises = products.map(async (product: Product) => {
    return cropBaseImage(parentBuffer.data, parentBuffer.info, product);
  });

  const results = await sequential(promises);

  parentPort?.postMessage(results)
})();
