import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('batchtoken');
  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });
  return next(newRequest);
};
