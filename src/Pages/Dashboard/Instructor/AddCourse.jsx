const AddCourse = () => {
    return (
        <div className="container mx-auto">
            <form className="">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Class name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-accent"
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input
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
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-accent"
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Instructor Email</span>
                    </label>
                    {/* TODO: readonly  */}
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-accent"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Available seats</span>
                    </label>
                    <input
                        type="text"
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
                        placeholder="Type here"
                        className="input input-bordered input-accent"
                    />
                </div>
                <input type="submit" className="btn btn-accent my-6  w-full max-w-xs    " />
            </form>
        </div>
    );
};

export default AddCourse;
