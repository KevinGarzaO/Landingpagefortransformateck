import { getBlogPostBySlug, getBlogPosts } from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import { Metadata } from "next";

// JSON-LD Helper Component
function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  const publishedTime = post.date instanceof Timestamp 
    ? post.date.toDate().toISOString() 
    : new Date(post.date).toISOString();
    
  const modifiedTime = post.updatedAt instanceof Timestamp 
    ? post.updatedAt.toDate().toISOString() 
    : new Date(post.updatedAt).toISOString();

  // Optimize image for WhatsApp/Socials (Resize to 1200px, quality 75) to avoid size limits
  // Requires consistent base URL - assuming transformateck.com as defined in layout
  const baseUrl = "https://transformateck.com";
  const rawImage = post.image || `${baseUrl}/assets/logo.png`;
  
  // Construct the optimized Next.js image URL. 
  // We use the absolute path to the _next/image endpoint.
  const ogImage = `${baseUrl}/_next/image?url=${encodeURIComponent(rawImage)}&w=1200&q=75`;

  return {
    title: `${post.title} | Transformateck`,
    description: post.excerpt || `Lee el artículo "${post.title}" en Transformateck.`,
    openGraph: {
      title: `${post.title} | Transformateck`,
      description: post.excerpt || `Lee el artículo "${post.title}" en Transformateck.`,
      url: `${baseUrl}/blog/${slug}`,
      siteName: "Transformateck",
      locale: "es_MX",
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [post.authorName || "Transformateck Team"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg", 
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Transformateck`,
      description: post.excerpt || `Lee el artículo "${post.title}" en Transformateck.`,
      images: [ogImage],
      creator: "@Transformateck", 
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Parallel fetching
  const [post, recentFn] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(4) // Fetch 4 to allow filtering out the current one
  ]);

  if (!post) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
            <p className="text-gray-400 mb-8 max-w-md">No pudimos encontrar el artículo que buscas. Puede que haya sido eliminado o la URL sea incorrecta.</p>
            <p className="text-xs text-gray-600 mb-8 font-mono bg-black/50 p-2 rounded">
                Slug: {slug} <br/>
                Verifica la consola para más detalles.
            </p>
            <Link 
                href="/blog"
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
            >
                Volver al Blog
            </Link>
        </div>
    );
  }

  // Filter related posts
  const relatedPosts = recentFn.posts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // Date Formatting
  const dateToDisplay = post.date instanceof Timestamp 
    ? post.date.toDate() 
    : new Date(post.date);

  const formattedDate = dateToDisplay.toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const publishedTime = dateToDisplay.toISOString();
  const modifiedTime = post.updatedAt instanceof Timestamp 
    ? post.updatedAt.toDate().toISOString() 
    : new Date(post.updatedAt).toISOString();
  
  const ogImage = post.image || "https://transformateck.com/assets/logo.png";

  // Construct JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "Lee este artículo en Transformateck",
    image: ogImage,
    author: {
      "@type": "Person",
      name: post.authorName || "Transformateck Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Transformateck",
      logo: {
        "@type": "ImageObject",
        url: "https://transformateck.com/assets/logo.png",
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://transformateck.com/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Inject JSON-LD */}
      <JsonLd data={jsonLd} />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/blog"
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Blog
          </Link>
          
          <div className="text-sm font-medium text-gray-500">
            {post.type || 'Blog'}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          
          {/* Header */}
          <header className="mb-12 text-center">
             {/* Category & Date */}
             <div className="flex items-center justify-center gap-3 text-sm mb-6">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-medium tracking-wide uppercase text-xs">
                {post.type || 'Blog'}
              </span>
              <span className="text-gray-500">•</span>
              <time className="text-gray-400">{formattedDate}</time>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              {post.title}
            </h1>

            {/* Author Section - Enhanced */}
            <div className="flex items-center justify-center gap-4 mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 inline-flex">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-cyan-500/20 p-0.5 bg-black">
                  <img 
                    src={post.authorImg || "/assets/logo.png"} 
                    alt={post.authorName} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 text-black text-[10px] flex items-center justify-center rounded-full border-2 border-black font-bold">
                  T
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm leading-none mb-1">
                  {post.authorName || "Transformateck Team"}
                </p>
                <p className="text-cyan-400 text-xs font-medium">
                  {post.type ? `Editor de ${post.type}` : 'Editor de Contenido'}
                </p>
              </div>
            </div>
          </header>

          {/* Content - Enhanced Typography (Custom Components) */}
          <div className="max-w-none mb-24">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: ({ ...props }) => (
                   <h1
                    className="mb-8 text-3xl font-bold leading-tight text-white sm:text-4xl"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="mb-6 mt-12 text-[20px] font-bold leading-normal text-white sm:text-2xl sm:leading-snug md:text-3xl md:leading-snug border-b border-white/10 pb-2"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="mb-4 mt-8 text-[18px] font-semibold text-cyan-200"
                    {...props}
                  />
                ),
                p: ({ node, children, ...props }) => {
                  if (
                    node?.children &&
                    node.children.length === 1 &&
                    (node.children[0] as any).tagName === "img"
                  ) {
                    return <>{children}</>;
                  }
                  return (
                    <p
                      className="mb-6 text-base leading-relaxed text-gray-300 text-justify text-lg"
                      {...props}
                    >
                      {children}
                    </p>
                  );
                },
                strong: ({ ...props }) => (
                  <strong className="font-bold text-white" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc ml-6 mb-6 text-gray-300 space-y-2" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal ml-6 mb-6 text-gray-300 space-y-2" {...props} />
                ),
                li: ({ ...props }) => <li className="mb-2 pl-2" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-6 bg-white/5 rounded-r italic text-gray-400" {...props} />
                ),
                code: ({ className, children, ...props }: any) => {
                   const match = /language-(\w+)/.exec(className || '')
                   const isInline = !match
                   return (
                     <code className={`${isInline ? 'bg-cyan-900/30 text-cyan-300 px-1 py-0.5 rounded text-sm' : 'block bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-200 border border-white/10 my-4'}`} {...props}>
                       {children}
                     </code>
                   )
                },
                img: ({ ...props }) => (
                  <div className="overflow-hidden rounded-xl border border-white/10 my-8 shadow-2xl bg-black">
                    <img
                      className="w-full h-auto object-cover"
                      alt={props.alt || ""}
                      src={props.src || ""}
                    />
                  </div>
                ),
              }}
            >
              {post?.markdownContent ?? ""}
            </ReactMarkdown>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-white/10 pt-16">
              <h3 className="text-2xl font-bold text-white mb-8">Artículos Similares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all duration-300 block"
                  >
                    <div className="aspect-video relative overflow-hidden bg-black">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="opacity-50 brightness-0 invert"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span className="text-cyan-400 font-medium uppercase tracking-wider">{relatedPost.type || 'Blog'}</span>
                      </div>
                      <h4 className="text-white font-medium line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
