interface IItemProps {
    label: string;
    key: string;
    children?: IItemProps[];
    icon?: React.ReactNode;
}

interface IMenuProps {
    title: string;
    key: string;
    path: string;
    children?: IMenuProps[];
}


export type {
    IItemProps,
    IMenuProps
}