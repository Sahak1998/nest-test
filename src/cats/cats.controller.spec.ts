import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Cat} from "./entities/cats.entity";
const mockCatRepository = {
  find: jest.fn().mockResolvedValue([
    { id: '821fbe2c-b9cb-42e0-8ded-b64872c923cb', age: 2, breed: 'Bombay', name: 'Pixel' },
  ]),
};

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: mockCatRepository,
        },],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [
        {
          id:'821fbe2c-b9cb-42e0-8ded-b64872c923cb',
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => Promise.resolve(result as any));

      expect(await catsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single cats', async () => {
      const result =
        {
          id:'821fbe2c-b9cb-42e0-8ded-b64872c923cb',
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
          favorites:[]
        }
      ;
      jest.spyOn(catsService, 'findOne').mockImplementation(() => Promise.resolve(result as any));

      expect(await catsController.findOne({id:'821fbe2c-b9cb-42e0-8ded-b64872c923cb'})).toBe(result);
    });
  });
  describe('create', () => {
    it('should create a single cat', async () => {
      const result =
        {
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        }
      ;
      jest.spyOn(catsService, 'create').mockImplementation(() => result as any);

      expect(await catsController.create(result)).toBe(result);
    });
  });
});
