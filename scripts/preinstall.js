if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn('please use pnpm manage packages');

  process.exit(1);
}
