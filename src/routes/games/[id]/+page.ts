import type { PageLoad, PageData } from "./$types"
export const load:PageLoad = ({ params }) => {
    return {
        id: params.id,
    }
}