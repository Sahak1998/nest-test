import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should register a favorites', async () => {
    const userDto = { username: 'testuser', password: 'testpass' };
    mockAuthService.register.mockResolvedValue({ ...userDto, id: 1 });

    expect(await controller.register(userDto)).toEqual({ ...userDto, id: 1 });
    expect(service.register).toHaveBeenCalledWith(userDto.username, userDto.password);
  });


  it('should login a favorites', async () => {
    const req = { user: { username: 'testuser', userId: 1 } };
    mockAuthService.login.mockResolvedValue({ access_token: 'someToken' });

    expect(await controller.login(req)).toEqual({ access_token: 'someToken' });
    expect(service.login).toHaveBeenCalledWith(req.user);
  });


});
