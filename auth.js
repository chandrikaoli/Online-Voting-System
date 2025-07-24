import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

export async function registerUser(name, voterID, aadhaar, password, email, phone) {
    try {
        // Validate inputs before sending to Firebase
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        try {
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                voterID: voterID,
                aadhaar: aadhaar,
                email: email,
                phone: phone,
                hasVoted: false,
                createdAt: new Date().toISOString()
            });
        } catch (firestoreError) {
            // If Firestore fails, delete the auth user to maintain consistency
            await user.delete();
            throw new Error('Failed to create user profile: ' + firestoreError.message);
        }

        return true;
    } catch (error) {
        // Handle specific Firebase Auth errors
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('This email is already registered');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Invalid email format');
        } else if (error.code === 'auth/weak-password') {
            throw new Error('Password is too weak. It must be at least 6 characters long');
        } else if (error.code === 'auth/operation-not-allowed') {
            throw new Error('Email/password accounts are not enabled. Please contact support');
        }
        
        // If it's not a specific Firebase error, throw the original error
        throw error;
    }
}

// Add login function
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email');
        } else if (error.code === 'auth/wrong-password') {
            throw new Error('Incorrect password');
        }
        throw error;
    }
}

// Add logout function
export async function logoutUser() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        throw new Error('Failed to logout: ' + error.message);
    }
} 