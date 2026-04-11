export function getPaginationBasePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const pageIdx = segments.indexOf('page')
  if (pageIdx !== -1) {
    return segments.slice(0, pageIdx).join('/')
  }
  return segments.join('/')
}
