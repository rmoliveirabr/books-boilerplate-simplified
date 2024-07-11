// Para operações GET (lista) e POST (criar novo livro)

import { NextApiRequest, NextApiResponse } from 'next';
import { BookUseCases } from '@/actions/book/book-use-cases';
import { BookPresenter } from '@/backend/infra/http/presenters/book-presenter';

// Lista todos os livros (GET) ou cria um novo livro (POST)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const bookRepository = new BookRepository();
    
    switch (req.method) {
    case 'GET':
      const { page = '1', pageSize = '10', query } = req.query;

      const response = await BookUseCases.getInstance().getAllBooksUseCase.execute({
          pagination: {
            page: parseInt(page as string),
            pageSize: parseInt(pageSize as string),
            filters: { query: query as string },
            // sorting: { asc: asc ? true : desc ? true : false, column: asc },
          },
      });
    
      const bookList = response.getResponse()?.books.map((book) => BookPresenter.toHttpResponse(book)) || [];
      const totalCount = response.getResponse()?.totalCount || 0;
    
      return res.status(200).json({
          books: bookList,
          totalCount,
      });

      // return {
      //     books: bookList,
      //     totalCount,
      // };      

      // OLD CODE
      // const listBooksUseCase = new ListBooks(bookRepository);
      // const bookList = await listBooksUseCase.execute();

      // return res.status(200).json(bookList);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
