const baseUrl = import.meta.env.BASE_URL;

export function withBase(path = "") {
	const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
	const normalizedPath = path.replace(/^\/+/, "");

	return `${normalizedBase}${normalizedPath}`;
}
