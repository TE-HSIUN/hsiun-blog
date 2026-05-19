import type { CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

export function getCategorySlug(category: string) {
	return category.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getNoteCategories(notes: Note[]) {
	const categories = new Map<string, string>();

	notes.forEach((note) => {
		const category = note.data.category;
		categories.set(getCategorySlug(category), category);
	});

	return Array.from(categories, ([slug, name]) => ({ slug, name })).sort((a, b) =>
		a.name.localeCompare(b.name),
	);
}

export function sortNotesByDate(notes: Note[]) {
	return notes.sort(
		(a, b) => getNoteDisplayDate(b).valueOf() - getNoteDisplayDate(a).valueOf(),
	);
}

export function getNoteDisplayDate(note: Note) {
	return note.data.updatedDate ?? note.data.pubDate;
}

export function getNoteDisplayDateLabel(note: Note) {
	return note.data.updatedDate ? "更新" : "建立";
}
