/**
 * Generated by orval v6.6.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 1.0.0
 */
import axios,{
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
export interface DeleteResponseDto {
  ok: boolean;
}

export interface UpdateTodoDto {
  completed?: boolean;
  text?: string;
}

export interface CreateTodoDto {
  completed: boolean;
  text: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


export const appControllerGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/api`,options
    );
  }


export const getAppControllerGetQueryKey = () => [`/api`];

    
export const useAppControllerGet = <TData = AsyncReturnType<typeof appControllerGet>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof appControllerGet>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getAppControllerGetQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof appControllerGet>> = () => appControllerGet(axiosOptions);

  const query = useQuery<AsyncReturnType<typeof appControllerGet>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


/**
 * @summary List all todos
 */
export const todosControllerList = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Todo[]>> => {
    return axios.get(
      `/api/todos`,options
    );
  }


export const getTodosControllerListQueryKey = () => [`/api/todos`];

    
export const useTodosControllerList = <TData = AsyncReturnType<typeof todosControllerList>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof todosControllerList>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getTodosControllerListQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof todosControllerList>> = () => todosControllerList(axiosOptions);

  const query = useQuery<AsyncReturnType<typeof todosControllerList>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


/**
 * @summary Create a new todo
 */
export const todosControllerCreateTodo = (
    createTodoDto: CreateTodoDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/api/todos`,
      createTodoDto,options
    );
  }



    export const useTodosControllerCreateTodo = <TError = AxiosError<Todo>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof todosControllerCreateTodo>, TError,{data: CreateTodoDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof todosControllerCreateTodo>, {data: CreateTodoDto}> = (props) => {
          const {data} = props || {};

          return  todosControllerCreateTodo(data,axiosOptions)
        }

      return useMutation<AsyncReturnType<typeof todosControllerCreateTodo>, TError, {data: CreateTodoDto}, TContext>(mutationFn, mutationOptions)
    }
    
/**
 * @summary Get a singl a single todo
 */
export const todosControllerGetTodo = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/api/todos/${id}`,options
    );
  }


export const getTodosControllerGetTodoQueryKey = (id: string,) => [`/api/todos/${id}`];

    
export const useTodosControllerGetTodo = <TData = AsyncReturnType<typeof todosControllerGetTodo>, TError = AxiosError<Todo>>(
 id: string, options?: { query?:UseQueryOptions<AsyncReturnType<typeof todosControllerGetTodo>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getTodosControllerGetTodoQueryKey(id);

  

  const queryFn: QueryFunction<AsyncReturnType<typeof todosControllerGetTodo>> = () => todosControllerGetTodo(id, axiosOptions);

  const query = useQuery<AsyncReturnType<typeof todosControllerGetTodo>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions})

  return {
    queryKey,
    ...query
  }
}


/**
 * @summary Update a new todo
 */
export const todosControllerUpdateTodo = (
    id: string,
    updateTodoDto: UpdateTodoDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.patch(
      `/api/todos/${id}`,
      updateTodoDto,options
    );
  }



    export const useTodosControllerUpdateTodo = <TError = AxiosError<Todo>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof todosControllerUpdateTodo>, TError,{id: string;data: UpdateTodoDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof todosControllerUpdateTodo>, {id: string;data: UpdateTodoDto}> = (props) => {
          const {id,data} = props || {};

          return  todosControllerUpdateTodo(id,data,axiosOptions)
        }

      return useMutation<AsyncReturnType<typeof todosControllerUpdateTodo>, TError, {id: string;data: UpdateTodoDto}, TContext>(mutationFn, mutationOptions)
    }
    
/**
 * @summary Delete a new todo
 */
export const todosControllerDeleteTodo = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.delete(
      `/api/todos/${id}`,options
    );
  }



    export const useTodosControllerDeleteTodo = <TError = AxiosError<DeleteResponseDto>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<AsyncReturnType<typeof todosControllerDeleteTodo>, TError,{id: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options || {}

      


      const mutationFn: MutationFunction<AsyncReturnType<typeof todosControllerDeleteTodo>, {id: string}> = (props) => {
          const {id} = props || {};

          return  todosControllerDeleteTodo(id,axiosOptions)
        }

      return useMutation<AsyncReturnType<typeof todosControllerDeleteTodo>, TError, {id: string}, TContext>(mutationFn, mutationOptions)
    }
    