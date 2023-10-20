import { useSelector, useDispatch } from "react-redux";
import {
  selectEnzyme,
  // greyOutEnzyme,
  // resetEnzyme,
} from "../features/enzymesSlice";

function EnzymeSelection() {
  const enzymesState = useSelector((store) => store.enzymes);
  const enzymesList = Object.keys(enzymesState);

  const dispatch = useDispatch();

  function handleSelectEnzyme(enzyme) {
    if (!enzyme) return;
    dispatch(selectEnzyme(enzyme));
  }

  // function handleGreyOutEnzyme(enzyme) {
  //   if (!enzyme) return;
  //   dispatch(greyOutEnzyme(enzyme));
  // }

  return (
    <div className="flex gap-12">
      <div className="flex h-[calc(75vh-3.25rem)] flex-grow flex-col">
        <h1 className="mb-2 text-3xl">Enzyme Selection</h1>

        <div className="flex-grow overflow-y-scroll rounded-md border">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enzymesList.map((enzyme, index) => (
              <div key={index} className="r flex items-center p-4">
                <input
                  type="checkbox"
                  className="h-8 w-10 flex-shrink-0"
                  checked={enzymesState[enzyme].is_selected}
                  onChange={() => handleSelectEnzyme(enzyme)}
                />
                <span className="ml-4 text-2xl">{enzyme}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <h1 className="mb-2 text-3xl">Settings</h1>
        <div>
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by overhangs:
          </h2>
          <div className="r flex items-center p-1">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
            <span className="ml-4 text-2xl">No 3&apos; overhangs</span>
          </div>
          <div className="r flex items-center p-1">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
            <span className="ml-4 text-2xl">No 5&apos; overhangs</span>
          </div>
          <div className="r flex items-center p-1">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
            <span className="ml-4 text-2xl">No blunt ends</span>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by restriction sites:
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No A&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No C&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No G&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No T&apos;s</span>
            </div>
          </div>
          <div className="my-4 ml-4 grid grid-cols-1 gap-4">
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">Exclude all ambiguous bases</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No N&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No W&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No S&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No M&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No K&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No R&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No Y&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No B&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No D&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No H&apos;s</span>
            </div>
            <div className="r flex items-center p-1">
              <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
              <span className="ml-4 text-2xl">No V&apos;s</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-medium underline">
            Exclude Enzymes by methylation:
          </h2>
          <div className="r flex items-center p-1">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
            <span className="ml-4 text-2xl">Methylation sensitive</span>
          </div>
          <div className="r flex items-center p-1">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0 " />
            <span className="ml-4 text-2xl">Methylation insensitive</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnzymeSelection;
