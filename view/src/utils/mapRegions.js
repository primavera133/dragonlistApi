export const mapRegions = (country, countries) => {
  try {
    const { regions } = countries.find((c) => c.itemID === country)
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
