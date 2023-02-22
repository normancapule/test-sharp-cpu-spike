import sharp, { OutputInfo } from "sharp";
import { Worker } from "node:worker_threads";
import fs from "node:fs";

export type Product = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const products: Product[] = [
  { x1: 1929, x2: 2086, y1: 1137, y2: 1447 },
  { x1: 896, x2: 1052, y1: 720, y2: 1038 },
  { x1: 2561, x2: 2688, y1: 1075, y2: 1435 },
  { x1: 247, x2: 404, y1: 2065, y2: 2429 },
  { x1: 2681, x2: 2805, y1: 1077, y2: 1427 },
  { x1: 1157, x2: 1501, y1: 2462, y2: 2695 },
  { x1: 1505, x2: 1838, y1: 2440, y2: 2658 },
  { x1: 1623, x2: 1819, y1: 145, y2: 301 },
  { x1: 774, x2: 1126, y1: 2465, y2: 2712 },
  { x1: 2331, x2: 2551, y1: 2078, y2: 2336 },
  { x1: 972, x2: 1132, y1: 2057, y2: 2399 },
  { x1: 1649, x2: 1825, y1: 690, y2: 1030 },
  { x1: 630, x2: 777, y1: 2047, y2: 2424 },
  { x1: 1042, x2: 1348, y1: 2763, y2: 2940 },
  { x1: 1178, x2: 1329, y1: 1599, y2: 1947 },
  { x1: 1243, x2: 1394, y1: 2061, y2: 2379 },
  { x1: 396, x2: 629, y1: 3013, y2: 3425 },
  { x1: 1848, x2: 2040, y1: 155, y2: 299 },
  { x1: 2197, x2: 2496, y1: 2408, y2: 2643 },
  { x1: 1620, x2: 1820, y1: 305, y2: 436 },
  { x1: 2362, x2: 2496, y1: 1104, y2: 1440 },
  { x1: 1470, x2: 1650, y1: 699, y2: 1028 },
  { x1: 2506, x2: 2786, y1: 2386, y2: 2591 },
  { x1: 202, x2: 404, y1: 1725, y2: 1978 },
  { x1: 2107, x2: 2234, y1: 1129, y2: 1443 },
  { x1: 1850, x2: 2039, y1: 312, y2: 448 },
  { x1: 1640, x2: 1876, y1: 1588, y2: 1934 },
  { x1: 495, x2: 640, y1: 2063, y2: 2420 },
  { x1: 1224, x2: 1375, y1: 713, y2: 1037 },
  { x1: 679, x2: 889, y1: 332, y2: 577 },
  { x1: 2069, x2: 2267, y1: 447, y2: 564 },
  { x1: 1405, x2: 1545, y1: 2034, y2: 2330 },
  { x1: 891, x2: 1034, y1: 3093, y2: 3463 },
  { x1: 1350, x2: 1545, y1: 39, y2: 292 },
  { x1: 764, x2: 946, y1: 2041, y2: 2420 },
  { x1: 102, x2: 254, y1: 2079, y2: 2428 },
  { x1: 1874, x2: 2195, y1: 2427, y2: 2664 },
  { x1: 424, x2: 587, y1: 703, y2: 1048 },
  { x1: 1848, x2: 2045, y1: 445, y2: 567 },
  { x1: 711, x2: 910, y1: 108, y2: 333 },
  { x1: 635, x2: 807, y1: 3172, y2: 3555 },
  { x1: 1472, x2: 1637, y1: 1591, y2: 1938 },
  { x1: 1921, x2: 2150, y1: 1584, y2: 1930 },
  { x1: 2083, x2: 2417, y1: 3173, y2: 3419 },
  { x1: 2288, x2: 2411, y1: 791, y2: 1012 },
  { x1: 731, x2: 865, y1: 718, y2: 1043 },
  { x1: 743, x2: 901, y1: 1640, y2: 1953 },
  { x1: 2062, x2: 2256, y1: 180, y2: 322 },
  { x1: 2155, x2: 2336, y1: 1515, y2: 1725 },
  { x1: 2061, x2: 2197, y1: 785, y2: 1023 },
  { x1: 1538, x2: 1770, y1: 3199, y2: 3525 },
  { x1: 1611, x2: 1825, y1: 441, y2: 569 },
  { x1: 1062, x2: 1211, y1: 735, y2: 1037 },
  { x1: 22, x2: 257, y1: 1218, y2: 1368 },
  { x1: 921, x2: 1125, y1: 103, y2: 323 },
  { x1: 2066, x2: 2256, y1: 325, y2: 449 },
  { x1: 35, x2: 270, y1: 1362, y2: 1504 },
  { x1: 416, x2: 625, y1: 1662, y2: 1968 },
  { x1: 2350, x2: 2601, y1: 1515, y2: 1729 },
  { x1: 109, x2: 299, y1: 699, y2: 1052 },
  { x1: 2670, x2: 2872, y1: 1658, y2: 1926 },
  { x1: 1, x2: 200, y1: 2552, y2: 2930 },
  { x1: 962, x2: 1101, y1: 1640, y2: 1950 },
  { x1: 784, x2: 923, y1: 2991, y2: 3387 },
  { x1: 0, x2: 127, y1: 2079, y2: 2425 },
  { x1: 1138, x2: 1342, y1: 39, y2: 306 },
  { x1: 248, x2: 428, y1: 2939, y2: 3315 },
  { x1: 1360, x2: 1559, y1: 313, y2: 566 },
  { x1: 1674, x2: 1929, y1: 1111, y2: 1323 },
  { x1: 2158, x2: 2340, y1: 1720, y2: 1928 },
  { x1: 2871, x2: 3016, y1: 2282, y2: 2536 },
  { x1: 931, x2: 1140, y1: 323, y2: 573 },
  { x1: 1758, x2: 2063, y1: 3202, y2: 3433 },
  { x1: 2394, x2: 2632, y1: 3100, y2: 3425 },
  { x1: 1042, x2: 1388, y1: 3152, y2: 3547 },
  { x1: 2347, x2: 2517, y1: 1725, y2: 1926 },
  { x1: 839, x2: 1137, y1: 1099, y2: 1481 },
  { x1: 261, x2: 565, y1: 1348, y2: 1507 },
  { x1: 1145, x2: 1351, y1: 317, y2: 568 },
  { x1: 247, x2: 558, y1: 1243, y2: 1368 },
  { x1: 1778, x2: 1975, y1: 2908, y2: 3117 },
  { x1: 1154, x2: 1434, y1: 1321, y2: 1477 },
  { x1: 2044, x2: 2362, y1: 3105, y2: 3189 },
  { x1: 224, x2: 530, y1: 1122, y2: 1265 },
  { x1: 2011, x2: 2340, y1: 2841, y2: 2916 },
  { x1: 1140, x2: 1408, y1: 1112, y2: 1269 },
  { x1: 1438, x2: 1663, y1: 1134, y2: 1357 },
  { x1: 2490, x2: 2675, y1: 1723, y2: 1920 },
  { x1: 2019, x2: 2342, y1: 2914, y2: 2992 },
  { x1: 2040, x2: 2358, y1: 2983, y2: 3077 },
  { x1: 1953, x2: 2227, y1: 2150, y2: 2349 },
  { x1: 1520, x2: 1773, y1: 2189, y2: 2370 },
  { x1: 2010, x2: 2346, y1: 2774, y2: 2845 },
  { x1: 2426, x2: 2809, y1: 325, y2: 565 },
  { x1: 1040, x2: 1367, y1: 2916, y2: 3183 },
  { x1: 29, x2: 245, y1: 357, y2: 577 },
  { x1: 2363, x2: 2582, y1: 2756, y2: 2942 },
  { x1: 1679, x2: 1924, y1: 1319, y2: 1464 },
  { x1: 2849, x2: 3013, y1: 2703, y2: 2991 },
  { x1: 1867, x2: 1972, y1: 2022, y2: 2150 },
  { x1: 1516, x2: 1773, y1: 3014, y2: 3195 },
  { x1: 2802, x2: 3018, y1: 3150, y2: 3430 },
  { x1: 1435, x2: 1681, y1: 1333, y2: 1468 },
  { x1: 1594, x2: 1869, y1: 2004, y2: 2165 },
  { x1: 2793, x2: 3018, y1: 769, y2: 997 },
  { x1: 2414, x2: 2832, y1: 641, y2: 998 },
  { x1: 1816, x2: 1911, y1: 731, y2: 1027 },
  { x1: 1166, x2: 1248, y1: 2070, y2: 2338 },
  { x1: 1, x2: 170, y1: 3105, y2: 3611 },
  { x1: 2333, x2: 2551, y1: 2931, y2: 3055 },
  { x1: 2621, x2: 2810, y1: 3134, y2: 3435 },
  { x1: 0, x2: 115, y1: 1684, y2: 1962 },
  { x1: 2867, x2: 3015, y1: 1928, y2: 2203 },
  { x1: 1961, x2: 2105, y1: 2021, y2: 2147 },
];

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

const sequential = async (promises: Promise<any>[]) => {
  const results = [];
  for (const promise of promises) {
    results.push(await promise);
  }

  return results;
};
const runTest = async (parentBuffer: { data: Buffer; info: OutputInfo }) => {
  const start = Date.now().valueOf();
  const promises = products.map(async (product) => {
    return cropBaseImage(parentBuffer.data, parentBuffer.info, product);
  });
  await sequential(promises);

  console.log(`Done - ${Date.now().valueOf() - start}ms`);
};

const runWorkerTest = async (parentBuffer: { data: Buffer; info: OutputInfo }) => {
  const start = Date.now().valueOf();
  const response = await new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: { products, parentBuffer },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
  console.log(`Done - ${Date.now().valueOf() - start}ms`);
  console.log((response as unknown[]).length);
}

const runMe = async () => {
  const parentBuffer = await sharp("./sample.jpeg")
    .rotate()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // const promises = [];
  // for (let i = 0; i < 1; i++) {
  //   promises.push(runTest(parentBuffer));
  // }

  // return Promise.allSettled(promises);

  await runWorkerTest(parentBuffer)

};

(async () => {
  await runMe();
})();
