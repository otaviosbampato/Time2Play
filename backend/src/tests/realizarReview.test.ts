import { Request, Response } from 'express';
import { realizarReview } from '../controller/review';
import prisma from '../db/prisma';

jest.mock('../db/prisma', () => ({
  quadra: {
    findUnique: jest.fn(),
  },
  cliente: {
    findUnique: jest.fn(),
  },
  review: {
    create: jest.fn(),
  },
}));

describe('Controlador realizarReview', () => {
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

  test('deve criar uma review com sucesso', async () => {
    const mockReviewData = {
      nota: 4,
      titulo: 'Ótima quadra',
      comentario: 'Muito bem mantida',
      quadraId: 1,
    };

    mockRequest = {
      body: mockReviewData,
      id: 1,
    };

    const mockQuadra = { idQuadra: 1, nome: 'Quadra Test' };
    const mockCliente = { idCliente: 1, nome: 'Cliente Test' };
    const mockNovaReview = { ...mockReviewData, id: 1 };

    (prisma.quadra.findUnique as jest.Mock).mockResolvedValue(mockQuadra);
    (prisma.cliente.findUnique as jest.Mock).mockResolvedValue(mockCliente);
    (prisma.review.create as jest.Mock).mockResolvedValue(mockNovaReview);

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(responseObject.json).toHaveBeenCalledWith({
      message: 'Review criada com sucesso!',
      review: mockNovaReview,
    });
  });

  test('deve retornar 400 quando a nota for inválida', async () => {
    mockRequest = {
      body: {
        nota: 6,
        titulo: 'Ótima quadra',
        comentario: 'Muito bem mantida',
        quadraId: 1,
      },
      id: 1,
    };

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'A nota deve estar entre 0 e 5.',
    });
  });

  test('deve retornar 400 quando campos obrigatórios estiverem faltando', async () => {
    mockRequest = {
      body: {
        nota: 4,
        comentario: 'Muito bem mantida',
        quadraId: 1,
      },
      id: 1,
    };

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Todos os campos são obrigatórios.',
    });
  });

  test('deve retornar 404 quando a quadra não for encontrada', async () => {
    mockRequest = {
      body: {
        nota: 4,
        titulo: 'Ótima quadra',
        comentario: 'Muito bem mantida',
        quadraId: 999,
      },
      id: 1,
    };

    (prisma.quadra.findUnique as jest.Mock).mockResolvedValue(null);

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Quadra não encontrada.',
    });
  });

  test('deve retornar 404 quando o cliente não for encontrado', async () => {
    mockRequest = {
      body: {
        nota: 4,
        titulo: 'Ótima quadra',
        comentario: 'Muito bem mantida',
        quadraId: 1,
      },
      id: 999,
    };

    (prisma.quadra.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.cliente.findUnique as jest.Mock).mockResolvedValue(null);

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Cliente não encontrado.',
    });
  });

  test('deve retornar 500 quando ocorrer um erro no banco de dados', async () => {
    mockRequest = {
      body: {
        nota: 4,
        titulo: 'Ótima quadra',
        comentario: 'Muito bem mantida',
        quadraId: 1,
      },
      id: 1,
    };

    (prisma.quadra.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

    await realizarReview(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.json).toHaveBeenCalledWith({
      error: 'Erro interno ao criar a review.',
    });
  });
});