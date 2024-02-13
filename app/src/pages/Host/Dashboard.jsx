import { useState, useEffect } from "react";
import { createVan, getVans, updateVan, deleteVan } from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";

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
                setVans(prevState => 
                    prevState.map(van => (van.id === formData.id ? { ...van, ...formData } : van))
                );
            } catch (error) {
                console.error("Failed to update van: ", error);
                alert("Failed to update van");
            }
        } else {
            // Create a new van
            try {
                const newVan = await createVan(formData);
                alert("Van created successfully!");
                setVans(prevState => [...prevState, {...formData, id: newVan.id}])
            } catch (error) {
                console.error("Error creating new van: ", error);
                alert("Error creating new van");
            }
        }
        // Close the modal and refresh the list of vans
        closeModal()
    }

    // Delete Van
    async function handleDeleteVan(id, name) {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            try {
                await deleteVan(id);
                alert(`${name} deleted successfully!`);
                setVans(vans.filter((van) => van.id !== id));
            } catch (error) {
                console.error("Failed to delete van: ", error);
                alert(`Failed to delete ${name}.`);
            }
        }
    }

    // loading here:
    if (loading) {
        return <Spinner />
    }

    return (
        <div className="container mx-auto my-2 p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Van List</h2>
                <button
                    type="button"
                    className="btn bg-[#FFDDB2] text-[#161616] hover:bg-[#e6c3a0]"
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

            <div className="bg-[#fafafa] border border-[#e6e6e6] rounded-lg overflow-hidden">
{/*                 <h2 className="text-center text-2xl font-bold my-2">Van List</h2> */}
                <div className="overflow-x-auto">

                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Type</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Price</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Description</th>
                                <th className="px-5 py-3 border-b-2 border-[#e6e6e6] bg-[#fafafa] text-left text-xs font-semibold text-[#161616] uppercase tracking-wider">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vans.map((van) => (
                                <tr key={van.id}>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{van.name}</td>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{van.type}</td>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{van.price}</td>
                                    <td className="px-5 py-5 border-b border-[#e6e6e6] bg-white text-sm">{van.description}</td>
                                    <td className="px-5 py-5 bg-white text-sm">
                                        <div className="flex justify-around items-center">
                                            <button
                                                onClick={() => openUpdateModal(van)}
                                                className="text-[#4d4d4d] text-lg hover:text-[#FFDDB2]"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteVan(van.id, van.name)}
                                                className="text-[#4d4d4d] text-lg hover:text-red-500"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
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
