/* Test book data needed for the Jest & Enzyme suite */
const testBooks = {
	books: [
		{
			title: 'The First Book',
			subtitle: 'A Subtitle for the first book',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			authors: ['Author One', 'Author Two'],
			imageLinks: { thumbnail: 'http://book1.jpg?zoom=1' },
			id: 'nggnmAEACAAJ',
			shelf: 'wantToRead'
		},
		{
			title: 'The Second Book',
			subtitle: 'Another Subtitle',
			description: 'Sample Description',
			categories: ['TEST', 'TEST2'],
			pageCount: 100,
			publishedDate: '1980',
			averageRating: 3,
			previewLink: 'http://test.com',
			authors: ['Author', 'Author'],
			imageLinks: { thumbnail: 'http://book2.jpg' },
			id: 'sJf1vQAACAAJ',
			shelf: 'read'
		},
		{
			title: 'The Third Book',
			subtitle: 'The Subtitle',
			averageRating: 3,
			authors: ['Another Author', 'Author X'],
			imageLinks: { thumbnail: 'http://book3.png' },
			id: 'bKs2xWEECBAL',
			shelf: 'read'
		}
	]
};

/* JSON headers for API requests */
const jsonHeaders = new Headers({
	Accept: 'application/json',
	'Content-Type': 'application/json'
});

export { testBooks, jsonHeaders };