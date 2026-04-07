/**
 * Interfaz genérica para Use Cases.
 * Cada caso de uso implementa execute() con un request tipado y un response tipado.
 *
 * [SRP] Un use case = una responsabilidad de negocio.
 */
export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
