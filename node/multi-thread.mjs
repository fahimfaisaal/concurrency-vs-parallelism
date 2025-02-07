import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import { loop } from './tasks.mjs';
import { fileURLToPath } from 'url';

if (isMainThread) {
  const createWorker = (label) => new Promise((resolve, reject) => {
    const worker = new Worker(
      fileURLToPath(import.meta.url), { workerData: { label } }
    );

    worker.on('message', resolve);

    worker.on('error', (error) => {
      console.error(`Error in worker: ${error}`);
      reject();
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
        reject();
      }
    });
  })
  console.time('Multi-thread');
  await Promise.all(
    Array.from(
      { length: +process.env.TASKS || 1 },
      (_, task) => createWorker(`Task: ${task + 1}`)
    )
  );
  console.timeEnd('Multi-thread');
} else {
  loop(workerData.label);
  parentPort.postMessage(`Worker ${workerData.label} done`);
}





