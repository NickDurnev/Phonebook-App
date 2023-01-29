import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(
  error: unknown
): error is { data:{message: string}, status: number } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error && typeof (error as any).data === 'object' &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}