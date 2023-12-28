import { CreateUserDto } from '../dto/create-user.dto';

export const UserDTOStub = (): CreateUserDto => {
  return {
    chat_id: 'chat-002',
    username: 'Vinicius Santos de Pontes',
    role: 'user',
    createdAt: new Date(),
  };
};
