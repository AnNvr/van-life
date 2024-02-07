import { initializeApp } from "firebase/app";
import { 
    collection,
    getFirestore,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc
} from "firebase/firestore/lite";


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
const usersCollection = collection(db, "users");

// check email address in database to void duplication
export async function checkEmail(email) {
    const q = query(usersCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.docs.length === 0; // Returns true if email not found, false if found
}

// registration new user
export async function createUser(user) {
    try {
        await addDoc(usersCollection, user)
    } catch (error) {
        console.log("Error creating new user: " + error)
    }
}

// push the user object in localStorage
function pushUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

//login user
export async function loginUser(data) {
    const snapshot = await getDocs(usersCollection)
    const users = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    const { email, password } = data
    const user = users.find(user => user.email == email && user.password == password)

    if (user) {
        pushUserToLocalStorage(user)
    }

    return user
}

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

// Get a van by ID
export async function getVanByID(vanID) {
    try {
        // create a ref for the doc by its ID
        const vanRef = doc(db, "vans", vanID)

        // fetch the doc
        const docSnap = await getDoc(vanRef)

        // check if the doc exists
        if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data())
            return docSnap.data()
        } else {
            console.log("No doc found")
            return null
        }
    } catch(error) {
        console.error("Error fetching van by ID: " + error)
        throw error
    }
}

// Create a van
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


// Update a van
export async function updateVan(vanID, updateData) {
    try {
        // Reference to a specific van doc
        const docRef = doc(db, "vans", vanID)

        // update the doc
        await updateDoc(docRef, updateData)

        console.log(`Doc with ID ${vanID} updated!`)
        return true

    } catch (error) {
        console.log("Error updating document: " + error)
        return false
    }
}

// Delete a van
export async function deleteVan(vanID) {
    try {
        // obtain a ref to the specific van by its ID
        const vanRef = doc(db, "vans", vanID)

        // delete the doc
        await deleteDoc(vanRef)

        console.log(`Doc with ID ${vanID} deleted!`)
        return true // fundamental! Without it will return undefined!
    } catch (error) {
        console.log("Error deleting doc: " + error)
        return false
    }
}

