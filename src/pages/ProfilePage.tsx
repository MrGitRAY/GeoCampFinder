import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { camps } from "../data/camps";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { user, password, logout } = useAuth();
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const favoriteCamps = camps.filter((camp) => favorites.includes(camp.id));

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl text-center font-bold mb-6 text-orange-600 dark:text-orange-400">
                    User Profile
                </h1>

                {/* User Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-6">
                    <h1 className="text-xl font-semibold mb-4">👤 User Information</h1>
                    <p className="text-sm mb-2">
                        <strong>Username:</strong> {user}
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Password:</strong> {password ? "●●●●●●" : "Not Set"}
                    </p>
                    <button
                        onClick={logout}
                        className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                    >
                        Log Out
                    </button>
                </div>

                {/* Favorite Camps */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">❤️ Favorite Camps</h2>
                    {favoriteCamps.length > 0 ? (
                        <ul className="space-y-2">
                            {favoriteCamps.map((camp) => (
                                <li
                                    key={camp.id}
                                    className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-lg"
                                >
                                    <span>{camp.name}</span>
                                    <button
                                        onClick={() => toggleFavorite(camp.id)}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">You have no favorites yet.</p>
                    )}
                </div>

                {/* Navigate back */}
                <button
                    onClick={() => navigate("/")}
                    className="mr-2 bg-orange-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;