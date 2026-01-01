import { ImageResponse } from 'next/og'
import { getBlogPostBySlug } from "@/lib/firestore";
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Blog Post Transformateck'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  // Font loading (optional, using system fonts for simplicity first to ensure reliability)
  // Ideally we fetch a font, but for speed/robustness let's stick to standard layouts.
  
  const title = post?.title || 'Transformateck Blog';
  const postImage = post?.image;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 60,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column', // Stack vertically
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Image (Dimmed) */}
        {postImage && (
            <img 
                src={postImage} 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4, // Darken it so text pops
                }}
            />
        )}
        
        {/* Gradient Overlay for Readability */}
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
            }}
        />

        {/* Content */}
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            zIndex: 10,
        }}>
            {/* Logo/Brand */}
            <div style={{
                color: '#22d3ee', // Cyan-400
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '4px',
            }}>
                Transformateck
            </div>

            {/* Title */}
            <div style={{
                color: 'white',
                fontSize: 70,
                fontWeight: 900,
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                maxWidth: '900px',
            }}>
                {title}
            </div>

            {/* Author (if available) */}
            {post?.authorName && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 40,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '10px 30px',
                    borderRadius: 50,
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    {post.authorImg && (
                        <img 
                            src={post.authorImg}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                marginRight: 15,
                                border: '2px solid #22d3ee',
                            }}
                        />
                    )}
                    <span style={{ color: '#cbd5e1', fontSize: 24 }}>{post.authorName}</span>
                </div>
            )}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can use the width and height we defined above
      ...size,
      // Debug: false
    }
  )
}
