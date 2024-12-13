function createVimeoEmbed(
  vimeoUrl: string,
  autoplay: boolean = false,
  background: boolean = false,
) {
  // Regular expression to extract the video ID
  const regex =
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i
  const match = vimeoUrl.match(regex)

  if (match && match[1]) {
    const videoId = match[1]
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      background: background ? '1' : '0',
      loop: background ? '1' : '0',
      muted: background ? '1' : '0',
      transparent: '0',
    })
    const embedUrl = `https://player.vimeo.com/video/${videoId}?${params.toString()}`
    return embedUrl
  } else {
    return 'Invalid Vimeo URL'
  }
}

export default function VimeoEmbed({
  url,
  filmTitle,
  autoplay = false,
  background = false,
}: {
  url: string
  filmTitle: string
  autoplay?: boolean
  background?: boolean
  className?: string
}): React.ReactElement {
  const innerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as const

  return (
    <div style={innerStyle}>
      <iframe
        src={createVimeoEmbed(url, autoplay, background)}
        title={`${filmTitle} trailer`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
