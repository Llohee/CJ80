export const initialData = {
    boards: [
        {
            id: 'board-1',
            columOder: ['colum-1', 'colum-2', 'colum-3'],
            colums: [
                {
                    id: 'colum-1',
                    boardId: 'board-1',
                    title: 'To do colum',
                    cardOder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        { id: 'card-1', boardId: 'board-1', columId: 'colum-1', title: 'title of card 1', cover: 'https://th.bing.com/th/id/OIP.wSTCfMrxzjhhb3_b-BPxmAHaFV?w=279&h=202&c=7&r=0&o=5&pid=1.7' },
                        { id: 'card-2', boardId: 'board-1', columId: 'colum-1', title: 'title of card 2', cover: null },
                        { id: 'card-3', boardId: 'board-1', columId: 'colum-1', title: 'title of card 3', cover: null },
                        { id: 'card-4', boardId: 'board-1', columId: 'colum-1', title: 'title of card 4', cover: null },
                        { id: 'card-5', boardId: 'board-1', columId: 'colum-1', title: 'title of card 5', cover: null },
                        { id: 'card-6', boardId: 'board-1', columId: 'colum-1', title: 'title of card 6', cover: null },
                        { id: 'card-7', boardId: 'board-1', columId: 'colum-1', title: 'title of card 7', cover: null },
                    ]
                },
                {
                    id: 'colum-2',
                    boardId: 'board-1',
                    title: 'Content',
                    cardOder: ['card-6', 'card-7', 'card-8'],
                    cards: [
                        { id: 'card-6', boardId: 'board-1', columId: 'colum-1', title: 'title of card 6', cover: null },
                        { id: 'card-7', boardId: 'board-1', columId: 'colum-1', title: 'title of card 7', cover: null },
                        { id: 'card-8', boardId: 'board-1', columId: 'colum-1', title: 'title of card 8', cover: null },
                    ]
                },
                {
                    id: 'colum-3',
                    boardId: 'board-1',
                    title: 'Done',
                    cardOder: ['card-9', 'card-10', 'card-11',],
                    cards: [
                        { id: 'card-9', boardId: 'board-1', columId: 'colum-1', title: 'title of card 9', cover: null },
                        { id: 'card-10', boardId: 'board-1', columId: 'colum-1', title: 'title of card 10', cover: null },
                        { id: 'card-11', boardId: 'board-1', columId: 'colum-1', title: 'title of card 11', cover: null },
                    ]

                }

            ]
        }
    ]
}