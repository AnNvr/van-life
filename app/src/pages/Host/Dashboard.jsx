import { useState, useEffect } from "react";
import { getVans, createVan, deleteVan } from "../../api";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function Dashboard() {
    const [vans, setVans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            img: formData.get("imageUrl"),
        };

        try {
            const newVanId = await createVan(newVan);
            setVans([...vans, { ...newVan, id: newVanId }]);
            setIsModalOpen(false)
        } catch (error) {
            setError(error);
            console.log("Error creating new van:", error);
        }
        //Close modal
        closeModal()
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Delete Van
    async function handleDeleteVan(id, name) {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            const success = await deleteVan(id)
            if(success) {
                alert(`${name} deleted successfully!`)
                setVans(vans.filter(van => van.id !== id))
            } else {
                alert(`Failed to delete ${name}.`)
            }
        }
    }

        // Modal form:
        function Modal() {
            return (
                <div>
                    <dialog className="modal" open={isModalOpen}>
                        <div className="modal-box">
                                <button
                                type="button"
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    onClick={closeModal}
                                    >
                                    ✕
                                </button>
                            <h3 className="font-bold text-lg my-2">Create van</h3>
                            <form
                            className="flex flex-col gap-5"
                                onSubmit={handleCreateVan}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered w-full max-w-x"
                                    required
                                />
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    className="input input-bordered w-full max-w-x"
                                    required
                                />
                                <label for="van-type">Van type:</label>
                                <select
                                    name="type"
                                    className="input input-bordered w-full max-w-x"
                                    required
                                >
                                    <option
                                        value=""
                                        className="input input-bordered w-full max-w-x"
                                    >
                                        {" "}
                                        -- select an option --
                                    </option>
                                    <option
                                        value="simple"
                                        className="input input-bordered w-full max-w-x"
                                    >
                                        Simple
                                    </option>
                                    <option
                                        value="luxury"
                                        className="input input-bordered w-full max-w-x"
                                    >
                                        Luxury
                                    </option>
                                    <option
                                        value="rugged"
                                        className="input input-bordered w-full max-w-x"
                                    >
                                        Rugged
                                    </option>
                                </select>
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    className="input input-bordered w-full max-w-x resize-none"
                                    required
                                />
                                <input
                                    type="url"
                                    name="imageUrl"
                                    placeholder="URL image"
                                    className="input input-bordered w-full max-w-x"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    >Create Van</button>
                            </form>
                        </div>
                    </dialog>
                </div>
            );
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

            {isModalOpen && <Modal />}

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
                        {console.log(vans)}
                        {vans.map((van) => (
                            <tr key={van.id}>
                                <th>{van.name}</th>
                                <td>{van.type}</td>
                                <td>{van.price}</td>
                                <td>{van.description}</td>
                                <td><button><BiSolidMessageSquareEdit /></button></td>
                                <td><button
                                    onClick={() => handleDeleteVan(van.id, van.name)}><MdDelete /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}



