import { procedure, router } from '../init';

export const hello = router({
  there: procedure.query(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'Hello there!';
  })
});
