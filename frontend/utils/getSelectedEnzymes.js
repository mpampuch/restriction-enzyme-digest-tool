export function getSelectedEnzymeNames(enzymes) {
  const selectedEnzymeNames = [];

  // Iterate over each enzyme
  for (const enzymeName in enzymes) {
    const enzyme = enzymes[enzymeName];
    if (enzyme.is_selected) selectedEnzymeNames.push(enzymeName);
  }

  return selectedEnzymeNames;
}
