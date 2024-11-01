export const getOnlyBase64 = (e: string) => {
    return e.split(',').pop()
}