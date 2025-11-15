import { useGetProductField } from "../../../../../../api/getProductField";
import { FilterTypes } from "../../../../../../types/filters";
import { Label } from "../../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../../components/ui/radio-group";

type FiltersTypeProps = {
  setFilterType: (origin: string) => void;
};


const FilterType = (props : FiltersTypeProps) => {
    const {setFilterType} = props;
   const {result, loading} = useGetProductField();
    return ( 
    <div className="my-5">
        {loading && result == null &&(
        <p className="mb-3 font-bold"> tipo</p>

        )}
        <RadioGroup onValueChange={(value)=>setFilterType(value)}>
            {result != null  && result.schema.attributes.tipo.enum.map((type:string)=>(
                <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>{type}</Label>
                </div>
            ))}
        </RadioGroup>
    </div> );
}
 
export default FilterType;