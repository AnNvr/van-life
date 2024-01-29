import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {

    const { vanByID } = useOutletContext();

    return (
        <>        
            <h1>$<span>{vanByID.price}</span>/day</h1>
        </>
    )
}