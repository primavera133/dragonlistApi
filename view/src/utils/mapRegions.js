export const mapRegions = (countryCode, countries) => {
  try {
    const country = countries.find((c) => c.itemID === countryCode)
    if (!country) return []
    const { regions } = country
    const mappedRegions = regions.map((r) => ({
      id: r.toLowerCase(),
      name: r.charAt(0).toUpperCase() + r.slice(1),
    }))
    return mappedRegions
  } catch (error) {
    console.log(error)
    return []
  }
}
