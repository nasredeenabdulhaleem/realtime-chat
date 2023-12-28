import { CreateUsersDto } from '../dto/create-users.dto';

export const UsersDTOStub = (): CreateUsersDto => {
  return {
    users: [
      {
        chat_id: 'chat-002',
        username: 'Vinicius Santos de Pontes',
        role: 'user',
        createdAt: new Date(),
      },
      {
        chat_id: 'chat-003',
        username: 'Vinicius Santos de Pontes',
        role: 'vendor',
        createdAt: new Date(),
      },
    ],
  };
};
