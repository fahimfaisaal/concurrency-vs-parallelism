import { ioTask, loop } from "./tasks.mjs";
const isIOTasks = process.argv.includes('--io')

console.time('Single-thread');
await Promise.all(
  Array.from(
    { length: process.env.TASKS || 1 },
    (_, task) => isIOTasks
      ? ioTask(`Task: ${task + 1}`)
      : loop(`Task: ${task + 1}`)
  )
);
console.timeEnd('Single-thread');
