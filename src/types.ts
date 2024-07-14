interface IToDoItem{
  title:string
  status: boolean
  id:string
}

interface IToDoItemApi{
  [string:string]:string | boolean
}