import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import BlurFade from "@/components/magicui/blur-fade";
import { ArrowLeft } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
    const notes = getAllNotes();
    return notes.map((note) => ({
        slug: note.slug,
    }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const note = getNoteBySlug(slug);

    if (!note) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="flex items-center justify-center m-4">
            <div className="w-full max-w-xl py-8 flex flex-col gap-4 px-4 sm:px-0">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <Link
                        href="/notes"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to notes
                    </Link>
                </BlurFade>

                {note.metadata.bannerImage && (
                    <BlurFade delay={BLUR_FADE_DELAY * 2}>
                        <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={`/notes/${slug}/${note.metadata.bannerImage}`}
                                alt={note.metadata.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 672px"
                            />
                        </div>
                    </BlurFade>
                )}

                <BlurFade delay={note.metadata.bannerImage ? BLUR_FADE_DELAY * 3 : BLUR_FADE_DELAY * 2}>
                    <div className="">
                        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-manrope-bold)] tracking-tighter mb-4">
                            {note.metadata.title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(note.metadata.date)}
                        </p>
                    </div>
                </BlurFade>

                <BlurFade delay={note.metadata.bannerImage ? BLUR_FADE_DELAY * 4 : BLUR_FADE_DELAY * 3}>
                    <article className="prose prose-slate max-w-none">
                        <MarkdownRenderer content={note.content} slug={slug} />
                    </article>
                </BlurFade>
            </div>
        </div>
    );
}

