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

export function formatSocialUrl(url, platform) {
  if (!url) return '';
  let trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes('tiktok.com') || trimmed.includes('instagram.com')) {
    return `https://${trimmed.replace(/^https?:\/\//i, '')}`;
  }
  trimmed = trimmed.replace(/^@/, '');
  if (platform === 'tiktok') {
    return `https://www.tiktok.com/@${trimmed}`;
  }
  if (platform === 'instagram') {
    return `https://www.instagram.com/${trimmed}`;
  }
  return trimmed;
}

