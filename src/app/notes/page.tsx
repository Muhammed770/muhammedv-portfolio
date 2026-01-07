import Link from "next/link";
import { getAllNotes } from "@/lib/notes";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export default function NotesPage() {
    const notes = getAllNotes();

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
            <div className="w-full max-w-xl py-8 flex flex-col gap-8 px-4 sm:px-0">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <h1 className="text-4xl font-[family-name:var(--font-manrope-bold)] tracking-tighter mb-2">
                        notes
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Thoughts, ideas, and learnings
                    </p>
                </BlurFade>

                {notes.length === 0 ? (
                    <BlurFade delay={BLUR_FADE_DELAY * 2}>
                        <p className="text-muted-foreground">No notes yet. Check back soon!</p>
                    </BlurFade>
                ) : (
                    <div className="flex flex-col gap-8">
                        {notes.map((note, index) => (
                            <BlurFade key={note.slug} delay={BLUR_FADE_DELAY * 2 + index * 0.05}>
                                <Link
                                    href={`/notes/${note.slug}`}
                                    className="block group"
                                >
                                    <h2 className="text-2xl font-[family-name:var(--font-manrope-bold)] tracking-tighter mb-1 group-hover:underline transition-all">
                                        {note.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(note.date)}
                                    </p>
                                </Link>
                            </BlurFade>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

