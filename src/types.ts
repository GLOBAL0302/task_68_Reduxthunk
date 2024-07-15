
export interface IUserInput{
  title: string;
  status: boolean;
}

export interface IToDoItem extends IUserInput{
  id: string;
}

export interface IToDoItemApi {
  [string: string]: string | boolean;
}
