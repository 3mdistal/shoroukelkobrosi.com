interface RichTextNode {
  text?: string
  children?: RichTextNode[]
}

export const validateRichTextLength = (maxCharacterCount: number) => {
  return (value: { root: RichTextNode }): string | true => {
    const countCharacters = (node: RichTextNode | null | undefined): number => {
      if (!node) return 0
      if (typeof node.text === 'string') {
        return node.text.length
      }
      if (Array.isArray(node.children)) {
        return node.children.reduce((sum: number, child) => sum + countCharacters(child), 0)
      }
      return 0
    }
    const characterCount = countCharacters(value.root)
    return (
      characterCount <= maxCharacterCount ||
      `Text must not exceed ${maxCharacterCount.toString()} characters`
    )
  }
}
