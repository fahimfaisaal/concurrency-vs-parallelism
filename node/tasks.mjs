export async function loop(label) {
  console.info(`Start ${label}`);
  for (let i = 0; i < 1e11; i++) {
    // Do nothing
  }
  console.info(`End ${label}`);
}

export async function ioTask(label) {
  console.info(`Start ${label}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.info(`End ${label}`);
      resolve(label);
    }, 5e3);
  })
}
