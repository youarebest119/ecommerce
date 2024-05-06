import { FormikProps } from "formik"
import { ButtonHTMLAttributes, ChangeEventHandler, FormEvent, InputHTMLAttributes, ReactNode } from "react"
import { ActionMeta, OnChangeValue, Options } from "react-select"

export type TShimmer = {
    animationDuration?: string,
    width?: number | string,
    height?: number | string,
    fluid?: boolean,
    verticlyFluid?: boolean,
    className?: string,
}

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    fluid?: boolean,
}

export type TErrorMsg = {
    children?: ReactNode,
    className?: string,
}

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
    label?: string,
    name: string,
    error?: string,
}

export type TSearchByModal = {
    show?: boolean,
    handleClose?: () => void,
    handleChange?: ChangeEventHandler<HTMLInputElement>,
    handleSubmit?: (e: FormEvent<HTMLFormElement>) => void,
    value?: string,
}

export type TCustomModal = {
    show?: boolean,
    handleClose?: () => void,
    title?: string | ReactNode,
    children?: ReactNode,
    className?: string,
}

export type TRadio = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    name: string,
    error?: string,
}

export type TCheckbox = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    name: string,
    error?: string,
}

export type TOption = {
    label: string,
    value: string | number,
}

export type TSelect = {
    options?: Options<TOption>,
    onChange?: (option: OnChangeValue<TOption, false>, actionMeta: ActionMeta<TOption>) => void,
    className?: string,
    value?: TOption,
    defaultValue?: TOption,
    menuIsOpen?: boolean,
    isSearchable?: boolean,
    error?: string,
    label?: string,
    isLoading?: boolean,
}


export type Values = {
    searchBy: string,
    gender: string,
    category: string,
    availableSizes: string,
}

export type TFilterModal = {
    show?: boolean,
    handleClose?: () => void,
    formik: FormikProps<Values>
}

export type TProduct = {
    productImage: {
        url: string;
    };
    _id: string;
    category: string;
    author: string;
    name: string;
    description: string;
    tags: string[];
    isInStock: boolean;
    gender: string;
    availableSizes: string[];
    rating: number;
    price: number;
    brandName: string;
    additionalImages: {
        url: string;
        _id: string;
    }[];
    reviews: never[];
    createdAt: string;
    updatedAt: string;
}

export type TProductCard = {
    product?: TProduct,
    className?: string,
}


export type TEmailSentModal = {
    show?: boolean,
    handleClose?: () => void,
    email?: string,
}

export type TConfirmationModal = {
    show?: boolean,
    handleClose?: () => void,
    title?: string,
    callback?: () => void,
}
export type TAccountDeletConfirmation = {
    show?: boolean,
    handleClose?: () => void,
}

export type TAuthGaurd = {
    children?: ReactNode,
}
export type TNoGaurd = {
    children?: ReactNode,
}

export type TUseProducts = {
    search?: string,
    page?: number,
    range?: [number?, number?],
    description?: string,
    gender?: string,
    category?: string,
    tags?: string,
    isInStock?: boolean,
    availableSizes?: number | string,
}

export type TGetProducts = {
    data: TProduct[],
    dataPerPage: string,
    fetched: number,
    success: boolean,
    total: number,
}

export type TNoRecordFound = {
    className?: string,
    text?: string,
}

export type TFiltersApplied = {
    text?: string,
    formik: FormikProps<Values>,
    clearText?: () => void,
}