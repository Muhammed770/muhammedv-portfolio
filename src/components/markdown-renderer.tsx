"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownRendererProps {
    content: string;
    slug: string;
}

export function MarkdownRenderer({ content, slug }: MarkdownRendererProps) {
    return (
        <div className="prose prose-slate max-w-none dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ src, alt }) => {
                        if (!src || typeof src !== 'string') return null;
                        // Handle absolute paths (already in public)
                        if (src.startsWith('/')) {
                            return (
                                <Image
                                    src={src}
                                    alt={alt || ''}
                                    width={800}
                                    height={600}
                                    className="rounded-lg w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 672px"
                                />
                            );
                        }
                        // Handle relative paths within the note folder
                        // Images should be placed in public/notes/[slug]/ directory
                        if (!src.startsWith('http')) {
                            return (
                                <Image
                                    src={`/notes/${slug}/${src}`}
                                    alt={alt || ''}
                                    width={800}
                                    height={600}
                                    className="rounded-lg w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 672px"
                                />
                            );
                        }
                        // External images
                        return <img src={src} alt={alt} className="rounded-lg w-full h-auto" />;
                    },
                    a: ({ href, children }) => {
                        if (!href) return <>{children}</>;
                        if (href.startsWith('http')) {
                            return (
                                <Link href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {children}
                                </Link>
                            );
                        }
                        return (
                            <Link href={href} className="text-blue-600 hover:underline">
                                {children}
                            </Link>
                        );
                    },
                    code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return (
                            <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm`} {...props}>
                                {children}
                            </code>
                        );
                    },
                    pre: ({ children }) => {
                        return (
                            <pre className="bg-gray-100 dark:bg-gray-800 p-3 md:p-4 rounded-lg overflow-x-auto my-4 text-sm md:text-base">
                                {children}
                            </pre>
                        );
                    },
                    h1: ({ children }) => (
                        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 font-[family-name:var(--font-manrope-bold)]">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 font-[family-name:var(--font-manrope-bold)]">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 font-[family-name:var(--font-manrope-semi-bold)]">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4 leading-relaxed">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2">
                            {children}
                        </ol>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

