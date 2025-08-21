export function toPublicUrl(filePath, baseUrl) {
  if (!filePath) return '';
  if (/^https?:\/\//.test(filePath)) return filePath;

  const normalized = filePath.replace(/\\/g, '/');
  const index = normalized.lastIndexOf('/uploads/');
  if (index !== -1) {
    const relative = normalized.slice(index);
    return `${baseUrl}${relative}`;
  }
  return `${baseUrl}${normalized}`;
}

