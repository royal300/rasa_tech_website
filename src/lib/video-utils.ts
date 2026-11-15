export interface VideoEmbedData {
  type: "youtube" | "drive" | "vimeo" | "video" | "link";
  embedUrl: string;
  originalUrl: string;
  thumbnailUrl?: string;
}

export function parseVideoUrl(url: string): VideoEmbedData {
  const trimmed = (url || "").trim();

  // YouTube (standard, shorts, embed, youtu.be)
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
      originalUrl: trimmed,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Google Drive
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return {
      type: "drive",
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      originalUrl: trimmed,
    };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/
  );
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[3];
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      originalUrl: trimmed,
    };
  }

  // Direct HTML5 video (.mp4, .webm, .mov, .ogg)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return {
      type: "video",
      embedUrl: trimmed,
      originalUrl: trimmed,
    };
  }

  // Generic link
  return {
    type: "link",
    embedUrl: trimmed,
    originalUrl: trimmed,
  };
}
