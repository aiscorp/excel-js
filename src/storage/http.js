
export const useHttp = () => {
  const loading = () => {} // state()
  const setLoading = () => {} // state()
  const error = () => {} // state(null)
  const setError = () => {} // state(null)

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unexpected error')
      }

      setLoading(false)

      //
    } catch (e) {
      console.error('Error in useHttp.request()', e)
      setLoading(false)
      setError(e.message)
    }
  }

  const clearError = () => setError(null)

  return {loading, request, error}
}
