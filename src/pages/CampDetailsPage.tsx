import { useParams, useNavigate } from "react-router-dom";
import { camps } from "../data/camps";
import CampMiniMap from "../components/CampMiniMap";

const CampDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const camp = camps.find((c) => c.id === Number(id));

    if (!camp) {
        return (
            <div className="min-h-screen flex items-center text-3xl justify-center text-gray-500">
                Camp Not Found ❌
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-white px-6 py-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-lg border dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-4">{camp.name}</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{camp.description}</p>
                
                {camp.imageUrl && (
                    <img
                        src={camp.imageUrl}
                        alt={camp.name}
                        className="w-full h-64 object-cover rounded mb-6"
                    />
                )}

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Location: {camp.lat}, {camp.lng}
                </div>

                {/* نقشه ثابت کوچک در آینده */}
                <div className="w-full rounded overflow-hidden mb-6">
                    <CampMiniMap lat={camp.lat} lng={camp.lng} />
                </div>


                <button
                    onClick={() => navigate("/")}
                    className="mt-6 mr-2 bg-orange-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
                <button
                    //   onClick={() => navigate("/")}
                    className="mt-6 bg-orange-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
                >
                    See Plans
                </button>
            </div>
        </div>
    );
};

export default CampDetailsPage;