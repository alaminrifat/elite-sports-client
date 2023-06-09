import useStudent from "../../hook/useStudent";


const EnrolledClass = () => {
    const [isStudent,] = useStudent();
        return (
        <div>
            Show Enrolled Class
            
        </div>
    );
};

export default EnrolledClass;