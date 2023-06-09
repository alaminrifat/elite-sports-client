import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddCourse = () => {
    const { user } = useContext(AuthContext);
    const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
    console.log(img_hosting_token);
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        // console.log(name);
        // // TODO: get photo and send the photo make api
        const name = form.name.value;
        const instructor = form.instructor?.value;
        const email = form.email?.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseFloat(form.price.value);
        const status = "pending";
        let image = "";

        const formData = new FormData();
        const imgFile = form.img_file.files[0];
        console.log(imgFile);
        if (!imgFile) {
            console.error("No image file selected.");
            return;
        }
        formData.append("image", imgFile);
        let newClass = {};
        console.log(formData);
        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgRes) => {
                image = imgRes?.data?.display_url;
                newClass = {
                    name,
                    image,
                    instructor,
                    email,
                    availableSeats,
                    price,
                    status,
                };
                console.log(newClass);
                saveClassToDatabase(newClass);
            });
    };
    const saveClassToDatabase = async (newClass) => {
        try {
            await axios.post("http://localhost:5000/api/classes", newClass);
            console.log("Class saved to the database:", newClass);
            toast.success(`${newClass.name} saved to the database`)
        } catch (error) {
            console.error("Error saving class to the database:", error);
            // TODO: Handle error, e.g., show an error message
        }
    };

    return (
        <div className="container mx-auto flex justify-center">
            <ToastContainer/>
            <div className="bg-slate-200 p-4 md:p-20 rounded-lg shadow-lg  my-10">
                <div className="text-4xl font-bold text-center mb-10">
                    Add A class
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Class name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            name="name"
                            className="input input-bordered input-accent"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input
                            name="img_file"
                            type="file"
                            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        {/* TODO: readonly  */}
                        <input
                            value={user?.displayName}
                            type="text"
                            name="instructor"
                            placeholder="Type here"
                            className="input input-bordered input-accent"
                            readOnly={true}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        {/* TODO: readonly  */}
                        <input
                            value={user?.email}
                            type="text"
                            name="email"
                            placeholder="Type here"
                            className="input input-bordered input-accent"
                            readOnly={true}
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input
                            type="text"
                            name="availableSeats"
                            placeholder="Type here"
                            className="input input-bordered input-accent"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Type here"
                            className="input input-bordered input-accent"
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-accent mt-6 w-full max-w-xs text-white"
                        value="Create Class"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
