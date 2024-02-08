import { useState, useEffect } from "react";
import { createVan, getVans, updateVan, deleteVan } from "../../api";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "../../components/Modal";

export default function Dashboard() {
    const [vans, setVans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVan, setSelectedVan] = useState(null);

    // state for handling error messages
    const [error, setError] = useState(null);
    // state for loading
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, []);

    // Create Van:
    async function handleCreateVan(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        // validation check
        if (
            !formData.get("name") ||
            !formData.get("type") ||
            !formData.get("price") ||
            !formData.get("description") ||
            !formData.get("imageUrl")
        ) {
            alert("Please fill in all fields");
            return;
        }

        const newVan = {
            name: formData.get("name"),
            type: formData.get("type"),
            price: Number(formData.get("price")),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
        };

        try {
            const newVanId = await createVan(newVan);
            setVans([...vans, { ...newVan, id: newVanId }]);
            setIsModalOpen(false);
        } catch (error) {
            setError(error);
            console.log("Error creating new van:", error);
        }
        //Close modal
        closeModal();
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVan(null)
    };

    const openUpdateModal = (van) => {
        setSelectedVan(van)
        setIsModalOpen(true)
    }

    async function handleFormSubmit(formData) {
        // Determine if we're creating a new van or updating an existing one
        if (formData.id) {
            // We have an ID, so we're updating an existing van
            try {
                await updateVan(formData.id, formData);
                alert("Van updated successfully!");
                // Update the local state to reflect the changes
            } catch (error) {
                console.error("Failed to update van: ", error);
                alert("Failed to update van");
            }
        } else {
            // No ID, so we're creating a new van
            try {
                const newVanId = await createVan(formData);
                alert("Van created successfully!");
                // Update the local state to include the new van
            } catch (error) {
                console.error("Error creating new van: ", error);
                alert("Error creating new van");
            }
        }

        // Close the modal and refresh the list of vans
        setIsModalOpen(false);
    }

    // Delete Van
    async function handleDeleteVan(id, name) {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            const success = await deleteVan(id);
            if (success) {
                alert(`${name} deleted successfully!`);
                setVans(vans.filter((van) => van.id !== id));
            } else {
                alert(`Failed to delete ${name}.`);
            }
        }
    }

    return (
        <div className="container my-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="container">
                <button
                    type="button"
                    className="btn bg-[#FFDDB2] text-[#161616]"
                    onClick={() => setIsModalOpen(true)}
                >
                    List a van
                </button>
            </div>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleFormSubmit}
                    vanData={selectedVan}
                />
            )}

            <div className="bg-[#fafafa] border-2 border-[#FFDDB2] rounded-lg p-2">
                <h2 className="text-center">Van List</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vans.map((van) => (
                                <tr key={van.id}>
                                    <th>{van.name}</th>
                                    <td>{van.type}</td>
                                    <td>{van.price}</td>
                                    <td>{van.description}</td>
                                    <td>
                                        <button
                                            onClick={
                                                () => openUpdateModal(van)
                                            }
                                        >
                                            <BiSolidMessageSquareEdit />
                                        </button>
                                    </td>
                                    {isModalOpen && <Modal />}
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeleteVan(
                                                    van.id,
                                                    van.name
                                                )
                                            }
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
