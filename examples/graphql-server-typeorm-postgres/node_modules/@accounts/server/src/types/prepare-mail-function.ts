import { User } from '@maxbezs/types';
import { EmailTemplateType } from './email-template-type';

export type PrepareMailFunction = (
  to: string,
  token: string,
  user: User,
  pathFragment: string,
  emailTemplate: EmailTemplateType,
  from: string
) => object;
