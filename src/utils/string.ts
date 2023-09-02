export function fuzzyMatchRegExp(searchPattern: string, text: string): boolean {
  const fuzzyPattern =
    '.*' + searchPattern.toLowerCase().split('').join('.*') + '.*'
  const re = new RegExp(fuzzyPattern, 'i')
  return !!re.test(text.toLowerCase())
}
