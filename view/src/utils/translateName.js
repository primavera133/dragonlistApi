export const translateName = (scientificName, species, language) => {
  const specie = species.filter((sp) => sp.scientific_name === scientificName)[0] ?? []
  return specie[language][0] ?? scientificName
}
