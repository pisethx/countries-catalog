import { configure, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useGetCountries from './use-get-countries'
import { SortDirection } from '../../../types'

configure({ asyncUtilTimeout: 20000 })

describe('useGetCountries', () => {
  it('should fetch countries', async () => {
    const pagination = { search: '', page: 1, sort: SortDirection.DEFAULT }
    const { result } = renderHook(() => useGetCountries(pagination))

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0)
    })
  })

  it('should filter countries by search query', async () => {
    const pagination = { search: 'Cambo', page: 1, sort: SortDirection.DEFAULT }
    const { result } = renderHook(() => useGetCountries(pagination))

    await waitFor(() => {
      expect(result.current.data[0].name.common).toBe('Cambodia')
    })
  })

  it('should paginate countries', async () => {
    const pagination = { search: '', page: 2, sort: SortDirection.DEFAULT }
    const { result } = renderHook(() => useGetCountries(pagination))

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0)
    })
  })

  it('should sort countries by name in ascending order', async () => {
    const pagination = {
      search: '',
      page: 1,
      sort: SortDirection.ASCENDING
    }
    const { result } = renderHook(() => useGetCountries(pagination))

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0)

      const sortedCountries = result.current.data
        .slice()
        .sort((a, b) => a.name.official.localeCompare(b.name.official))

      expect(sortedCountries).toEqual(result.current.data)
    })
  })

  it('should sort countries by name in descending order', async () => {
    const pagination = {
      search: '',
      page: 1,
      sort: SortDirection.DESCENDING
    }
    const { result } = renderHook(() => useGetCountries(pagination))

    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0)

      const sortedCountries = result.current.data
        .slice()
        .sort((a, b) => b.name.official.localeCompare(a.name.official))

      expect(sortedCountries).toEqual(result.current.data)
    })
  })
})
