/**
 * Every image is described with its real pixel size. Frames read the size to set
 * their aspect ratio, so a screenshot is never cropped or stretched, and the
 * image is never drawn larger than it was captured (no soft, upscaled screens).
 */
export interface Img {
  src: string;
  w: number;
  h: number;
}

/** App screens: raw captures, 880 px wide (560 px for the small variant). */
export const phone = (name: string, small = false): Img =>
  small
    ? { src: `/work/phone/${name}-s.webp`, w: 560, h: name === "gl-link" ? 1106 : 1105 }
    : { src: `/work/phone/${name}.webp`, w: 880, h: name === "gl-link" ? 1737 : 1736 };

/** Guestlist web pages, captured at 1440x900 @2x and exported 1600x1000. */
export const gl = (name: "web" | "landing"): Img => ({ src: `/work/gl/${name}.webp`, w: 1600, h: 1000 });
export const GL_BO: Img = { src: "/work/gl/bo.webp", w: 900, h: 562 };

/** Client and Web3 sites, captured at 1440x900 @2x and exported 800x500. */
export const shot = (slug: string): Img => ({ src: `/work/t/${slug}.webp`, w: 800, h: 500 });

/** Store graphics for the Jobseeker apps (9:16). */
export const poster = (name: string): Img => ({ src: `/work/poster/${name}.webp`, w: 540, h: 960 });

/** Hero phones: a 640 px centre screen and 480 px side screens, because they are never drawn larger than that. */
export const heroPhone = (name: "gl-home" | "gl-nightlife" | "gl-ticket"): Img =>
  name === "gl-home" ? { src: "/work/phone/gl-home-m.webp", w: 640, h: 1263 } : { src: `/work/phone/${name}-xs.webp`, w: 480, h: 947 };

export const PHOTO = {
  ironFairies: { src: "/work/photo/iron-fairies.webp", w: 960, h: 640 },
  finns: { src: "/work/photo/finns.webp", w: 960, h: 640 },
  tropical: { src: "/work/photo/tropical.webp", w: 960, h: 640 },
} satisfies Record<string, Img>;
