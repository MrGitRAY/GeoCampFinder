import { useParams, useNavigate } from "react-router-dom";
import { camps } from "../data/camps";
import CampMiniMap from "../components/CampMiniMap";
import { useFavorites } from "../contexts/FavoritesContext";
import { Heart, TentTree } from "lucide-react";
import SettingsToggle from "../components/SettingsToggle";

const CampDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const camp = camps.find((c) => c.id === Number(id));
    const { toggleFavorite, isFavorite } = useFavorites();

    if (!camp) {
        return (
            <div className="min-h-screen flex items-center text-3xl justify-center text-gray-600 dark:text-gray-200 bg-slate-100 dark:bg-slate-800">
                Camp Not Found ❌
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-white px-6 py-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded border border-lime-600 shadow-sm shadow-lime-50 dark:shadow-lime-950 dark:border-lime-600">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                        <TentTree className="w-8 h-8 text-lime-600 dark:text-lime-500" />
                        <h1 className="ml-4 py-1 text-2xl font-bold text-center">{camp.name}</h1>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <button
                            onClick={() => toggleFavorite(camp.id)}
                            className="p-2 rounded-full bg-slate-100 dark:bg-gray-700 hover:scale-110 transition-transform"
                        >
                            {isFavorite(camp.id) ? (
                                <Heart className="text-red-500 fill-red-500" size={25} />
                            ) : (
                                <Heart className="text-gray-500 dark:text-gray-300" size={25} />
                            )}
                        </button>
                        <SettingsToggle />
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-5">{camp.description}</p>

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