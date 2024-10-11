export interface GoogleResponse {
    credential?: string;
}


export interface CardProps {
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
    onUpdate: (id: number, newTitle: string) => void;
    onDelete: (id: number) => void;
}

export interface Photo {
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
}


export interface User {
    name: string;
    email: string;
}

export interface SidebarButtons {
    title: string;
    icon: React.ReactNode;
    link: string;
    isUser?: boolean;
}
