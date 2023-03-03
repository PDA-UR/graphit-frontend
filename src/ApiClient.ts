export interface InternalServerErrorModel {
  /**
   * The error name
   * @minLength 1
   * @default "INTERNAL_SERVER_ERROR"
   * @example "INTERNAL_SERVER_ERROR"
   */
  name: string;
  /**
   * An error message
   * @minLength 1
   */
  message: string;
  /**
   * The status code of the exception
   * @default 500
   * @example 500
   */
  status: number;
  /** A list of related errors */
  errors?: GenericErrorModel[];
  /** The stack trace (only in development mode) */
  stack?: string;
}

export interface GenericErrorModel {
  /**
   * The error name
   * @minLength 1
   */
  name: string;
  /**
   * An error message
   * @minLength 1
   */
  message: string;
  [key: string]: any;
}

export interface NodeModelModel {
  id: number;
  labels?: any[];
  properties?: Record<string, any>;
}

export interface GraphModelModel {
  nodes: any[];
  edges: any[];
}

export interface RunCypherModelModel {
  /** @minLength 1 */
  query: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data as T);
  };
}

/**
 * @title Api documentation
 * @version 1.0.0
 */
export class ApiClient<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  example = {
    /**
     * @description Greets you with a hello message
     *
     * @tags ExampleController
     * @name ControllerHello
     * @request GET:/api/example/hello
     */
    controllerHello: (
      query: {
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/example/hello`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Returns a random node from the Neo4j database
     *
     * @tags ExampleController
     * @name ControllerNeoTest
     * @request GET:/api/example/neo-test
     */
    controllerNeoTest: (params: RequestParams = {}) =>
      this.request<NodeModelModel, InternalServerErrorModel>({
        path: `/api/example/neo-test`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  graph = {
    /**
     * @description Returns all nodes and edges from the Neo4j database
     *
     * @tags GraphController
     * @name ControllerGetAll
     * @request GET:/api/graph/all
     */
    controllerGetAll: (params: RequestParams = {}) =>
      this.request<GraphModelModel, InternalServerErrorModel>({
        path: `/api/graph/all`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  meta = {
    /**
     * @description Returns a summary of the Neo4j database
     *
     * @tags MetaController
     * @name ControllerDbSummary
     * @request GET:/api/meta/dbSummary
     */
    controllerDbSummary: (params: RequestParams = {}) =>
      this.request<Record<string, any>, InternalServerErrorModel>({
        path: `/api/meta/dbSummary`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Runs a Cypher query on the Neo4j database
     *
     * @tags MetaController
     * @name ControllerRunCypher
     * @request POST:/api/meta/runCypher
     */
    controllerRunCypher: (data?: RunCypherModelModel, params: RequestParams = {}) =>
      this.request<Record<string, any>, InternalServerErrorModel>({
        path: `/api/meta/runCypher`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodes = {
    /**
     * @description Returns a node by its id
     *
     * @tags NodeController
     * @name NodeControllerGetNodeById
     * @request GET:/api/nodes/nodeById
     */
    nodeControllerGetNodeById: (
      query: {
        nodeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeModelModel, InternalServerErrorModel>({
        path: `/api/nodes/nodeById`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns all nodes that are requirements
     *
     * @tags NodeController
     * @name NodeControllerGetAll
     * @request GET:/api/nodes/getRequirements
     */
    nodeControllerGetAll: (
      query: {
        nodeId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NodeModelModel[], InternalServerErrorModel>({
        path: `/api/nodes/getRequirements`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
