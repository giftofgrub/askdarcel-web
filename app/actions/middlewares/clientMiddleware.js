export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [
      PENDING,
      SUCCESS,
      FAILURE] = action.types;

    next({ ...rest, type: REQUEST });
    const actionPromise = promise(client);
    actionPromise.then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE }),
    ).catch(error => {
      next({ ...rest, error, type: FAILURE });
    });

    return actionPromise;
  };
}
