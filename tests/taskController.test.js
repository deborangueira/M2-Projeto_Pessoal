// tests/taskController.test.js

const taskController = require('../controllers/taskController');
const taskService = require('../services/taskService');

jest.mock('../services/taskService');

describe('taskController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            session: {
                userId: '123' // Simula um usuário logado
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTask', () => {
        test('deve retornar todas as tarefas do usuário logado', async () => {
            const mockTasks = [
                { 
                    id: '1', 
                    título: 'Tarefa 1',
                    descricao: 'Descrição da tarefa 1',
                    prazo: '2025-12-31',
                    prioridade: 'alta',
                    concluido: false,
                    user_id: '123'
                }
            ];

            taskService.getAllTask.mockResolvedValueOnce(mockTasks);

            await taskController.getAllTask(req, res);

            expect(taskService.getAllTask).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTasks);
        });

        test('deve retornar erro quando o serviço falhar', async () => {
            const error = new Error('Erro ao buscar tarefas');
            taskService.getAllTask.mockRejectedValueOnce(error);

            await taskController.getAllTask(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar tarefas' });
        });
    });

    describe('createTask', () => {
        test('deve criar uma nova tarefa com sucesso', async () => {
            const mockTask = {
                título: 'Nova Tarefa',
                descricao: 'Descrição da nova tarefa',
                prazo: '2025-12-31',
                prioridade: 'alta'
            };

            req.body = mockTask;

            const createdTask = { id: '1', ...mockTask, user_id: '123' };
            taskService.createTask.mockResolvedValueOnce(createdTask);

            await taskController.createTask(req, res);

            expect(taskService.createTask).toHaveBeenCalledWith({ ...mockTask, user_id: '123' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdTask);
        });

        test('deve retornar erro quando dados estiverem inválidos', async () => {
            req.body = { título: '' }; // Título vazio deve ser inválido

            await taskController.createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 
                error: expect.any(String)
            });
        });
    });

    describe('updateTask', () => {
        test('deve atualizar uma tarefa existente', async () => {
            const taskId = '1';
            const updateData = {
                título: 'Tarefa Atualizada',
                descricao: 'Nova descrição',
                prioridade: 'baixa',
                concluido: true
            };

            req.params = { id: taskId };
            req.body = updateData;

            const updatedTask = { id: taskId, ...updateData, user_id: '123' };
            taskService.getTaskById.mockResolvedValueOnce({ id: taskId, user_id: '123' });
            taskService.updateTask.mockResolvedValueOnce(updatedTask);

            await taskController.updateTask(req, res);

            expect(taskService.updateTask).toHaveBeenCalledWith(taskId, updateData);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedTask);
        });

        test('deve retornar erro ao tentar atualizar tarefa de outro usuário', async () => {
            const taskId = '1';
            req.params = { id: taskId };
            req.body = { título: 'Teste' };

            taskService.getTaskById.mockResolvedValueOnce({ id: taskId, user_id: '456' }); // Outro usuário

            await taskController.updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ 
                error: 'Você não tem permissão para atualizar esta tarefa' 
            });
        });
    });

    describe('deleteTask', () => {
        test('deve deletar uma tarefa existente', async () => {
            const taskId = '1';
            req.params = { id: taskId };

            taskService.getTaskById.mockResolvedValueOnce({ id: taskId, user_id: '123' });
            taskService.deleteTask.mockResolvedValueOnce(true);

            await taskController.deleteTask(req, res);

            expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ 
                message: 'Tarefa excluída com sucesso' 
            });
        });

        test('deve retornar erro ao tentar deletar tarefa inexistente', async () => {
            const taskId = '999';
            req.params = { id: taskId };

            taskService.getTaskById.mockResolvedValueOnce(null);

            await taskController.deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ 
                error: 'Tarefa não encontrada' 
            });
        });
    });
});
