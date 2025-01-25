import { Request, Response } from 'express';
import { cancelarReview } from '../controller/review';
import prisma from '../model/prisma';

jest.mock('../model/prisma', () => ({
  review: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('Controlador cancelarReview', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    jest.clearAllMocks();
    responseObject = {
      json: jest.fn().mockReturnThis(),
    };
    mockResponse = {
      status: jest.fn().mockReturnValue(responseObject),
      json: jest.fn(),
    };
  });

  test('deve deletar a review com sucesso', async () => {
    mockRequest = {
      id: 1,
      params: {
        idReview: '1',
      },
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      titulo: 'Review de Teste',
      comentario: 'Comentário de Teste',
      nota: 5,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);
    (prisma.review.delete as jest.Mock).mockResolvedValue(mockReview);

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.json).toHaveBeenCalledWith({
      message: 'Review deletada com sucesso!',
    });
    expect(prisma.review.delete).toHaveBeenCalledWith({
      where: { idReview: 1 },
    });
  });

  test('deve retornar 401 quando o usuário não estiver autenticado', async () => {
    mockRequest = {
      id: undefined,
      params: {
        idReview: '1',
      },
    };

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Usuário não autenticado.',
    });
  });

  test('deve retornar 404 quando a review não for encontrada', async () => {
    mockRequest = {
      id: 1,
      params: {
        idReview: '999',
      },
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(null);

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Review não encontrada.',
    });
  });

  test('deve retornar 403 quando o usuário não for o dono da review', async () => {
    mockRequest = {
      id: 2,
      params: {
        idReview: '1',
      },
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      titulo: 'Review de Teste',
      comentario: 'Comentário de Teste',
      nota: 5,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Você não tem permissão para deletar esta review.',
    });
  });

  test('deve retornar 500 quando ocorrer um erro no banco de dados ao buscar a review', async () => {
    mockRequest = {
      id: 1,
      params: {
        idReview: '1',
      },
    };

    (prisma.review.findUnique as jest.Mock).mockRejectedValue(new Error('Erro no banco de dados'));

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Erro interno ao deletar a review.',
    });
  });

  test('deve retornar 500 quando ocorrer um erro no banco de dados ao deletar a review', async () => {
    mockRequest = {
      id: 1,
      params: {
        idReview: '1',
      },
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      titulo: 'Review de Teste',
      comentario: 'Comentário de Teste',
      nota: 5,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);
    (prisma.review.delete as jest.Mock).mockRejectedValue(new Error('Erro ao deletar'));

    await cancelarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Erro interno ao deletar a review.',
    });
  });
});
