// composables/useAssetUrl.ts

type ImageData = {
  url: string
  storage?: string
  type?: string
}

export const useAssetUrl = (
  image?: ImageData | string | ImageData[],
  preferredType: string = "logo"
): string => {
  const config = useRuntimeConfig()

  if (!image) return ""

  if (Array.isArray(image)) {
    const found = image.find((img) => img.type === preferredType)
    if (!found) return ""
    return useAssetUrl(found) // recursion is now safe with return type
  }

  if (typeof image === "string") {
    if (image.startsWith("http")) return image
    return `${config.public.API_BASE_URL}${image}`
  }

  const { url, storage = "local" } = image
  if (!url) return ""

  if (storage === "cloudinary" || url.startsWith("http")) {
    return url
  }

  return `${config.public.API_BASE_URL}${url}`
}
