import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose, onSubmit, vanData = null }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        type: "",
        description: "",
        imageUrl: "",
        ...vanData
    });

    useEffect(() => {
        if (vanData) {
            setFormData({
                id: vanData.id,
                name: vanData.name,
                price: vanData.price.toString(),
                type: vanData.type,
                description: vanData.description,
                imageUrl: vanData.imageUrl
            });
        } else {
            setFormData({
                id: null,
                name: "",
                price: "",
                type: "",
                description: "",
                imageUrl: ""
            });
        }
    }, [vanData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); // Close modal after form submission
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <dialog open={isOpen} className="modal">
            <div className="modal-box">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg my-2">
                    {vanData ? "Edit Van" : "Create Van"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <label for="van-type">Van type:</label>
                    <select
                        name="type"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.type}
                        onChange={handleChange}
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
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="URL image"
                        className="input input-bordered w-full max-w-x"
                        required
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary">
                        {vanData ? "Update" : "Create"}
                    </button>
                </form>
                
            </div>
        </dialog>
    );
}

export default Modal;
