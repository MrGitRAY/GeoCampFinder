import { User } from "lucide-react";
import SettingsToggle from "../components/SettingsToggle";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { allFeatures, camps } from "../data/camps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilePage = () => {
    const { user, password } = useAuth();
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const [campName, setCampName] = useState("");
    const [campDescription, setCampDescription] = useState("");
    const [campFeatures, setCampFeatures] = useState<string[]>([]);
    const [campImage, setCampImage] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const userCamps = JSON.parse(localStorage.getItem("UserCamps") || "[]");
    const allCamps = [...camps, ...userCamps];
    const favoriteCamps = allCamps.filter((camp) => favorites.includes(camp.id));

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl text-center font-bold mb-6 text-orange-600 dark:text-orange-400">
                    User Profile
                </h1>

                {/* User Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex bg-slate-100 dark:bg-gray-700 rounded-lg py-1 px-2">
                            <User size={25} className="text-orange-500 dark:text-lime-500" />
                            <h1 className="ml-1 text-xl font-semibold">User Information</h1>
                        </div>
                        <SettingsToggle />
                    </div>
                    <p className="text-sm mb-2">
                        <strong>Username:</strong> {user}
                    </p>
                    <p className="text-sm mb-2">
                        <strong>Password:</strong> {password ? "●●●●●●" : "Not Set"}
                    </p>
                </div>

                {/* Favorite Camps */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-6">
                    <p className="inline-block text-xl font-semibold bg-slate-100 dark:bg-gray-700 rounded-lg py-1 px-2 mb-4">❤️ Favorite Camps</p>
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

                {/* Add camp */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-4">➕ Add New Camp</h2>

                    {successMsg && (
                        <p className="text-green-500 text-sm mb-3">{successMsg}</p>
                    )}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            const newCamp = {
                                id: "camp-" + Date.now(),
                                name: campName,
                                description: campDescription,
                                features: campFeatures,
                                image: campImage || "https://via.placeholder.com/300", // fallback
                                lat: 35.0 + Math.random(), // demo position
                                lng: 51.0 + Math.random(),
                            };

                            // save in localstorage
                            const stored = localStorage.getItem("UserCamps");
                            const updated = stored ? JSON.parse(stored) : [];
                            updated.push(newCamp);
                            localStorage.setItem("UserCamps", JSON.stringify(updated));

                            // reset
                            setCampName("");
                            setCampDescription("");
                            setCampFeatures([]);
                            setCampImage("");
                            setSuccessMsg("Camp added successfully!");
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Camp name"
                            value={campName}
                            onChange={(e) => setCampName(e.target.value)}
                            className="w-full p-2 rounded border dark:bg-slate-700"
                            required
                        />

                        <textarea
                            placeholder="Description"
                            value={campDescription}
                            onChange={(e) => setCampDescription(e.target.value)}
                            className="w-full p-2 rounded border dark:bg-slate-700"
                            required
                        />

                        {/* انتخاب ویژگی‌ها */}
                        <div className="flex gap-2 flex-wrap">
                            {allFeatures.map((feature) => (
                                <button
                                    key={feature}
                                    type="button"
                                    onClick={() =>
                                        setCampFeatures((prev) =>
                                            prev.includes(feature)
                                                ? prev.filter((f) => f !== feature)
                                                : [...prev, feature]
                                        )
                                    }
                                    className={`px-3 py-1 rounded-full border text-sm ${campFeatures.includes(feature)
                                        ? "bg-orange-600 text-white border-orange-600"
                                        : "bg-slate-200 dark:bg-slate-600"
                                        }`}
                                >
                                    {feature}
                                </button>
                            ))}
                        </div>

                        <input
                            type="url"
                            placeholder="Image URL (optional)"
                            value={campImage}
                            onChange={(e) => setCampImage(e.target.value)}
                            className="w-full p-2 rounded border dark:bg-slate-700"
                        />

                        <button
                            type="submit"
                            className="border border-orange-600 dark:border-lime-400 hover:bg-orange-600 dark:hover:bg-lime-400 dark:hover:text-black dark:text-white hover:text-white font-semibold px-2 py-1 rounded"
                        >
                            Add Camp
                        </button>
                    </form>
                </div>


                {/* Navigate back */}
                <button
                    onClick={() => navigate("/")}
                    className="mr-2 bg-orange-600 hover:bg-lime-700 text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;