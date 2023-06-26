import { Test, TestingModule } from '@nestjs/testing';
import { MycoursesService } from './mycourses.service';

describe('MycoursesService', () => {
  let service: MycoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MycoursesService],
    }).compile();

    service = module.get<MycoursesService>(MycoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
