import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Accordian from "./components/Accordian";
import Navbar from "./components/Navbar";
import PatientDetails from "./components/PatientDetails";
// import PatientReport from "./components/PatientReport";
import { Button } from "./components/ui/button";
import { auth } from "./components/firebase";
import {
    onAuthStateChanged,
    User,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { MailOpen } from "lucide-react";
// import UpdateData from "./components/UpdateData";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [buttonText, setButtonText] = useState("Predict with AI ✨");

    // Loading states for PatientDetails and PatientReport
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    // const [reportLoaded, setReportLoaded] = useState(false);

    // Check if a user is logged in and update `user` state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Handle login with Google
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const showPredictButton = detailsLoaded;
    const handleButtonClick = () => {
        setButtonText(
            buttonText === "Predict with AI ✨"
                ? "View Report 📁"
                : "Predict with AI ✨"
        );
    };
    // const handleSubmit = () => {
    //     console.log("Submitted");
    // };

    return (
        <Router>
            <div className="flex flex-col justify-center items-center p-8 gap-4">
                {user ? (
                    <>
                        {/* Show user information */}
                        <Navbar
                            userName={user.displayName}
                            handleLogout={handleLogout}
                        />

                        {/* Authenticated Routes */}
                        <Routes>
                            {/* Homepage Route */}
                            <Route
                                path="/"
                                element={
                                    <>
                                        <PatientDetails
                                            onLoadComplete={() =>
                                                setDetailsLoaded(true)
                                            }
                                        />
                                        {/* <PatientReport
                                            onLoadComplete={() =>
                                                setReportLoaded(true)
                                            }
                                        /> */}

                                        {/* predict with ai button */}
                                        <Link
                                            to="/predict"
                                            className="fixed bottom-4 z-50"
                                        >
                                            {showPredictButton && (
                                                <Button
                                                    onClick={handleButtonClick}
                                                    className="h-10 text-md p-6 rounded-3xl "
                                                >
                                                    {buttonText}
                                                </Button>
                                            )}
                                        </Link>
                                    </>
                                }
                            />

                            {/* Predict Page */}
                            <Route
                                path="/predict"
                                element={
                                    <>
                                        <div className="flex text-xl text-center pt-8 px-4 text-pretty font-semibold">
                                            Input report data to predict with
                                            our AI model ✨
                                        </div>
                                        <Accordian />

                                        {/* view report button */}
                                        <Link
                                            to="/"
                                            className="fixed bottom-4 z-50"
                                        >
                                            <Button
                                                onClick={handleButtonClick}
                                                className="h-10 text-md p-6 rounded-3xl "
                                            >
                                                {buttonText}
                                            </Button>
                                        </Link>
                                    </>
                                }
                            />
                            {/* <Route
                                path="/update_details"
                                element={<UpdateData onSubmit={handleSubmit} />}
                            /> */}
                        </Routes>
                    </>
                ) : (
                    // Show login button if user is not authenticated
                    <>
                        <p className="text-5xl uppercase tracking-wider">
                            health tracking app
                        </p>
                        <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2 mt-8 shadow-2xl bg-gradient-to-r from-teal-200 to-transparent p-12 text-pretty rounded-3xl">
                            <p className="text-3xl font-semibold tracking-widest uppercase">
                                welcome!
                            </p>
                            <p className="text-lg p-4">
                                Please log in to view your health report and
                                predictions with AI ✨.
                            </p>
                            <Button onClick={handleLogin} className="w-60 h-14">
                                <MailOpen />
                                Login with Google
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
