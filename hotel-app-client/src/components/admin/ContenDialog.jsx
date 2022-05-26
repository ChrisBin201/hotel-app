


export const methods= {
  add: 'add',
  edit: 'edit',
  delete: 'delete'
}

export default function ContentDialog({ method, data, triggers, views }){
  const  {AddView, EditView, DeleteView} = views
  switch (method) {
    case methods.add:
      return <AddView  triggers ={triggers} />
    case methods.edit:
      return <EditView data ={data} triggers ={triggers} />
    case methods.delete:
      return <DeleteView data ={data} triggers ={triggers} />
    default:
      return <AddView />
  }
}