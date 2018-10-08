/* Test book data needed for the Jest & Enzyme suite */
const testBooks = {
	books: [
		{
			title: 'A Book Titled 1',
			subtitle: 'A Subtitle',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			authors: ['Author One', 'Author Two'],
			imageLinks: { thumbnail: 'http://book1.jpg?zoom=1' },
			id: 'nggnmAEACAAJ',
			shelf: 'wantToRead'
		},
		{
			title: 'Book 2: Electric Boogaloo',
			subtitle: 'Another Subtitle #2',
			description:
				'Suspendisse facilisis varius sem, ut auctor sem pulvinar sed.',
			categories: ['TEST', 'TEST2'],
			pageCount: 100,
			publishedDate: '1980',
			averageRating: 3,
			previewLink: 'http://test.com',
			authors: ['Guy Three', 'Guy Four'],
			imageLinks: { thumbnail: 'http://book2.jpg' },
			id: 'sJf1vQAACAAJ',
			shelf: 'read'
		},
		{
			title: '3: The Threequel',
			subtitle: 'The 3rd and Final Subtitle',
			averageRating: 3,
			authors: ['Writer Five', 'Writer Six'],
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