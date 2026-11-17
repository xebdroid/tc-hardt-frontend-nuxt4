import { computed } from 'vue'
import db from '~/assets/data/db.json'
import type { GalleryAlbum, GalleryImage } from '~/types'

export interface ResolvedGalleryAlbum extends Omit<GalleryAlbum, 'images'> {
  coverImage: string
  images: GalleryImage[]
  imageCount: number
  photoCount: number
  videoCount: number
}

const isVideoPath = (path: string) => /\.(mp4|webm|mov)$/i.test(path)

// Automatische Erkennung aller Bilder & Videos in public/img/gallery/** zur Build-/Dev-Zeit
const galleryFiles = import.meta.glob('../../public/img/gallery/**/*.{jpg,jpeg,png,webp,avif,mp4,webm,mov,JPG,JPEG,PNG,WEBP,MP4,WEBM,MOV}')

const allDiscoveredPaths = Object.keys(galleryFiles)
  .map(key => key.replace(/^.*\/public(\/img\/gallery\/.*)$/, '$1'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

export const useGallery = () => {
  const rawAlbums = computed<GalleryAlbum[]>(() => {
    return ((db as any).galleries || []) as GalleryAlbum[]
  })

  const parseGermanDate = (dateStr: string): number => {
    if (!dateStr) return 0
    if (dateStr.includes('.')) {
      const parts = dateStr.split('.').map(Number)
      if (parts.length === 3) {
        const [day, month, year] = parts
        return new Date(year, month - 1, day).getTime()
      }
    }
    const parsed = new Date(dateStr).getTime()
    return isNaN(parsed) ? 0 : parsed
  }

  const resolveAlbumImages = (album: GalleryAlbum): GalleryImage[] => {
    const resolvedMap = new Map<string, GalleryImage>()

    // 1. Automatisch alle Bilder & Videos aus public/img/gallery/<folder> laden
    if (album.folder) {
      const normalizedFolder = album.folder.replace(/^\/+|\/+$/g, '')
      const prefix = `/img/gallery/${normalizedFolder}/`

      for (const path of allDiscoveredPaths) {
        if (path.startsWith(prefix)) {
          const filename = path.slice(prefix.length)
          const caption = album.captions?.[filename] || album.captions?.[path] || undefined
          const isVideo = isVideoPath(path)
          resolvedMap.set(path, {
            src: path,
            type: isVideo ? 'video' : 'image',
            alt: caption || `${album.title} – ${isVideo ? 'Video' : 'Foto'}`,
            caption
          })
        }
      }
    }

    // 2. Optional: Manuell in db.json hinterlegte Medien ergänzen oder überschreiben
    if (Array.isArray(album.images)) {
      for (const item of album.images) {
        if (typeof item === 'string') {
          const filename = item.split('/').pop() || ''
          const caption = album.captions?.[filename] || album.captions?.[item] || undefined
          const isVideo = isVideoPath(item)
          resolvedMap.set(item, {
            src: item,
            type: isVideo ? 'video' : 'image',
            alt: caption || `${album.title} – ${isVideo ? 'Video' : 'Foto'}`,
            caption
          })
        } else if (item && item.src) {
          const isVideo = item.type ? item.type === 'video' : isVideoPath(item.src)
          resolvedMap.set(item.src, {
            src: item.src,
            type: isVideo ? 'video' : 'image',
            alt: item.alt || item.caption || `${album.title} – ${isVideo ? 'Video' : 'Foto'}`,
            caption: item.caption
          })
        }
      }
    }

    return Array.from(resolvedMap.values())
  }

  const galleries = computed<ResolvedGalleryAlbum[]>(() => {
    return rawAlbums.value
      .filter(album => album.published !== false)
      .map((album) => {
        const images = resolveAlbumImages(album)
        const onlyPhotos = images.filter(img => img.type !== 'video')
        const videoCount = images.filter(img => img.type === 'video').length
        const coverFromFolder = onlyPhotos.find(img => /\/cover\.(jpg|jpeg|png|webp|avif)$/i.test(img.src))?.src
        const coverImage = album.cover || coverFromFolder || onlyPhotos[0]?.src || '/img/logo.png'

        return {
          ...album,
          coverImage,
          images,
          imageCount: images.length,
          photoCount: onlyPhotos.length,
          videoCount
        }
      })
      .sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year
        return parseGermanDate(b.date) - parseGermanDate(a.date)
      })
  })

  const years = computed<number[]>(() => {
    const uniqueYears = new Set<number>()
    for (const album of galleries.value) {
      if (album.year) uniqueYears.add(album.year)
    }
    return Array.from(uniqueYears).sort((a, b) => b - a)
  })

  const getGalleryBySlug = (slug: string): ResolvedGalleryAlbum | undefined => {
    return galleries.value.find(album => album.slug === slug)
  }

  return {
    galleries,
    years,
    getGalleryBySlug
  }
}
