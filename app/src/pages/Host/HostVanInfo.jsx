import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {

    // pass the vanById object with context
    const { vanByID } = useOutletContext();
    
    return (
<div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center mb-4">
        <span className="font-semibold">Name:</span>
        <p className="md:col-span-3 text-[#161616]">{vanByID.name}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center mb-4">
        <span className="font-semibold">Category:</span>
        <p className="md:col-span-3 text-[#161616]">{vanByID.type}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 items-center">
        <span className="font-semibold">Description:</span>
        <p className="md:col-span-3 text-[#161616]">{vanByID.description}</p>
    </div>
</div>

    )
}