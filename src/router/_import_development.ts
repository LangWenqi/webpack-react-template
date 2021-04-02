const sync = (file: string) => require(`@/views/${file}`).default;
export default sync;