type Items = {
    id: number | string;
    parent: number | string;
    type?: string | null | undefined;
}[];

class TreeStore {
    itemsArray: Items;
    parentsArray: Items;

    constructor(items: Items) {
        this.itemsArray = items;
        this.parentsArray = [];
    };

    hasChildren(parentId: number | string) {
        return Boolean(this.getChildren(parentId));
    };

    getAll() {
        return items;
    };

    getItem(id: number | string) {
        return items.find(i => i.id === id);
    };

    getChildren(id: number | string) {
        return items.filter(i => i.parent === id);
    };

    getAllChildren(id: number | string) {
        let arr: Items = this.getChildren(id);

        arr.forEach(children => {
            arr.push(...this.getAllChildren(children.id));
        });

        return arr;
    };

    getAllParents(id: number | string): Items {
        const children = this.getItem(id);

        if(!children || children && typeof children.parent === "string"){
            return this.parentsArray;
        }
            
        const parent = this.getItem(children.parent);
        if(!parent){
            return this.parentsArray;
        }

        this.parentsArray.push(parent);
        
        return this.getAllParents(children.parent);
    }
}

const items: Items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

// console.log(ts.getAll());

// console.log(ts.getItem(7));

// console.log(ts.getChildren(5));

// console.log(ts.getAllChildren(2));

// console.log(ts.getAllParents(7));

function tests() {
    // getAll
    if (ts.getAll() !== items) {
        throw new Error('getAll function doesn`t work correctly');
    }

    // getItem Пример проверки пограничных значений
    if ((ts.getItem(1) !== items[0]) && ts.getItem(8) !== items[7]) {
        throw new Error('getItem function doesn`t work correctly');
    }

    // getChildren Проверка возвращаемого типа
    if (typeof ts.getChildren(1) !== (typeof items || [])) {
        throw new Error('getChildren function doesn`t work correctly');
    }

    // getAllChildren Пример проверки пограничных значений
    if ((ts.getAllChildren(1).length === 0) && (ts.getAllChildren(8).length > 0)) {
        throw new Error('getAllChildren function doesn`t work correctly');
    }

    // getAllParents
    if ((ts.getAllParents(1).length > 0) && (ts.getAllChildren(8).length === 0)) {
        throw new Error('getAllChildren function doesn`t work correctly');
    }

    console.log('All test passed');
}

tests();