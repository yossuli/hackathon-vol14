import type { UserDto } from 'common/types/user';
import type { StrictOmit } from 'common/types/utils';
import type { EntityId } from 'service/brandedId';

export type UserEntity = StrictOmit<UserDto, 'id'> & { id: EntityId['user'] };
