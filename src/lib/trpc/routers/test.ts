import { procedure, router } from '../init';

export const test = router({
  helloThere: procedure.query(async () => {
    return 'Hello there! :)';
  })
});
