export const useApi = async (
  path: string,
  options: any = {},
  withAuth: boolean = false
) => {
  const config = useRuntimeConfig()
  const url = `${config.public.API_BASE_URL}/${path}`
  console.log(url)

  if (withAuth) {
    const token = useCookie("token")
    options.headers = {
      ...(options.headers || {}),
      Authorization: token.value ? `Bearer ${token.value}` : undefined,
    }
  }

  try {
    return await $fetch(url, options)
  } catch (error: any) {
    const errData = error?.response?._data

    // If API sent a clear message or validation errors, flatten it
    if (errData?.message || errData?.errors) {
      throw errData // so you can directly access `err.message` and `err.errors`
    }

    // Otherwise, throw the original error
    throw error
  }
}
