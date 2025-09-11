export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    export interface ITrackUploader {
        _id: string;
        email: string;
        name: string;
        role: string;
        type: string;
    }

    export interface ITrackTop {
        _id: string;
        title: string;
        description: string;
        category: string;
        imgUrl: string;
        trackUrl: string;
        countLike: number;
        countPlay: number;
        uploader: ITrackUploader;
        isDeleted: boolean;
        __v?: number;
        createdAt?: string;
        updatedAt?: string;
    }
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

}
