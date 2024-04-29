import { useSelector, useDispatch } from "react-redux";
import {
  selectEnzyme,
  greyOutEnzyme,
  // resetEnzyme,
} from "../features/enzymesSlice";
import {
  toggleExclude3PrimeOverhangs,
  toggleExclude5PrimeOverhangs,
  toggleExcludeBluntEnds,
  toggleExcludeAs,
  toggleExcludeCs,
  toggleExcludeGs,
  toggleExcludeTs,
  // toggleExcludeAmbiguousBases,
  toggleExcludeNs,
  toggleExcludeWs,
  toggleExcludeSs,
  toggleExcludeMs,
  toggleExcludeKs,
  toggleExcludeRs,
  toggleExcludeYs,
  toggleExcludeBs,
  toggleExcludeDs,
  toggleExcludeHs,
  toggleExcludeVs,
  toggleExcludeMethylationSensitive,
  toggleExcludeMethylationInsensitive,
} from "../features/settingsSlice";

function EnzymeSelection() {
  // Grab State from Redux Store
  const settingsState = useSelector((store) => store.settings);
  const enzymesState = useSelector((store) => store.enzymes);
  const enzymesList = Object.keys(enzymesState);

  // Create Dispatcher to Dispatch Actions to Redux Store
  const dispatch = useDispatch();

  // Precompute various enzyme sets
  const enzymesWith3PrimeOverhangs = new Set(
    enzymesList.filter(
      (enzyme) => enzymesState[enzyme].overhang === "3' overhang",
    ),
  );

  const enzymesWith5PrimeOverhangs = new Set(
    enzymesList.filter(
      (enzyme) => enzymesState[enzyme].overhang === "5' overhang",
    ),
  );

  const enzymesWithBluntEnds = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].overhang === "blunt"),
  );

  const enzymesWithAs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("A")),
  );

  const enzymesWithCs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("C")),
  );

  const enzymesWithGs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("G")),
  );

  const enzymesWithTs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("T")),
  );

  // const ambiguousBasesPattern = /[NWSMKRYBDHV]/;
  // const enzymesWithAmbiguousBases = new Set(
  //   enzymesList.filter((enzyme) =>
  //     ambiguousBasesPattern.test(enzymesState[enzyme].site),
  //   ),
  // );

  const enzymesWithNs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("N")),
  );

  const enzymesWithWs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("W")),
  );

  const enzymesWithSs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("S")),
  );

  const enzymesWithMs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("M")),
  );

  const enzymesWithKs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("K")),
  );

  const enzymesWithRs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("R")),
  );

  const enzymesWithYs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("Y")),
  );

  const enzymesWithBs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("B")),
  );

  const enzymesWithDs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("D")),
  );

  const enzymesWithHs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("H")),
  );

  const enzymesWithVs = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].site.includes("V")),
  );

  const enzymesWithMethylationSensitive = new Set(
    enzymesList.filter((enzyme) => enzymesState[enzyme].is_methylable),
  );

  const enzymesWithMethylationInsensitive = new Set(
    enzymesList.filter((enzyme) => !enzymesState[enzyme].is_methylable),
  );

  // Compute if all ambiguous bases are excluded (this is used to determine if the "Exclude all ambiguous bases" checkbox should be checked)
  const allAmbiguousBasesExcluded =
    settingsState.excludeNs &&
    settingsState.excludeWs &&
    settingsState.excludeSs &&
    settingsState.excludeMs &&
    settingsState.excludeKs &&
    settingsState.excludeRs &&
    settingsState.excludeYs &&
    settingsState.excludeBs &&
    settingsState.excludeDs &&
    settingsState.excludeHs &&
    settingsState.excludeVs;

  // Compute if all non-greyed out enzymes are selected (this is used to determine if the "Select Visible" button should turn into "Deslect Visible")
  const allNonGreyedOutEnzymesSelected = enzymesList.every((enzyme) => {
    const { greyed_out_by, is_selected } = enzymesState[enzyme];
    if (!greyed_out_by.length) {
      return is_selected;
    } else {
      return true;
    }
  });

  // Compute if all enzymes are greyed out (this is used to determine if the "Select Visible" button should be inactive)
  const allEnzymesGreyedOut = enzymesList.every(
    (enzyme) => enzymesState[enzyme].greyed_out_by.length,
  );

  // Compute the number of selected enzymes
  const numSelectedEnzymes = enzymesList.reduce((acc, enzyme) => {
    if (enzymesState[enzyme].is_selected) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  // Create Handlers for Dispatching Actions to Redux Store
  function handleSelectEnzyme(enzyme) {
    if (!enzyme) return;
    dispatch(selectEnzyme(enzyme));
  }

  function handleGreyOutEnzyme({ enzyme, setting }) {
    if (!enzyme || !setting) return;
    dispatch(greyOutEnzyme({ enzyme, setting }));
  }

  function handleToggleExclude3PrimeOverhangs() {
    dispatch(toggleExclude3PrimeOverhangs());
    for (const enzyme of enzymesWith3PrimeOverhangs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "toggleExclude3PrimeOverhangs",
      });
    }
  }

  function handleToggleExclude5PrimeOverhangs() {
    dispatch(toggleExclude5PrimeOverhangs());
    for (const enzyme of enzymesWith5PrimeOverhangs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "toggleExclude5PrimeOverhangs",
      });
    }
  }

  function handleToggleExcludeBluntEnds() {
    dispatch(toggleExcludeBluntEnds());
    for (const enzyme of enzymesWithBluntEnds) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "toggleExcludeBluntEnds",
      });
    }
  }

  function handleToggleExcludeAs() {
    dispatch(toggleExcludeAs());
    for (const enzyme of enzymesWithAs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeAs",
      });
    }
  }

  function handleToggleExcludeCs() {
    dispatch(toggleExcludeCs());
    for (const enzyme of enzymesWithCs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeCs",
      });
    }
  }

  function handleToggleExcludeGs() {
    dispatch(toggleExcludeGs());
    for (const enzyme of enzymesWithGs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeGs",
      });
    }
  }

  function handleToggleExcludeTs() {
    dispatch(toggleExcludeTs());
    for (const enzyme of enzymesWithTs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeTs",
      });
    }
  }

  function handleToggleExcludeAmbiguousBases() {
    console.log("allAmbiguousBasesExcluded: ", allAmbiguousBasesExcluded);
    if (!settingsState.excludeNs) handleToggleExcludeNs();
    console.log("settingsState.excludeNs: ", settingsState.excludeNs);
    if (!settingsState.excludeWs) handleToggleExcludeWs();
    console.log("settingsState.excludeWs: ", settingsState.excludeWs);
    if (!settingsState.excludeSs) handleToggleExcludeSs();
    console.log("settingsState.excludeSs: ", settingsState.excludeSs);
    if (!settingsState.excludeMs) handleToggleExcludeMs();
    console.log("settingsState.excludeMs: ", settingsState.excludeMs);
    if (!settingsState.excludeKs) handleToggleExcludeKs();
    console.log("settingsState.excludeKs: ", settingsState.excludeKs);
    if (!settingsState.excludeRs) handleToggleExcludeRs();
    console.log("settingsState.excludeRs: ", settingsState.excludeRs);
    if (!settingsState.excludeYs) handleToggleExcludeYs();
    console.log("settingsState.excludeYs: ", settingsState.excludeYs);
    if (!settingsState.excludeBs) handleToggleExcludeBs();
    console.log("settingsState.excludeBs: ", settingsState.excludeBs);
    if (!settingsState.excludeDs) handleToggleExcludeDs();
    console.log("settingsState.excludeDs: ", settingsState.excludeDs);
    if (!settingsState.excludeHs) handleToggleExcludeHs();
    console.log("settingsState.excludeHs: ", settingsState.excludeHs);
    if (!settingsState.excludeVs) handleToggleExcludeVs();
    console.log("settingsState.excludeVs: ", settingsState.excludeVs);
    // if all are true, then set all to false

    if (
      settingsState.excludeNs &&
      settingsState.excludeWs &&
      settingsState.excludeSs &&
      settingsState.excludeMs &&
      settingsState.excludeKs &&
      settingsState.excludeRs &&
      settingsState.excludeYs &&
      settingsState.excludeBs &&
      settingsState.excludeDs &&
      settingsState.excludeHs &&
      settingsState.excludeVs
    ) {
      handleToggleExcludeNs();
      handleToggleExcludeWs();
      handleToggleExcludeSs();
      handleToggleExcludeMs();
      handleToggleExcludeKs();
      handleToggleExcludeRs();
      handleToggleExcludeYs();
      handleToggleExcludeBs();
      handleToggleExcludeDs();
      handleToggleExcludeHs();
      handleToggleExcludeVs();
    }
  }

  function handleToggleExcludeNs() {
    dispatch(toggleExcludeNs());
    for (const enzyme of enzymesWithNs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeNs",
      });
    }
  }

  function handleToggleExcludeWs() {
    dispatch(toggleExcludeWs());
    for (const enzyme of enzymesWithWs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeWs",
      });
    }
  }

  function handleToggleExcludeSs() {
    dispatch(toggleExcludeSs());
    for (const enzyme of enzymesWithSs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeSs",
      });
    }
  }

  function handleToggleExcludeMs() {
    dispatch(toggleExcludeMs());
    for (const enzyme of enzymesWithMs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeMs",
      });
    }
  }

  function handleToggleExcludeKs() {
    dispatch(toggleExcludeKs());
    for (const enzyme of enzymesWithKs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeKs",
      });
    }
  }

  function handleToggleExcludeRs() {
    dispatch(toggleExcludeRs());
    for (const enzyme of enzymesWithRs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeRs",
      });
    }
  }

  function handleToggleExcludeYs() {
    dispatch(toggleExcludeYs());
    for (const enzyme of enzymesWithYs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeYs",
      });
    }
  }

  function handleToggleExcludeBs() {
    dispatch(toggleExcludeBs());
    for (const enzyme of enzymesWithBs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeBs",
      });
    }
  }

  function handleToggleExcludeDs() {
    dispatch(toggleExcludeDs());
    for (const enzyme of enzymesWithDs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeDs",
      });
    }
  }

  function handleToggleExcludeHs() {
    dispatch(toggleExcludeHs());
    for (const enzyme of enzymesWithHs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeHs",
      });
    }
  }

  function handleToggleExcludeVs() {
    dispatch(toggleExcludeVs());
    for (const enzyme of enzymesWithVs) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeVs",
      });
    }
  }

  function handleToggleExcludeMethylationSensitive() {
    dispatch(toggleExcludeMethylationSensitive());
    for (const enzyme of enzymesWithMethylationSensitive) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeMethylationSensitive",
      });
    }
  }

  function handleToggleExcludeMethylationInsensitive() {
    dispatch(toggleExcludeMethylationInsensitive());
    for (const enzyme of enzymesWithMethylationInsensitive) {
      if (enzymesState[enzyme].is_selected) handleSelectEnzyme(enzyme);
      handleGreyOutEnzyme({
        enzyme: enzyme,
        setting: "handleToggleExcludeMethylationInsensitive",
      });
    }
  }

  function handleSelectVisibleEnzymes() {
    for (const enzyme of enzymesList) {
      const { greyed_out_by, is_selected } = enzymesState[enzyme];

      // If enzyme is greyed out or not all non-greyed-out enzymes are selected, skip it
      if (
        greyed_out_by.length ||
        (!allNonGreyedOutEnzymesSelected && is_selected)
      ) {
        continue;
      }

      handleSelectEnzyme(enzyme);
    }
  }

  return (
    <div className="flex gap-12">
      <div className="flex h-[calc(75vh-3.25rem)] flex-grow flex-col">
        <div className="flex items-center justify-between gap-3">
          <h1 className="mb-2 text-3xl">Enzyme Selection</h1>
          <h2 className="ml-4 text-2xl">
            {" "}
            {`${numSelectedEnzymes} enzyme${
              numSelectedEnzymes !== 1 ? "s" : ""
            } selected`}
          </h2>
        </div>
        <div className="flex-grow overflow-y-scroll rounded-md border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enzymesList.map((enzyme, index) => (
              <div key={index} className="r flex items-center p-4">
                <input
                  type="checkbox"
                  className="h-8 w-10 flex-shrink-0"
                  checked={enzymesState[enzyme].is_selected}
                  onChange={() => handleSelectEnzyme(enzyme)}
                  disabled={Boolean(enzymesState[enzyme].greyed_out_by.length)}
                />
                {/* If enzyme is_greyed out is true color the enzyme grey */}
                <span
                  className={`ml-4 text-2xl ${
                    enzymesState[enzyme].greyed_out_by.length
                      ? "text-gray-400"
                      : ""
                  }`}
                >
                  {enzyme}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h1 className="mb-2 text-3xl">Settings</h1>
        <div className="mb-3">
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by overhangs:
          </h2>
          <div className="r flex items-center p-1">
            <input
              type="checkbox"
              className="h-8 w-10 flex-shrink-0 "
              checked={settingsState.exclude_3_prime_overhangs}
              onChange={handleToggleExclude3PrimeOverhangs}
            />
            <span className="ml-4 text-2xl">No 3&apos; overhangs</span>
          </div>
          <div className="r flex items-center p-1">
            <input
              type="checkbox"
              className="h-8 w-10 flex-shrink-0 "
              checked={settingsState.exclude_5_prime_overhangs}
              onChange={handleToggleExclude5PrimeOverhangs}
            />
            <span className="ml-4 text-2xl">No 5&apos; overhangs</span>
          </div>
          <div className="r flex items-center p-1">
            <input
              type="checkbox"
              className="h-8 w-10 flex-shrink-0 "
              checked={settingsState.excludeBluntEnds}
              onChange={handleToggleExcludeBluntEnds}
            />
            <span className="ml-4 text-2xl">No blunt ends</span>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by restriction sites:
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={settingsState.excludeAs}
                onChange={handleToggleExcludeAs}
              />
              <span className="ml-4 text-2xl">No A&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={settingsState.excludeCs}
                onChange={handleToggleExcludeCs}
              />
              <span className="ml-4 text-2xl">No C&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={settingsState.excludeGs}
                onChange={handleToggleExcludeGs}
              />

              <span className="ml-4 text-2xl">No G&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={settingsState.excludeTs}
                onChange={handleToggleExcludeTs}
              />

              <span className="ml-4 text-2xl">No T&apos;s</span>
            </div>
          </div>
          <div className="my-4 ml-4 grid grid-cols-1 gap-4">
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeAmbiguousBases ||
                  allAmbiguousBasesExcluded
                }
                onChange={handleToggleExcludeAmbiguousBases}
              />
              <span className="ml-4 text-2xl">Exclude all ambiguous bases</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeNs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeNs}
              />
              <span className="ml-4 text-2xl">No N&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeWs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeWs}
              />
              <span className="ml-4 text-2xl">No W&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeSs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeSs}
              />
              <span className="ml-4 text-2xl">No S&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeMs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeMs}
              />
              <span className="ml-4 text-2xl">No M&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeKs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeKs}
              />
              <span className="ml-4 text-2xl">No K&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeRs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeRs}
              />
              <span className="ml-4 text-2xl">No R&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeYs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeYs}
              />
              <span className="ml-4 text-2xl">No Y&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeBs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeBs}
              />
              <span className="ml-4 text-2xl">No B&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeDs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeDs}
              />
              <span className="ml-4 text-2xl">No D&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeHs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeHs}
              />
              <span className="ml-4 text-2xl">No H&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input
                type="checkbox"
                className="h-8 w-10 flex-shrink-0 "
                checked={
                  settingsState.excludeVs || settingsState.excludeAmbiguousBases
                }
                disabled={settingsState.excludeAmbiguousBases}
                onChange={handleToggleExcludeVs}
              />
              <span className="ml-4 text-2xl">No V&apos;s</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by methylation:
          </h2>
          <div className="r flex items-center p-1">
            <input
              type="checkbox"
              className="h-8 w-10 flex-shrink-0 "
              checked={settingsState.excludeMethylationSensitive}
              onChange={handleToggleExcludeMethylationSensitive}
            />
            <span className="ml-4 text-2xl">Methylation sensitive</span>
          </div>
          <div className="r flex items-center p-1">
            <input
              type="checkbox"
              className="h-8 w-10 flex-shrink-0 "
              checked={settingsState.excludeMethylationInsensitive}
              onChange={handleToggleExcludeMethylationInsensitive}
            />
            <span className="ml-4 text-2xl">Methylation insensitive</span>
          </div>
        </div>
        {/* Add button to select visible */}
        <div className="flex justify-center">
          {/* Conditionally render the button */}
          {allEnzymesGreyedOut ? (
            <button
              className="rounded-md bg-gray-400 px-4 py-2 text-2xl font-medium text-gray-300"
              disabled
            >
              Select Visible
            </button>
          ) : (
            <button
              className="rounded-md px-4 py-2 text-2xl font-medium text-white"
              style={{ backgroundColor: "var(--primary-shade)" }}
              onClick={handleSelectVisibleEnzymes}
            >
              {allNonGreyedOutEnzymesSelected
                ? "Deselect Visible"
                : "Select Visible"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnzymeSelection;
