import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebaseConfig';
import { Listing } from '../types/Listing';

export const listingService = {
  // Fetch all listings for the Home Screen
  getAllListings: async (): Promise<Listing[]> => {
    try {
      // Query listings, ordered by newest first (requires an index in Firebase eventually)
      const q = query(collection(db, 'listings'));
      const querySnapshot = await getDocs(q);
      
      const listings: Listing[] = [];
      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() } as Listing);
      });
      
      return listings;
    } catch (error: any) {
      console.error("Error fetching listings:", error.message);
      throw error;
    }
  },

  // Upload an array of local image URIs to Firebase Storage
  uploadImages: async (imageUris: string[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const uri of imageUris) {
      try {
        // Convert local URI to a blob for Firebase
        const response = await fetch(uri);
        const blob = await response.blob();
        
        // Create a unique filename
        const filename = `listings/${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const storageRef = ref(storage, filename);
        
        // Upload and get the public URL
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadUrl);
      } catch (error: any) {
        console.error("Image upload failed for URI:", uri, error);
        // We continue the loop; if one image fails, we try to upload the rest
      }
    }
    
    return uploadedUrls;
  },

  // Create a new listing (Uploads images first, then saves to Firestore)
  createListing: async (listingData: Omit<Listing, 'id' | 'images' | 'createdBy'>, localImageUris: string[]) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Must be logged in to create a listing");

      // 1. Upload images to Storage
      const imageUrls = await listingService.uploadImages(localImageUris);

      // 2. Save document to Firestore
      const docRef = await addDoc(collection(db, 'listings'), {
        ...listingData,
        images: imageUrls,
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString()
      });

      return docRef.id;
    } catch (error: any) {
      console.error("Error creating listing:", error.message);
      throw error;
    }
  }
};
