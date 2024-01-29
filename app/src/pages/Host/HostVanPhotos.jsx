import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    // pass the vanById object with context
    const { vanByID } = useOutletContext();

    return (
            <img
                src={vanByID.imageUrl}
                className="rounded-lg"
            />
    )
}