export interface MenuList {
    meunCode: string;
    menuName: string;
    parentMenuCode: string;
    portalMenu: PortalMenu[];
    boardMenu: BoardMenu[];
}

export interface PortalMenu {
    modlCode: string;
    menuCode: string;
    parentMenuCode: string;
    url: string;
    menuNameKor: string;
    menuNameEng: string;
    depth: number;
    path: string;
}

export interface BoardMenu {
    cateCode: string;
    menuCode: string;
    parentMenuCode: string;
    menuNameKor: string;
    menuNameEng: string;
    description: string;
    menuType: string;
    depth: number;
    url: string;
    path: string;
    displayYn: boolean;
    mobileUseYn: boolean;
    useYn: boolean;
    adminYn: boolean;
    writeYn: boolean;
    commentYn: boolean;
}



