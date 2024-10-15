import { useDispatch, useSelector } from 'react-redux';
import { ErrorType } from '../../shared/models/error.type';
import React, { useEffect } from 'react';
import { fetchIngredientsThunk } from '../../services/actions/burger-ingredients';
import { UnknownAction } from 'redux';

export function NotFoundPage() {
  const dispatch = useDispatch();
  const error = useSelector(
    (state: { error?: ErrorType }) => state?.error?.message
  );

  useEffect(() => {
    dispatch(fetchIngredientsThunk() as unknown as UnknownAction);
  }, [dispatch]);

  return <>{error ? <h1>{error}</h1> : null}</>;
}
