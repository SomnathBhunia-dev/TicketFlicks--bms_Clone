import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterTag } from "../Redux/Actions/action";

const FilterOption = ({ Topic, open }) => {
    const [categoryOpen, setCategoryOpen] = useState(open);
    const FilterBy = useSelector(state => state.Filter.FilterBy)

    const toggleButton = (e) => {
        const classList = e.current.classList;
        classList.toggle("hidden");
        classList.toggle("block");
    };

    const toggleCategory = () => {
        setCategoryOpen((prevState) => !prevState);
    };
    const CatBtn = useRef()

    const dispatch = useDispatch()

    const handleFilterTag = (e) => {
        let Name = e.target.name;
        let value = e.target.value;
        let isChecked = e.target.checked;
        dispatch(FilterTag(Name, value, isChecked));
    };
    return (
        <>
            <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false" onClick={() => { toggleButton(CatBtn); toggleCategory() }}>
                <span className="font-medium text-gray-900">{Topic.title} {FilterBy[Topic.title]?.length > 0 && <span className="bg-[#eb4e62] text-white rounded-full px-3 py-[4px] ml-2">{FilterBy[Topic.title]?.length}</span>} </span>
                <span className="ml-6 flex items-center">
                    {/* <!-- Expand icon, show/hide based on section open state. --> */}
                    {!categoryOpen ?
                        (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>)
                        :
                        // {/* <!-- Collapse icon, show/hide based on section open state. --> */ }
                        (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                        </svg>)}
                </span>
            </button>
            <div className={`${categoryOpen ? "block" : 'hidden'}`} ref={CatBtn}>
                <div className='flex flex-col'>
                    {Topic.items.map((i, index) => (
                        <label key={index}><input type="checkbox" name={Topic.title} value={i.label} checked={FilterBy[Topic.title]?.includes(i.label) || false}  onChange={handleFilterTag} className="mr-2" />{i.label}</label>
                    ))}
                </div>
            </div>
        </>
    )
}
export default FilterOption;