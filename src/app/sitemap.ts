import { MetadataRoute } from 'next'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://transformateck.com'
  
  // Static routes — ordenadas por prioridad para influenciar los Sitelinks de Google
  const routes = [
    { path: '', priority: 1.0 },           // Home
    { path: '/blog', priority: 0.9 },       // Blog
    { path: '/babelink', priority: 0.9 },   // Babelink
    // Agrega aquí nuevas páginas principales en el futuro:
    // { path: '/nueva-pagina', priority: 0.9 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority,
  }))


  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = []
  
  try {
    const entradasRef = collection(db, 'entradas')
    // Get all public posts
    const q = query(entradasRef, where('publico', '==', true))
    const querySnapshot = await getDocs(q)
    
    blogPosts = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      
      let lastModified = new Date()
      try {
        const dateVal = data.updatedAt || data.date
        if (dateVal) {
             // Handle if it's a Firestore Timestamp (has toMillis) or just a date string/number
             const dateObj = typeof dateVal.toMillis === 'function' 
                ? dateVal.toDate() 
                : new Date(dateVal)
             
             if (!isNaN(dateObj.getTime())) {
                lastModified = dateObj
             }
        }
      } catch {
        // Fallback to current date on error
      }

      return {
        url: `${baseUrl}/blog/${data.slug}`,
        lastModified: lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.6,  // menor que las páginas principales (0.9) para que Google prefiera mostrarlas en Sitelinks
      }
    })
  } catch (error) {
    console.error('Error generating sitemap for blog posts:', error)
  }

  return [...routes, ...blogPosts]
}
