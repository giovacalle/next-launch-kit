import { procedure, router } from '../init';

export const manager = router({
  canAddResources: procedure.query(async () => {
    return true;
  })
});
