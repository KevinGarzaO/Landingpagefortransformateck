import { collection, getDocs, query, where, Timestamp, limit, doc } from 'firebase/firestore';
import { db } from './firebase';

export interface BlogPost {
  id: string;
  authorImg: string;
  authorName: string;
  date: string | Timestamp; // Can be string or Timestamp from Firestore
  excerpt: string;
  image: string;
  markdownContent: string;
  publico: boolean;
  slug: string;
  title: string;
  type: string;
  updatedAt: string | Timestamp; // Can be string or Timestamp from Firestore
}

export async function getBlogPosts(pageSize: number = 12, lastDoc?: any): Promise<{ posts: BlogPost[], hasMore: boolean, lastVisible: any }> {
  try {
    const entradasRef = collection(db, 'entradas');
    
    // Query only public posts (filter images client-side to avoid index)
    const q = query(
      entradasRef,
      where('publico', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    
    const allPosts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Double-check image exists and is not empty string
      if (data.image && data.image.trim() !== '') {
        allPosts.push({
          id: doc.id,
          ...data,
        } as BlogPost);
      }
    });
    
    // Sort by updatedAt descending (most recent first)
    allPosts.sort((a, b) => {
      // Convert Firestore Timestamps to milliseconds
      const getTime = (dateField: string | Timestamp): number => {
        if (dateField instanceof Timestamp) {
          return dateField.toMillis();
        }
        return new Date(dateField).getTime();
      };

      const dateA = a.updatedAt ? getTime(a.updatedAt) : getTime(a.date);
      const dateB = b.updatedAt ? getTime(b.updatedAt) : getTime(b.date);
      
      // Return negative if b is newer (descending order)
      return dateB - dateA;
    });

    // Implement pagination manually after sorting
    const startIndex = lastDoc ? allPosts.findIndex(p => p.id === lastDoc.id) + 1 : 0;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + pageSize);
    const hasMore = startIndex + pageSize < allPosts.length;
    const lastVisible = paginatedPosts.length > 0 ? paginatedPosts[paginatedPosts.length - 1] : null;

    return {
      posts: paginatedPosts,
      hasMore,
      lastVisible
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], hasMore: false, lastVisible: null };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const entradasRef = collection(db, 'entradas');
    const q = query(
      entradasRef, 
      where('publico', '==', true),
      where('slug', '==', slug),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
