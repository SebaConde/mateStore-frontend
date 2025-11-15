import FilterType from "./filter-type";

type FiltersControlTypeProps = {
  setFilterType: (origin: string) => void;
};

const FiltersControlCategory = (props:FiltersControlTypeProps) => {
 const {setFilterType} = props


  return (
    <div className="sm:w-[350px] sm:mt-5 p-6">
      <FilterType setFilterType={setFilterType} />
    </div>
  );
};

export default FiltersControlCategory;
