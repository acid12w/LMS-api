import { Test, TestingModule } from '@nestjs/testing';
import { MycoursesController } from './mycourses.controller';

describe('MycoursesController', () => {
  let controller: MycoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MycoursesController],
    }).compile();

    controller = module.get<MycoursesController>(MycoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
