
export type brandsPayloadType = {
    result: string,
    metadata: brandMetaData,
    data: brandType[],
}

export type brandMetaData = {
    currentPage:number,
    numberOfPages:number,
    limit:number,
    nextPage:number,
}

export type brandType = {
    image: string,
    name: string,
    slug: string,
    _id: string,
}
