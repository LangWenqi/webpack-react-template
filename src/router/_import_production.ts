import asyncPage from '@/router/asyncPage';
const lazy = (file: string) => asyncPage(() => import(`@/views/${file}`));
export default lazy;