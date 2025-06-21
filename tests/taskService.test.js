// tests/taskService.test.js

const taskService = require('../services/taskService'); // importa o arquivo que vai testar
const db = require('../config/db'); //importa a config do banco de dados

jest.mock('../config/db'); // criou um ambiente de simulação

describe('taskService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        test('deve retornar todas as tarefas de um usuário', async () => {
            const userId = '123';
            const mockTasks = [
                { 
                    id: '1', 
                    título: 'Tarefa 1', 
                    user_id: userId 
                }
            ];

            db.query.mockResolvedValueOnce({ rows: mockTasks });

            const result = await taskService.getAllTask(userId);

            expect(result).toEqual(mockTasks);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT'),
                [userId]
            );
        });

        test('deve retornar array vazio quando usuário não tem tarefas', async () => {
            const userId = '123';
            db.query.mockResolvedValueOnce({ rows: [] });

            const result = await taskService.getAllTask(userId);

            expect(result).toEqual([]);
        });
    });

    describe('createTask', () => {
        test('deve criar uma nova tarefa', async () => {
            const taskData = {
                título: 'Nova Tarefa',
                descricao: 'Descrição',
                user_id: '123'
            };

            const mockCreatedTask = {"descricao": "Descrição", "id": 1, "título": "Nova Tarefa", "user_id": "123"};
            db.query.mockResolvedValueOnce({ rows: [mockCreatedTask] });

            const result = await taskService.createTask(taskData);

            expect(result).toEqual(mockCreatedTask);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO tasks'),
                expect.any(Array)
            );
        });
    });

    describe('updateTask', () => {
        test('deve atualizar uma tarefa existente', async () => {
            const taskId = '1';
            const updateData = {
                título: 'Tarefa Atualizada',
                descricao: 'Nova descrição'
            };

            const mockUpdatedTask = { id: taskId, ...updateData };
            db.query.mockResolvedValueOnce({ rows: [mockUpdatedTask] });

            const result = await taskService.updateTask(taskId, updateData);

            expect(result).toEqual(mockUpdatedTask);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE tasks'),
                expect.any(Array)
            );
        });

        test('deve retornar null ao tentar atualizar tarefa inexistente', async () => {
            const taskId = '999';
            db.query.mockResolvedValueOnce({ rows: [] });

            const result = await taskService.updateTask(taskId, {});

            expect(result).toBeNull();
        });
    });

    describe('deleteTask', () => {
        test('deve deletar uma tarefa existente', async () => {
            const taskId = '1';
            db.query.mockResolvedValueOnce({ rowCount: 1 });

            const result = await taskService.deleteTask(taskId);

            expect(result).toBe(true);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM tasks'),
                [taskId]
            );
        });

        test('deve retornar false ao tentar deletar tarefa inexistente', async () => {
            const taskId = '999';
            db.query.mockResolvedValueOnce({ rowCount: 0 });

            const result = await taskService.deleteTask(taskId);

            expect(result).toBe(false);
        });
    });

    describe('getTaskById', () => {
        test('deve retornar uma tarefa específica', async () => {
            const taskId = '1';
            const mockTask = { 
                id: taskId, 
                título: 'Tarefa 1', 
                user_id: '123' 
            };

            db.query.mockResolvedValueOnce({ rows: [mockTask] });

            const result = await taskService.getTaskById(taskId);

            expect(result).toEqual(mockTask);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM tasks'),
                [taskId]
            );
        });

        test('deve retornar null para tarefa inexistente', async () => {
            const taskId = '999';
            db.query.mockResolvedValueOnce({ rows: [] });

            const result = await taskService.getTaskById(taskId);

            expect(result).toBeNull();
        });
    });
});
