export const USERS:string = 'users';
export const SITES:string = 'sites';
export const PREFS:string = 'prefs';
export const CLIENTS:string = 'clients';
export const ORDERS:string = 'orders';
export const DISHESCARD:string = 'dishescard';
export const BLOCKS:string = 'blocks';
export const SLIDES:string = 'slides';
export const MAIN:string = 'main';


export interface BaseDS {
    uuid?: string,
    created?: Date | string
}

export type SlateEditorData = { edit: string, html: string } | undefined;

// TODO Reduce it for usage of only the key:
export enum EditableNodeTypes {
    card='card' , category='category' , dish='dish',
    Blocks='Blocks', BlocksCategory='BlocksCategory', BlocksSlide='BlocksSlide'
}

export const getChildType = (node: EditableNodeDS):EditableNodeTypes | null  => {
    if (isShoppingDishesCard(node)) {
        return EditableNodeTypes.category;
    } else if (isShoppingDishesCategory(node)) {
        return EditableNodeTypes.dish;
    } else if (isShoppingDish(node)) {
        return null;

    } else if (isBlocks(node)) {
        return EditableNodeTypes.BlocksCategory;
    }else if (isBlocksCategory(node)) {
        return EditableNodeTypes.BlocksSlide;
    } else if (isBlocksSlide(node)) {
        return null;
    }

    console.warn('reactTypes/getShortType() type? of node:', node);
    return null;
}



export interface ShoppingClientDS extends BaseDS {
    name: string,
    phone: number
}

export interface AccountDS extends BaseDS {
    displayName: string,
    email?: string,
    phone?: string,
    login: 'base' | 'phone'
}

export interface ShoppingOrderDS extends BaseDS {
    filledDishesCard: ShoppingDishesCardDS,
    clientUUID?: string,
    time?: number,

    client?: ShoppingClientDS,
    canceled?: string,
    ready?: boolean
}



export interface EditableNodeDS {
    T: string,
    children?: Array<EditableNodeDS>,
    selfId?: number,
    parentId?: number
    depth?: number,
    name: string,
}

export interface Blocks extends EditableNodeDS {
    children: Array<BlocksCategory>
}
export function isBlocks(node: EditableNodeDS): node is Blocks {
    return node.T === EditableNodeTypes.Blocks.valueOf();
}

export interface BlocksCategory extends EditableNodeDS {
    // TODO is ID necessary anymore? -> currently for displaying
    id: string,
    children: Array<BlocksSlide>
}
export function isBlocksCategory(node: EditableNodeDS): node is BlocksCategory {
    return node.T === EditableNodeTypes.BlocksCategory.valueOf();
}

export interface BlocksSlide extends EditableNodeDS {
    // TODO is ID necessary anymore? -> currently for displaying
    id: string,
    headline: string,
    subline?: string,
    description?: SlateEditorData,
    picture: string[]
}
export function isBlocksSlide(node: EditableNodeDS): node is BlocksSlide {
    return node.T === EditableNodeTypes.BlocksSlide.valueOf();
}




export interface ShoppingDishesCardDS extends EditableNodeDS {
    // [index: number]: ShoppingDishesCategory;
    children: Array<ShoppingDishesCategory>,
    total: number,

    //theme?: AppTheme,
    // TODO
    theme?: any
}
export function isShoppingDishesCard(node: EditableNodeDS): node is ShoppingDishesCardDS {
    return node.T === EditableNodeTypes.card.valueOf();
}

export interface ShoppingDishesCategory extends EditableNodeDS {
    // TODO is ID necessary anymore? -> currently for displaying
    id: string,
    children: Array<ShoppingDish>
}
export function isShoppingDishesCategory(node: EditableNodeDS): node is ShoppingDishesCategory {
    return node.T === EditableNodeTypes.category.valueOf();
}

export interface ShoppingDish extends EditableNodeDS {
    // TODO is ID necessary anymore? -> currently for displaying
    id: string,
    description: string,
    picture?: string[],
    price: number,
    count: number,
    lfdNr: number
}
export function isShoppingDish(node: EditableNodeDS): node is ShoppingDish {
    return node.T === EditableNodeTypes.dish.valueOf();
}
