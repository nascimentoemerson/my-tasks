import { Test, TestingModule } from '@nestjs/testing';
import { TaskControllerController } from './task.controller';

describe('TaskControllerController', () => {
  let controller: TaskControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskControllerController],
    }).compile();

    controller = module.get<TaskControllerController>(TaskControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
