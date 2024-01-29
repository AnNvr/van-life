import { initializeApp } from "firebase/app";
import { 
    collection,
    getFirestore,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc 
} from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBXjxa9SBaAtwCzQ9HjZ-DH-kJ1ttaEImQ",
    authDomain: "van-life-1c024.firebaseapp.com",
    projectId: "van-life-1c024",
    storageBucket: "van-life-1c024.appspot.com",
    messagingSenderId: "73079083062",
    appId: "1:73079083062:web:f98926abc75f6b3ee50897",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollection = collection(db, "vans");
export const auth = getAuth(app)

// registration new user
export const registerUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}
// authentication for Firestorm database:
export const loginUser = async ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
};


// refactoring fetching functions
export async function getVans() {
    try {
        const snapshot = await getDocs(vansCollection);
        const vans = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return vans;
    } catch (error) {
        console.error("Failed to fetch vans:", error);
        throw error;
    }
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    try {
        const q = query(vansCollection, where("hostId", "==", "123"))
        const snapshot = await getDocs(q);
        const vans = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return vans;
    } catch (error) {
        console.error("Failed to fetch vans:", error);
        throw error;
    }
}

export async function createVan(van) {
    try {
        // Reference to vans collection
        const vansCollection = collection(db, "vans")

        // Adding the new van document to the vans collection
        const docRef = await addDoc(vansCollection, van)

         // Returning the ID of the newly added van document
        return docRef.id
    } catch (error) {
        console.log("Error adding document:", error)
        throw error
    }
}

/* export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        };
    }
    const data = await res.json();
    return data.vans;
} */




/* export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status,
        };
    }
    const data = await res.json();
    return data.vans;
} */

/* export async function loginUser(creds) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(creds),
    });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
} */

