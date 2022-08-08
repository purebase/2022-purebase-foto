import {BLOCKS, Blocks, EditableNodeTypes, MAIN, SLIDES, USERS} from "./_copy/reactTypesCopy";
import {createStringId} from "./_copy/commons";
import * as admin from "firebase-admin";

const blocks_default = (): Blocks => (
    {
        T: EditableNodeTypes.Blocks,
        name: BLOCKS,
        children: [
            {
                T: EditableNodeTypes.BlocksCategory,
                name: SLIDES,
                id: createStringId(),
                children: [
                    {T: EditableNodeTypes.BlocksSlide, id: createStringId(), name: 'Über uns', headline: 'headline', picture: []},
                    {T: EditableNodeTypes.BlocksSlide, id: createStringId(), name: 'Zutaten', headline: 'headline2', picture: []},
                    {T: EditableNodeTypes.BlocksSlide, id: createStringId(), name: 'Nachhaltig', headline: 'headline3', picture: []},
                ]
            },
        ]
    }
);

export function seller_initData(sellerId: string) {
    const refOf_usersItem = admin.firestore()
        .collection(USERS.toString())
        .doc(sellerId);

    refOf_usersItem.get()
        .then(value => {
            if (!value.exists) {
                console.debug('users => user !exists => set');

                const refOf_blocks = refOf_usersItem.collection(BLOCKS);
                refOf_blocks.get()
                    .then(documents => {
                        refOf_blocks.doc(MAIN).set(blocks_default());
                    })
                    .catch(reason => console.warn('Blocks - ERROR', reason));

            } else {
                console.debug('users => user exists => nothing');
            }

            console.debug('users->count => new Value: ', value.data());
        })
        .catch(reason => console.warn('users - ERROR', reason));
}
