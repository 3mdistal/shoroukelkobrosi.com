import AspectRatio from './aspect-ratio'

function createTrailerEmbed(vimeoUrl: string) {
  // Regular expression to extract the video ID
  const regex =
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i
  const match = vimeoUrl.match(regex)

  if (match && match[1]) {
    const videoId = match[1]
    const embedUrl = `https://player.vimeo.com/video/${videoId}`
    return embedUrl
  } else {
    return 'Invalid Vimeo URL'
  }
}

export default function TrailerEmbed({
  url,
  filmTitle,
}: {
  url: string
  filmTitle: string
}): React.ReactElement {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src={createTrailerEmbed(url)}
        title={`${filmTitle} trailer`}
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </AspectRatio>
  )
}
