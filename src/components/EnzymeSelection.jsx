import { enzymes } from "../../utils/enzymes";

function EnzymeSelection() {
  // get list of enzymes from keys of enzymes object
  const enzymesList = Object.keys(enzymes);

  return (
    <div className="h-[80vh] overflow-scroll">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {enzymesList.map((enzyme, index) => (
          <div key={index} className="flex items-center rounded-md border p-4">
            <input type="checkbox" className="h-8 w-10 flex-shrink-0" />
            <span className="ml-4 text-2xl">{enzyme}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnzymeSelection;
