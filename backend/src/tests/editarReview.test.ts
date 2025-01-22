import { Request, Response } from 'express';
import { editarReview } from '../controller/review';
import prisma from '../db/prisma';

jest.mock('../db/prisma', () => ({
  review: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('Controlador editarReview', () => {
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

  test('deve atualizar a review com sucesso', async () => {
    const dadosAtualizados = {
      nota: 4,
      titulo: 'Review Atualizada',
      comentario: 'Comentário atualizado',
    };

    mockRequest = {
      id: 1,
      params: { idReview: '1' },
      body: dadosAtualizados,
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      ...dadosAtualizados,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);
    (prisma.review.update as jest.Mock).mockResolvedValue({
      ...mockReview,
      ...dadosAtualizados,
    });

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.json).toHaveBeenCalledWith({
      message: 'Review atualizada com sucesso!',
      review: expect.objectContaining(dadosAtualizados),
    });
  });

  test('deve retornar 401 se o usuário não estiver autenticado', async () => {
    mockRequest = {
      id: undefined,
      params: { idReview: '1' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Usuário não autenticado.',
    });
  });

  test('deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
    mockRequest = {
      id: 1,
      params: { idReview: '1' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
      },
    };

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Todos os campos (nota, título, comentário) são obrigatórios.',
    });
  });

  test('deve retornar 400 se a nota for inválida', async () => {
    mockRequest = {
      id: 1,
      params: { idReview: '1' },
      body: {
        nota: 6,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'A nota deve estar entre 0 e 5.',
    });
  });

  test('deve retornar 404 se a review não for encontrada', async () => {
    mockRequest = {
      id: 1,
      params: { idReview: '999' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(null);

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Review não encontrada.',
    });
  });

  test('deve retornar 403 se o usuário não for o dono da review', async () => {
    mockRequest = {
      id: 2,
      params: { idReview: '1' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      titulo: 'Original Review',
      comentario: 'Original Comment',
      nota: 5,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Você não tem permissão para editar esta review.',
    });
  });

  test('deve retornar 500 se ocorrer um erro no banco de dados ao buscar', async () => {
    mockRequest = {
      id: 1,
      params: { idReview: '1' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    (prisma.review.findUnique as jest.Mock).mockRejectedValue(new Error('Erro no banco de dados'));

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Erro interno ao editar a review.',
    });
  });

  test('deve retornar 500 se ocorrer um erro no banco de dados ao atualizar', async () => {
    mockRequest = {
      id: 1,
      params: { idReview: '1' },
      body: {
        nota: 4,
        titulo: 'Review Atualizada',
        comentario: 'Comentário atualizado',
      },
    };

    const mockReview = {
      idReview: 1,
      clienteId: 1,
      titulo: 'Original Review',
      comentario: 'Original Comment',
      nota: 5,
    };

    (prisma.review.findUnique as jest.Mock).mockResolvedValue(mockReview);
    (prisma.review.update as jest.Mock).mockRejectedValue(new Error('Erro ao atualizar'));

    await editarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Erro interno ao editar a review.',
    });
  });
});
